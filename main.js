const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button");

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
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    fetchData();
}

function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

function requestApi(city){
    let apiKey = 'ca126af951544574737763ad3a9d5d16';
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
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
        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("active");
        console.log(info);
    }
}