from .db import db, environment, SCHEMA, add_prefix_for_prod

class CarPhoto(db.Model):
    __tablename__ = 'car_photos'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    car_listing_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('car_listings.id')), nullable=False)
    photo_url = db.Column(db.String(255), nullable=False)

    car_listing = db.relationship('CarListing', backref=db.backref('car_photos', lazy=True, cascade='all, delete'))

    def to_dict(self):
        return {
            'id': self.id,
            'car_listing_id': self.car_listing_id,
            'photo_url': self.photo_url
        }
