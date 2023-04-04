import requests
from bs4 import BeautifulSoup

def get_edmunds_reviews(make, model, year):
    base_url = f"https://www.edmunds.com/{make}/{model}/{year}/review/"
    print(base_url)
    headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.3",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9",
}

    try:
        response = requests.get(base_url, headers=headers, timeout=10)
    except requests.Timeout:
        print("Request timed out")
        return []

    print(response)

    if response.status_code != 200:
        print(f"Error fetching reviews: {response.status_code}")
        return []

    soup = BeautifulSoup(response.text, "html.parser")
    review = {}
    verdict_card = soup.find("div", class_="verdict-card d-flex flex-column flex-md-row mb-2 rounded")

    general_verdict = verdict_card.find("div", class_="font-weight-bold").text.strip()
    print(general_verdict)
    general_verdict_img = verdict_card.find("img")["src"]
    rating_out_of_10 = verdict_card.find("span", class_="heading-2").text.strip()
    overall_review = verdict_card.find("div", class_="content-fragment review-section-fragment text-gray-darker size-16 mb-md-2").text.strip()

    review['general_verdict'] = general_verdict
    review['general_verdict_img'] = general_verdict_img
    review['rating_out_of_10'] = rating_out_of_10
    review['overall_review'] = overall_review

    return review

if __name__ == "__main__":
    make = "acura"
    model = "ilx"
    year = "2021"

    review = get_edmunds_reviews(make, model, year)
    print(review)
