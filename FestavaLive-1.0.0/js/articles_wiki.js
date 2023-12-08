let data = [{'texts': ['Plants may adapt faster toclimatechange than previously thought, new study shows', 'brought on byclimatechange may not happen to the extent that scientists previously predicted. The Intergovernmental Panel onClimateChange claimed...', '3 KB (349 words) - 10:23, 2 April 2023'], 'link': 'https://en.wikinews.org//wiki/Plants_may_adapt_faster_to_climate_change_than_previously_thought,_new_study_shows', 'photo_info': {'src': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Dactylorhiza_fuchsii_close-up.JPG/240px-Dactylorhiza_fuchsii_close-up.JPG', 'figcaption': 'File photo of Dactylorhiza fachsii, an example of a common spotted orchid. Image: Wikimedia Commons contributor Chrizzles.'}}, {'texts': ['UN scientist: Eat less meat to tackleclimatechange', 'Intergovernmental Panel onClimateChange (IPCC) has said that eating less meat is a good way to reduce damage to theclimate. Pachuari said that "the UN...', '2 KB (393 words) - 05:35, 2 April 2023'], 'link': 'https://en.wikinews.org//wiki/UN_scientist:_Eat_less_meat_to_tackle_climate_change', 'photo_info': {'src': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Rajendra_Pachauri_-_WEF_2008_%28cropped%29.jpg/220px-Rajendra_Pachauri_-_WEF_2008_%28cropped%29.jpg', 'figcaption': 'Rajendra Pachauri: "Give up meat for one day initially, and decrease it from there" Image: Remy Steinegger.'}}, {'texts': ['Al Gore andClimatePanel awarded Nobel Peace prize 2007', 'Panel onClimateChange (IPCC). The Nobel committee cited "for their efforts to build up and disseminate greater knowledge about man-madeclimatechange...', '3 KB (384 words) - 10:30, 2 April 2023'], 'link': 'https://en.wikinews.org//wiki/Al_Gore_and_Climate_Panel_awarded_Nobel_Peace_prize_2007', 'photo_info': {'src': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/AlGoreGlobalWarmingTalk.jpg/220px-AlGoreGlobalWarmingTalk.jpg', 'figcaption': 'Al Gore'}}]


fetch('/get_data')
    .then(response => response.json())
    .then(data => {
        // Display JSON data on the HTML page
        console.log( JSON.stringify(data));
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

let imageLinks = data.map(item => item.photo_info.src);
let textx = data.map(item => item.texts);
let figcaptions = data.map(item => item.photo_info.figcaption);


document.getElementById('firstImageDiv').innerHTML = `<div class="artists-image-wrap" ><img src="${imageLinks[0]}" alt="First Image" class="artists-image img-fluid"></div><div class="artists-hover">
<p>
    <strong>Title:</strong>
    "${textx[0]}"
</p>

<hr>

<p class="mb-0">
    "${figcaptions[0]}"
</p>
</div>`;
document.getElementById('secondImageDiv').innerHTML = `<div class="artists-image-wrap" ><img src="${imageLinks[1]}" alt="Second Image" class="artists-image img-fluid"></div><div class="artists-hover">
<p>
<strong>Title:</strong>
"${textx[1]}"
</p>

<hr>

<p class="mb-0">
"${figcaptions[1]}"
</p>
</div>`;
document.getElementById('ThirdImageDiv').innerHTML = `<img src="${imageLinks[2]}" alt="third Image" class="artists-image img-fluid"><div class="artists-hover">
<p>
<strong>Title:</strong>
"${textx[2]}"
</p>

<hr>

<p class="mb-0">
"${figcaptions[2]}"
</p>
</div>`;


