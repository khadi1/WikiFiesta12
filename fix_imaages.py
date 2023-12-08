import requests
from PIL import Image
from io import BytesIO


from fetching_script import result


image_urls = [item['photo_info']['src'] for item in result if 'photo_info' in item and 'src' in item['photo_info']][:3]



def get_image_width(url):
    response = requests.get(url)
    if response.status_code == 200:
        image = Image.open(BytesIO(response.content))
        return image.size[1]  # Get width (index 0 of size tuple)
    return 0  # Return 0 if unable to fetch image or get width

# Get widths of images
image_widths = {url: get_image_width(url) for url in image_urls}

# Sort image URLs based on width (from widest to least wide)
sorted_image_urls = sorted(image_urls, key=lambda url: image_widths[url], reverse=True)

# Display the sorted image URLs based on width
print(sorted_image_urls)
