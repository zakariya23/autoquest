import json
import requests
from bs4 import BeautifulSoup

def get_iseecars_listings(make, model):
    url = f'https://www.iseecars.com/cars-for-sale#autoZip=False&Location=90270&Radius=all&Make={make}&Model={model}&_t=a&maxResults=200'

    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find the search-result div
    search_result_div = soup.find('div', class_='search-result')

    # Find script tags within the search-result div
    listings = search_result_div.find_all('script', type='application/ld+json')

    results = []
    for listing in listings:
        data = json.loads(listing.string)

        # Filter by make and model
        if data.get('brand') != make or data.get('model') != model:
            continue

        title = data.get('name')
        location = None
        price = data['offers'].get('price') if 'offers' in data else None
        mileage = data.get('mileageFromOdometer')

        result = {
            'title': title,
            'location': location,
            'price': price,
            'mileage': mileage,
        }

        results.append(result)

    return results

# Example usage
make = "Lamborghini"
model = "Gallardo"
listings = get_iseecars_listings(make, model)
print(listings)
