window.addEventListener('load', () => {
    let long;
    let lat;

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://api.hgbrasil.com/weather?woeid=456592';

            const api = `${proxy}https://api.hgbrasil.com/weather?woeid=${lat},${long}`;

            fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        });
    }
    else {
        h1.textContent = "Hey this isn't working! repeat again.";
    }

    
});