from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    reviews_data = [
        (1, "Great car! Smooth ride and excellent handling. Love the interior design.", 5),
        (1, "Had this car for a month now and I am really impressed with the performance.", 5),
        (2, "The Mustang GT is a fantastic sports car. The V8 engine is powerful and sounds amazing!", 5),
        (2, "This car is a blast to drive. The exhaust note alone is worth the price of admission.", 4),
        (3, "Fuel efficient, easy to drive, and surprisingly spacious. The Honda Civic is a great car!", 5),
        (3, "Comfortable, economical, and reliable. Can't go wrong with the Civic.", 4),
        (4, "The BMW 330i is a well-rounded luxury sedan with a comfortable ride and excellent performance.", 5),
        (4, "Great car with a comfortable interior and a smooth ride. I love the technology features.", 4),
        (5, "The Audi A4 is a great car. It has a comfortable ride and a lot of advanced features.", 4),
        (5, "Excellent performance, smooth ride, and premium interior. The Audi A4 is a great luxury sedan.", 5),
        (6, "Very reliable and comfortable sedan. The Toyota Camry offers great value for the price.", 4),
        (6, "Smooth ride, good fuel economy, and a spacious interior. The Camry is a great family car.", 5),
        (7, "The Silverado is a solid truck. It has a comfortable cabin and a powerful engine.", 5),
        (7, "Great towing capacity and a smooth ride. The Silverado is a fantastic pickup truck.", 4),
        (8, "I love the Wrangler! It's so much fun to drive, especially with the top off. It's a true off-road machine.", 5),
        (8, "The Jeep Wrangler is a unique vehicle that offers a thrilling driving experience.", 4),
        (9, "The Lexus RX 350 is a comfortable and luxurious SUV. I'm very happy with my purchase.", 5),
        (9, "Smooth ride, quiet cabin, and great safety features. The RX 350 is an excellent choice.", 4),
        (10, "The C 63 S AMG Coupe is an amazing sports car. The performance and handling are exceptional.", 5),
        (10, "Powerful engine and aggressive styling. The C 63 S AMG Coupe is a true performance car.", 4),
        (11, "The Mercedes-AMG GT is an absolute beast. It's fast, loud, and handles like a dream.", 5),
        (11, "Amazing driving experience and beautiful design. The AMG GT is a fantastic sports car.", 4),
    ]

    for i, (car_listing_id, review_text, rating) in enumerate(reviews_data, start=1):
        review = Review(
            user_id=(i % 5) + 1,
            car_listing_id=car_listing_id,
            review_text=review_text,
            rating=rating,
        )
        db.session.add(review)

    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
