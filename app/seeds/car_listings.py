from app.models import db, CarListing, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_car_listings():
    car1 = CarListing(
        user_id=1,
        make='Tesla',
        model='Model 3',
        year=2020,
        price=40000,
        trim='Long Range',
        body_type='Sedan',
        exterior_color='Blue',
        interior_color='White',
        mileage=15000,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    car2 = CarListing(
        user_id=2,
        make='Ford',
        model='Mustang',
        year=2018,
        price=25000,
        trim='GT',
        body_type='Coupe',
        exterior_color='Red',
        interior_color='Black',
        mileage=12000,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    car3 = CarListing(
        user_id=3,
        make='Honda',
        model='Civic',
        year=2019,
        price=18000,
        trim='EX',
        body_type='Sedan',
        exterior_color='Gray',
        interior_color='Black',
        mileage=30000,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    car4 = CarListing(
        user_id=1,
        make='BMW',
        model='3 Series',
        year=2017,
        price=23000,
        trim='330i',
        body_type='Sedan',
        exterior_color='Black',
        interior_color='Tan',
        mileage=45000,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    car5 = CarListing(
        user_id=2,
        make='Audi',
        model='A4',
        year=2018,
        price=28000,
        trim='Premium Plus',
        body_type='Sedan',
        exterior_color='White',
        interior_color='Black',
        mileage=35000,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    car6 = CarListing(
        user_id=3,
        make='Toyota',
        model='Camry',
        year=2019,
        price=21000,
        trim='SE',
        body_type='Sedan',
        exterior_color='Silver',
        interior_color='Black',
        mileage=25000,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    car7 = CarListing(
        user_id=4,
        make='Chevrolet',
        model='Silverado 1500',
        year=2019,
        price=35000,
        trim='LT',
        body_type='Pickup',
        exterior_color='Blue',
        interior_color='Gray',
        mileage=30000,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    car8 = CarListing(
        user_id=5,
        make='Jeep',
        model='Wrangler',
        year=2020,
        price=40000,
        trim='Sport',
        body_type='SUV',
        exterior_color='Green',
        interior_color='Black',
        mileage=20000,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    car9 = CarListing(
        user_id=1,
        make='Lexus',
        model='RX 350',
        year=2017,
        price=32000,
        trim='F Sport',
        body_type='SUV',
        exterior_color='Gray',
        interior_color='Red',
        mileage=40000,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    car10 = CarListing(
        user_id=2,
        make='Mercedes-Benz',
        model='C-Class',
        year=2018,
        price=30000,
        trim='C 300',
        body_type='Sedan',
        exterior_color='White',
        interior_color='Black',
        mileage=35000,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    car11 = CarListing(
        user_id=3,
        make='Mercedes-Benz',
        model='AMG GT',
        year=2018,
        price=150000,
        trim='R',
        body_type='Coupe',
        exterior_color='Green',
        interior_color='Black',
        mileage=35000,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )




    db.session.add(car1)
    db.session.add(car2)
    db.session.add(car3)
    db.session.add(car4)
    db.session.add(car5)
    db.session.add(car6)
    db.session.add(car7)
    db.session.add(car8)
    db.session.add(car9)
    db.session.add(car10)
    db.session.add(car11)
    # ... Add more session.add(car) here ...

    db.session.commit()

def undo_car_listings():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.car_listings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM car_listings"))

    db.session.commit()
