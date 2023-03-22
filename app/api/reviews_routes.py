from flask import Blueprint, jsonify, request
from app.models import db, CarListing, Review, CarPhoto, User
from .auth_routes import validation_errors_to_error_messages
from flask_login import current_user, login_required
from app.forms.review_form import ReviewForm

review_routes = Blueprint('review', __name__)


# GET ALL REVIEWS BY CURRENT USER
@review_routes.route('/current')
@login_required
def reviews_current():
    user_id = int(current_user.get_id())
    review_query = db.session.query(
        Review).filter(Review.user_id == user_id)
    reviews = [review.to_dict() for review in review_query.all()]

    for review in reviews:
        car_listing = CarListing.query.get(review["car_listing_id"])
        review["car_listing_make"] = car_listing.make
        review["car_listing_model"] = car_listing.model

    return {'userReviews': {review["id"]: review for review in reviews}}


# GET REVIEW DETAILS BY ID
@review_routes.route('/<int:id>')
def get_review_details(id):
    review = Review.query.get(id)
    if not review:
        return {
            "errors": "Review couldn't be found",
            "status_code": 404
        }, 404

    review = review.to_dict()
    car_listing = CarListing.query.get(review["car_listing_id"])
    user = User.query.get(review["user_id"])

    review['car_listing_make'] = car_listing.make
    review['car_listing_model'] = car_listing.model
    review['user_username'] = user.username

    return jsonify(review)


# CREATE NEW REVIEW
@review_routes.route('/car_listing/<int:car_listing_id>', methods=['POST'])
@login_required
def create_new_review(car_listing_id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = request.get_json()

    car_listing = CarListing.query.get(car_listing_id)
    if not car_listing:
        return {
            "errors": "Car listing couldn't be found",
            "status_code": 404
        }, 404

    if form.validate_on_submit():
        new_review = Review(
            user_id=int(current_user.get_id()),
            car_listing_id=car_listing_id,
            rating=data['rating'],
            content=data['content']
        )
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()
    if form.errors:
        return {
            "message": "Validation error",
            "statusCode": 400,
            'errors': validation_errors_to_error_messages(form.errors)}, 400


# UPDATE REVIEW
@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_review(id):
    review = Review.query.get(id)
    if not review:
        return {
            "errors": "Review couldn't be found",
            "status_code": 404
        }, 404

    data = request.get_json()
    if int(current_user.get_id()) == review.user_id:
        review.rating = data['rating']
        review.content = data['content']

        db.session.commit()
        return review.to_dict()

    else:
        return {
            "errors": "You are not allowed to edit this review",
            "status_code": 403
        }, 403


# DELETE A REVIEW
@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get(id)
    if not review:
        return {
            "errors": "Review couldn't be found",
            "status_code": 404
        }, 404

    if int(current_user.get_id()) != review.user_id:
        return {
            "errors": "Forbidden",
            "status_code": 403
        }, 403

    db.session.delete(review)
    db.session.commit()
    return {
        "message": "Successfully deleted",
        "status_code": 200
    }
