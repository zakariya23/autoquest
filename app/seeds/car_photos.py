from app.models import db, CarPhoto, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_car_photos():
    car_photo1 = CarPhoto(
        car_listing_id=1,
        photo_url='https://media.discordapp.net/attachments/533035859214073877/1088147226087411723/image.png',
    )
    car_photo2 = CarPhoto(
        car_listing_id=2,
        photo_url='https://www.cnet.com/a/img/resize/6bb75f162a5bcd5af072e24783d7bb0668f0604f/hub/2018/08/01/b1a2ae23-437a-4902-8bd2-d4583cf8e7ec/003-2018-ford-mustang-gt-review.jpg',
    )
    car_photo3 = CarPhoto(
        car_listing_id=3,
        photo_url='https://www.motortrend.com/uploads/sites/5/2019/05/2019-Honda-Civic-Touring-front-three-quarter-in-motion-1.jpg',
    )
    car_photo4 = CarPhoto(
        car_listing_id=4,
        photo_url='https://www.motortrend.com/uploads/sites/5/2017/02/2017-BMW-330i-front-three-quarter-in-motion-e1487804524229.jpg',
    )
    car_photo5 = CarPhoto(
        car_listing_id=5,
        photo_url='https://tdrresearch.azureedge.net/photos/chrome/Expanded/White/2018AUC010001/2018AUC01000101.jpg',
    )
    car_photo6 = CarPhoto(
        car_listing_id=6,
        photo_url='https://cdn-ds.com/blogs-media/sites/285/2018/10/15135603/2019-Toyota-Camry-AA2_o.jpg',
    )
    car_photo7 = CarPhoto(
        car_listing_id=7,
        photo_url='https://www.kbb.com/wp-content/uploads/make/chevrolet/silverado-1500/2019/silverado-2-7-first-freview/05-2019-Chevrolet-Silverado-2.7-first-review.jpg',
    )
    car_photo8 = CarPhoto(
        car_listing_id=8,
        photo_url='https://medias.fcacanada.ca/jellies/renditions/2023/800x510/CC23_JLJL72_2TB_PGG_APA_XXX_XXX_XXX.1aaa5d21f651dcfd23d94bcacebe5ded.png',
    )
    car_photo9 = CarPhoto(
        car_listing_id=9,
        photo_url='https://www.thecarmagazine.com/wp-content/uploads/2017/08/17_lexus_rx_350_fsport_awd_00100-1.jpg',
    )
    car_photo10 = CarPhoto(
        car_listing_id=10,
        photo_url='https://static.cargurus.com/images/site/2018/02/05/16/58/2018_mercedes-benz_c-class_c_63_s_amg_coupe-pic-2681156915852165749-640x480.jpeg',
    )
    car_photo11 = CarPhoto(
        car_listing_id=11,
        photo_url='https://static.cargurus.com/images/forsale/2023/01/06/04/10/2018_mercedes-benz_amg_gt-pic-575888'
    )


    db.session.add(car_photo1)
    db.session.add(car_photo2)
    db.session.add(car_photo3)
    db.session.add(car_photo4)
    db.session.add(car_photo5)
    db.session.add(car_photo6)
    db.session.add(car_photo7)
    db.session.add(car_photo8)
    db.session.add(car_photo9)
    db.session.add(car_photo10)
    db.session.add(car_photo11)
    db.session.commit()


def undo_car_photos():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.car_photos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM car_photos"))

    db.session.commit()
