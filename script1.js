let latitude;
let longitude;

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    searchCity();
});

function searchCity() {
    const destinationCity = document.getElementById('destinationCity').value;
    const destinationCountry = document.getElementById('destinationCountry').value;

    const apiKey = '5ae2e3f221c38a28845f05b6fcc7911a31a1b7f8e1d8197f7fef2f6a';
    const apiUrl = `https://api.opentripmap.com/0.1/en/places/geoname?name=${destinationCity}&country=${destinationCountry}&apikey=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Extract longitude and latitude values from the response and assign them to global variables
            longitude = data.lon;
            latitude = data.lat;
            
            // Call the searchHotels function after fetching latitude and longitude
            searchPlaces();
        })
        .catch(error => console.error('Error:', error));
}


function searchPlaces() {
    const apiKey = '5ae2e3f221c38a28845f05b6fcc7911a31a1b7f8e1d8197f7fef2f6a';
    const apiUrl = `https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=${longitude}&lat=${latitude}&kinds=interesting_places&format=json&apikey=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            if (data) {
                const places = data;
                displayResults(places);
            } else {
                console.error('Invalid response from API');
            }
        })
        .catch(error => console.error('Error:', error));
}

function displayResults(places) {
    const resultsSection = document.getElementById('resultsSection');
    resultsSection.innerHTML = '';

    places.forEach(place => {
        const placeName = place.name || 'Namn saknas';
        const placeBetyg = place.rate ? `${place.rate.toFixed(2)}` : 'betyg saknas';

        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result');
        resultDiv.innerHTML = `
            <h3>${placeName}</h3>
            <p>Populäritet: ${placeBetyg}</p>
            
        `;

        resultsSection.appendChild(resultDiv);
    });
}
