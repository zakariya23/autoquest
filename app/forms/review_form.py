from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField
from wtforms.validators import DataRequired, Optional, NumberRange, Length

class ReviewForm(FlaskForm):
    user_id = IntegerField("User ID", validators=[DataRequired()])
    car_listing_id = IntegerField("Car Listing ID", validators=[DataRequired()])
    rating = IntegerField("Rating", validators=[DataRequired(), NumberRange(min=1, max=5, message="Rating must be between 1 and 5.")])
    review_text = TextAreaField("Review Text", validators=[Optional(), Length(min=1, max=1000, message="Review text must be less than 1000 characters.")])
