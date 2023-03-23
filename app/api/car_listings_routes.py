from flask import Blueprint, jsonify, request
from app.models import db, CarListing, CarPhoto, Review, User
from .auth_routes import validation_errors_to_error_messages
from flask_login import current_user, login_required
from app.forms.car_listing_form import CarListingForm
from app.forms.car_photo_form import CarPhotoForm
from app.forms.review_form import ReviewForm
from datetime import datetime
from sqlalchemy import or_

car_listing_routes = Blueprint('car_listings', __name__)


# GET ALL CAR LISTINGS
@car_listing_routes.route('/')
def get_car_listings():
    car_listings = CarListing.query.all()
    return {'car_listings': {car_listing.id: car_listing.to_dict() for car_listing in car_listings}}


# GET CAR LISTING DETAILS BY ID
@car_listing_routes.route('/<int:id>')
def get_car_listing_details(id):
    car_listing = CarListing.query.get(id)
    if not car_listing:
        return {
            "errors": "Car listing couldn't be found",
            "status_code": 404
        }, 404

    car_listing = car_listing.to_dict()

    # Handle car_photos
    car_photos_query = CarPhoto.query.filter(CarPhoto.car_listing_id == id)
    car_photos = car_photos_query.all()
    car_listing['car_photos'] = [car_photo.to_dict() for car_photo in car_photos]

    # Handle reviews
    review_query = Review.query.filter(Review.car_listing_id == id)
    car_listing_reviews = review_query.all()
    ratings = [review.rating for review in car_listing_reviews]
    if len(car_listing_reviews) > 0:
        avg_rating = sum(ratings) / len(car_listing_reviews)
    else:
        avg_rating = 0
    car_listing['avg_rating'] = avg_rating
    car_listing['number_of_reviews'] = len(car_listing_reviews)

    return jsonify(car_listing)


# CREATE NEW CAR LISTING
@car_listing_routes.route('/', methods=['POST'])
@login_required
def create_new_car_listing():
    form = CarListingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = request.get_json()
    if form.validate_on_submit():
        new_car_listing = CarListing(
            user_id=int(current_user.get_id()),
            make=data['make'],
            model=data['model'],
            year=data['year'],
            color=data['color'],
            price=data['price'],
            mileage=data['mileage'],
            description=data['description']
        )
        db.session.add(new_car_listing)
        db.session.commit()
        return new_car_listing.to_dict()
    if form.errors:
        return {
            "message": "Validation error",
            "statusCode": 400,
            'errors': validation_errors_to_error_messages(form.errors)}, 400



# UPDATE CAR LISTING
@car_listing_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_car_listing(id):
    car_listing = CarListing.query.get(id)
    if not car_listing:
        return {
            "errors": ["Car listing couldn't be found"],
            "status_code": 404
        }, 404

    data = request.get_json()
    if int(current_user.get_id()) == car_listing.user_id:
        car_listing.make = data['make']
        car_listing.model = data['model']
        car_listing.year = data['year']
        car_listing.color = data['color']
        car_listing.price = data['price']
        car_listing.mileage = data['mileage']
        car_listing.description = data['description']
        car_listing.updated_at = datetime.utcnow()

        db.session.commit()
        return car_listing.to_dict()

    else:
        return {
            "errors": ["Forbidden"],
            "status_code": 403
        }, 403


# DELETE A CAR LISTING
@car_listing_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_car_listing(id):
    car_listing = CarListing.query.get(id)

    if not car_listing:
        return {
            "errors": "Car listing couldn't be found",
            "status_code": 404
        }, 404

    if int(current_user.get_id()) == car_listing.user_id:
        db.session.delete(car_listing)
        db.session.commit()
        return {
            "message": "Successfully deleted",
            "status_code": 200
        }
    else:
        return {
            "errors": "Forbidden",
            "status_code": 403
        }, 403


# CREATE NEW CAR PHOTO
@car_listing_routes.route('/<int:id>/photos', methods=['POST'])
@login_required
def create_new_car_photo(id):
    car_listing = CarListing.query.get(id)
    if not car_listing:
        return {
            "errors": "Car listing couldn't be found",
            "status_code": 404
        }, 404

    form = CarPhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = request.get_json()
    if form.validate_on_submit():
        new_car_photo = CarPhoto(
            car_listing_id=id,
            url=data['url'],
            caption=data['caption']
        )
        db.session.add(new_car_photo)
        db.session.commit()
        return new_car_photo.to_dict()
    if form.errors:
        return {
            "message": "Validation error",
            "statusCode": 400,
            'errors': validation_errors_to_error_messages(form.errors)}, 400

# SEARCH CAR LISTINGS
@car_listing_routes.route('/search')
def search_car_listings():
    query = request.args.get('query', default='', type=str)
    search_results = (
        CarListing.query
        .filter(or_(
            CarListing.make.ilike(f"%{query}%"),
            CarListing.model.ilike(f"%{query}%"),
            CarListing.year.ilike(f"%{query}%"),
            CarListing.trim.ilike(f"%{query}%"),
            CarListing.body_type.ilike(f"%{query}%"),
            CarListing.exterior_color.ilike(f"%{query}%"),
            CarListing.interior_color.ilike(f"%{query}%")
        ))
        .all()
    )

    return {'car_listings': {car_listing.id: car_listing.to_dict() for car_listing in search_results}}
