import requests
import json
from bs4 import BeautifulSoup

def get_autotrader_listings(make, model):
    base_url = f"https://www.autotrader.com/cars-for-sale/all-cars/{make}/{model}"

    response = requests.get(base_url)

    if response.status_code != 200:
        print(f"Error fetching listings: {response.status_code}")
        return []

    soup = BeautifulSoup(response.text, "html.parser")
    listings = []

    car_listing_selector = 'script[data-cmp="lstgSchema"]'

    for listing in soup.select(car_listing_selector):
        json_data = json.loads(listing.string)

        title = json_data["name"]
        price = json_data["offers"]["price"]
        image_url = json_data["image"]
        mileage = json_data["mileageFromOdometer"]["value"]
        vin = json_data["vehicleIdentificationNumber"]
        url = json_data["url"]
        exterior_color = json_data["color"]
        interior_color = json_data["vehicleInteriorColor"]

        listings.append({
            "title": title,
            "price": price,
            "image_url": image_url,
            "mileage": mileage,
            "vin": vin,
            "url": url,
            "exterior_color":exterior_color,
            "interior_color":interior_color
        })

    return sorted(listings, key=lambda x: int(x["price"]))

if __name__ == "__main__":
    make = "BMW"
    model = "X6"

    listings = get_autotrader_listings(make, model)
    print(listings)
