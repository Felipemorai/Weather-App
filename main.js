const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button");

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
})

function requestApi(city){
    let apiKey = 'ca126af951544574737763ad3a9d5d16';
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    infoTxt.innerText = "Getting Weather details...";
    infoTxt.classList.add("pending");
    /* Getting api response and returning it with parsing into js object and in another */
    /* Then function calling weatherDetails function with passing api result as an argument */
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info){
    console.log(info);
}