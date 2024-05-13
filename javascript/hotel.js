let longitude;
let latitude;

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
      
           longitude = data.lon;
           latitude = data.lat;

          
          console.log("Longitude:", longitude);
          console.log("Latitude:", latitude);

          searchHotels();
      })
      .catch(error => console.error('Error:', error));
}


function searchHotels() {


  const apiKey = '5ae2e3f221c38a28845f05b6fcc7911a31a1b7f8e1d8197f7fef2f6a';
  const apiUrl = `https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=${longitude}&lat=${latitude}&kinds=other_hotels&format=json&apikey=${apiKey}`;

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
              const hotels = data;
              displayResults(hotels);
          } else {
              console.error('Invalid response from API');
          }
      })
      .catch(error => console.error('Error:', error));
}

      
      function displayResults(hotels) {

        const destinationCity = document.getElementById('destinationCity').value;
        const destinationCountry = document.getElementById('destinationCountry').value;

          const resultsSection = document.getElementById('resultsSection');
          resultsSection.innerHTML = '';
      
          hotels.forEach(hotel => {
              const hotelName = hotel.name || 'Namn saknas';
              const hotelBetyg = hotel.rate ? `${hotel.rate.toFixed(2)}` : 'betyg saknas';
      
              const resultDiv = document.createElement('div');
              resultDiv.classList.add('result');
              resultDiv.innerHTML = `
                  <h3>${hotelName}</h3>
                  <p>Hotelets populäritet: ${hotelBetyg}</p>
                  <button><a target="_blank" href="https://www.booking.com/city/${destinationCountry}/${destinationCity}">Boka nu</button>
              `;
      
              resultsSection.appendChild(resultDiv);
          });
      }
      