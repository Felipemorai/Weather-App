const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
wIcon = document.querySelector(".weather-part img");

let api;

inputField.addEventListener("keyup", e => {
    /* If user pressed enter button and input value isn't empty */
    if(e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", () => {
    if(navigator.geolocation) { /* If browser support geolocation api */
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    } else {
        alert("Your browser not support  geolocation api");
    }
});

function onSuccess(position){
    /* Getting lat and lon of the user device from coords object */
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    fetchData();
}

function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

function requestApi(city){
    let apiKey = 'ca126af951544574737763ad3a9d5d16';
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetchData();
}

function fetchData() {
    infoTxt.innerText = "Getting Weather details...";
    infoTxt.classList.add("pending");
    /* Getting api response and returning it with parsing into js object and in another */
    /* Then function calling weatherDetails function with passing api result as an argument */
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info){
    infoTxt.classList.replace("pending", "error");
    if(info.cod == "404") {
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    }else {
        /* Let's get required properties value from the info object */
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;

        /* Using custom icon according to the id wich api return us */
        if(id == 800) {
            wIcon.src = "./img/sun.png";
        }else
        if(id >= 200 && id <= 232) {
            wIcon.src = "./img/storm.png";
        }else
        if(id >= 600 && id <= 622) {
            wIcon.src = "./img/snowy.png";
        }else
        if(id >= 701 && id <= 781) {
            wIcon.src = "./img/foggy.png";
        }else
        if(id >= 801 && id <= 804) {
            wIcon.src = "./img/cloudy.png";
        }else
        if((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
            wIcon.src = "./img/rain.png";
        }

        /* Let's pass these values to a particular html element */
        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city}`, `${country}`;
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;

        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("active");
        console.log(info);
    }
}