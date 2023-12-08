import json
import re
import requests
from bs4 import BeautifulSoup



def extract_photo_info(link):
    response = requests.get(link)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        # Find <a> tags containing images immediately followed by a <figcaption> tag
        image_links = soup.find_all('a', class_='mw-file-description')
        
        photo_info_list = []
        for link in image_links:
            img = link.find('img')
            figcaption = link.find_next_sibling('figcaption')

            if img and figcaption:
                # Get the src attribute of the image
                src = img.get('src')
                # Get the text inside the figcaption
                figcaption_text = figcaption.get_text()
                if figcaption_text!="":
                    photo_info_list.append({'src': "https:"+src, 'figcaption': figcaption_text})
        
        filtered_images = [data for data in photo_info_list if data['figcaption'] != '']
        if filtered_images and len(filtered_images) > 0:  # Check if the list is not empty
            return filtered_images[0]  # Return the first element
        
    return None



url = 'https://en.wikinews.org/w/index.php?go=Go&search=climate&title=Special%3ASearch&ns0=1&ns14=1'

response = requests.get(url)

if response.status_code == 200: 
    soup = BeautifulSoup(response.content, 'html.parser')

    
    search_results = soup.find_all(class_="mw-search-result mw-search-result-ns-0")
    
    extracted_data = []

    # Process the found elements and extract text from each div
    for result in search_results:
        # Extract text from all three divs inside the element
        div_texts = [div.get_text(strip=True) for div in result.find_all('div')]

        # Replace '<span class="searchmatch">climate</span>' with 'climate' in each div text
        cleaned_texts = [re.sub(r'<span class="searchmatch">(.*?)</span>', r'\1', text) for text in div_texts]

        
        first_div_link = result.find('div').find('a')['href'] if result.find('div').find('a') else None

        first_div_link = "https://en.wikinews.org/" +  first_div_link
        
        photo_info = extract_photo_info(first_div_link)

        # Add the modified texts and the link to the list
        extracted_data.append({'texts': cleaned_texts, 'link': first_div_link , 'photo_info': photo_info})
    
    
    result = [element for element in extracted_data if element.get('photo_info') is not None]
    # print(result[0], result[1] , result[2])

    image_results = [item for item in result if 'photo_info' in item and 'src' in item['photo_info']][:3]


    data_to_send = json.dumps(image_results)
    # print(data_to_send)


else:
    print('Failed to fetch data:', response.status_code)
