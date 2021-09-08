const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input");

inputField.addEventListener("keyup", e => {
    /* If user pressed enter botton and input value isn't empty */
    if(e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value);
    }
});

function requestApi(city){
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    /* Getting api response and returning it with parsing into js object and in another */
    /* Then function calling weatherDetails function with passing api result as an argument */
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info){
    console.log(info);
}