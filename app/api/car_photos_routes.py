from flask import Blueprint, jsonify, request
from app.models import db, CarPhoto, CarListing, User, Review
from .auth_routes import validation_errors_to_error_messages
from flask_login import current_user, login_required

car_photo_routes = Blueprint('car_photos', __name__)

# GET ALL CAR PHOTOS BY CURRENT USER
@car_photo_routes.route('/current')
@login_required
def car_photos_current():
    user_id = int(current_user.get_id())
    car_photo_query = db.session.query(
        CarPhoto).filter(CarPhoto.user_id == user_id)
    car_photos = car_photo_query.all()

    return {'car_photos': {car_photo.id: car_photo.to_dict() for car_photo in car_photos}}


# DELETE A CAR PHOTO
@car_photo_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def car_photos_delete(id):
    car_photo = CarPhoto.query.get(id)
    if not car_photo:
        return {
            "errors": "Car photo couldn't be found",
            "status_code": 404
        }, 404

    if int(current_user.get_id()) == car_photo.user_id:
        db.session.delete(car_photo)
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


# GET CAR PHOTO DETAILS BY ID
@car_photo_routes.route('/<int:id>')
def get_car_photo_details(id):
    car_photo = CarPhoto.query.get(id)
    if not car_photo:
        return {
            "errors": "Car photo couldn't be found",
            "status_code": 404
        }, 404

    car_photo = car_photo.to_dict()
    car_listing = CarListing.query.get(car_photo["car_listing_id"])
    user = User.query.get(car_listing.user_id)

    car_photo["car_listing_make"] = car_listing.make
    car_photo["car_listing_model"] = car_listing.model
    car_photo["car_listing_id"] = car_listing.id
    car_photo["user_username"] = user.username

    return car_photo

