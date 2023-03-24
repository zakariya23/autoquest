from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange

class CarListingForm(FlaskForm):
    make = StringField("Make", validators=[DataRequired(), Length(min=1, max=40, message="Make must be less than 40 characters.")])
    model = StringField("Model", validators=[DataRequired(), Length(min=1, max=40, message="Model must be less than 40 characters.")])
    year = IntegerField("Year", validators=[DataRequired(), NumberRange(min=1900, max=9999, message="Year must be between 1900 and 9999.")])
    price = IntegerField("Price", validators=[DataRequired()])
    trim = StringField("Trim", validators=[Length(min=0, max=40, message="Trim must be less than 40 characters.")])
    body_type = StringField("Body Type", validators=[Length(min=0, max=40, message="Body Type must be less than 40 characters.")])
    exterior_color = StringField("Exterior Color", validators=[Length(min=0, max=40, message="Exterior Color must be less than 40 characters.")])
    interior_color = StringField("Interior Color", validators=[Length(min=0, max=40, message="Interior Color must be less than 40 characters.")])
    mileage = IntegerField("Mileage", validators=[DataRequired()])
