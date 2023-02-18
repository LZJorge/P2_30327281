const ipInput = document.getElementById('ip');
const countryInput = document.getElementById('country');

const ipApiKey = 'c0c005fff67282e592d2356998034d05';

fetch(`http://api.ipapi.com/api/check?access_key=${ipApiKey}`)
.then((response) => response.json())
.then( (ipapi_response) => {
    const ip = ipapi_response.ip;
    const country = ipapi_response.country_name;

    ipInput.value = ip;
    countryInput.value = country;
});