if ("serviceWorker" in navigator) {
    // register service worker
    navigator.serviceWorker.register("service-worker.js");
  }

  /* Toggle between adding and removing the "responsive" class to menu
     when the user clicks on the icon */
// function menuToggleFunction() {
//   var myMenu = document.getElementById("navMenu");
//   if (myMenu.className === "menu") {
//     myMenu.className += " responsive";
//   } else {
//     myMenu.className = "menu";
//   }
// }

/* Current Weather Info */
 
var input = document.querySelector('.searchCity');
var main = document.querySelector('#name');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var clouds = document.querySelector('.clouds');
var button= document.querySelector('.searchCityWeather');


/* History of Weather Info */
var main_history = document.querySelector('#name_history');
var temp_history = document.querySelector('.temp_history');
var desc_history = document.querySelector('.desc_history');
var clouds_history = document.querySelector('.clouds_history');

const proxy = 'https://cors-anywhere.herokuapp.com/';
const api_key = 'bb3e93357f206c450738a7ccb85ff56b'

if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition((position) => {
        long = position.coords.longitude;
        lat = position.coords. latitude;
        
    
        const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&&units=metrics&appid=${api_key}`;
    
        fetch(api)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var tempValue = data['main']['temp'];
  var nameValue = data ['name'];
  var descValue = data['weather'][0]['description'];

  main.innerHTML = nameValue;
  desc.innerHTML = "Desc - "+descValue;
  temp.innerHTML = "Temp - "+tempValue;

  console.log(data);
  })
  .catch(function (err) {
    console.log(err);
  })

})


button.addEventListener('click', function(){
  var url = 'https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=bb3e93357f206c450738a7ccb85ff56b';
  fetch(url)
  .then(response => response.json())
  .then(data => {
    var tempValue = data['main']['temp'];
    var nameValue = data['name'];
    var descValue = data['weather'][0]['description'];

    main.innerHTML = nameValue;
    desc.innerHTML = "Desc - "+descValue;
    temp.innerHTML = "Temp - "+tempValue;
    input.value ="";

  })

  .catch(err => alert("Wrong city name!"));
  })

}

