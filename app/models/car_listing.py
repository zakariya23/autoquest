from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class CarListing(db.Model):
    __tablename__ = 'car_listings'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    make = db.Column(db.String(40), nullable=False)
    model = db.Column(db.String(40), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    trim = db.Column(db.String(40), nullable=True)
    body_type = db.Column(db.String(40), nullable=True)
    exterior_color = db.Column(db.String(40), nullable=True)
    interior_color = db.Column(db.String(40), nullable=True)
    mileage = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship('User', backref=db.backref('car_listings', lazy=True, cascade='all, delete'))

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'make': self.make,
            'model': self.model,
            'year': self.year,
            'price': self.price,
            'trim': self.trim,
            'body_type': self.body_type,
            'exterior_color': self.exterior_color,
            'interior_color': self.interior_color,
            'mileage': self.mileage,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
