from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, URL

class CarPhotoForm(FlaskForm):
    car_listing_id = IntegerField("Car Listing ID", validators=[DataRequired()])
    photo_url = StringField("Photo URL", validators=[DataRequired(), URL(), Length(min=1, max=255, message="Photo URL must be less than 255 characters.")])
