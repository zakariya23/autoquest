from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    car_listing_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('car_listings.id')), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    review_text = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship('User', backref=db.backref('reviews', lazy=True, cascade='all, delete'))
    car_listing = db.relationship('CarListing', backref=db.backref('reviews', lazy=True, cascade='all, delete'))

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'car_listing_id': self.car_listing_id,
            'rating': self.rating,
            'review_text': self.review_text,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
