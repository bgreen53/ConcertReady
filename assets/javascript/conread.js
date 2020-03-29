var res=[]


$(document).ready(function(){
    $('.datepicker').datepicker();
  });

  
  $(function() {
    $('#dirs').hide();
    $('#weather').hide();
    $('#Restaurants').hide();
    
});

  var curLoc= navigator.geolocation.getCurrentPosition(showPosition)
  console.log(curLoc)

  function showPosition(position) {
    console.log( "Latitude: " + position.coords.latitude +
    " Longitude: " + position.coords.longitude)
    userLat= position.coords.latitude
    userLng= position.coords.longitude

    console.log(userLat)

  }
//Bands in Town API

$(document).on("click", "#search", function(event) {
    event.preventDefault()
    $("#info").empty()
    
    
    
    
    var band = $("#artist").val().trim().split(" ").join("%20")
    
    console.log(band)
    var queryURL = "https://rest.bandsintown.com/artists/"+ band +"/events?app_id=642b1873e2de4bb01c82a203278b77e2" 
   

  console.log(band)
  console.log(queryURL)

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
       results = response;
       console.log(response)
       console.log(response[0].venue.name)
       //console.log(results)
       console.log(response[0].artist.image_url)

     
      
        for (var i = 0; i < 6; i++) {
          
          var showInfo = $("<div>");
          showInfo.addClass("card")
          
          showInfo.append(venues)
          showInfo.append(venueLoc)
          showInfo.append(date)
          showInfo.append(seeShow)

          


          var pic=$("<img>");
          pic.attr("src", response[0].artist.image_url)
          var shows = response[i];
          var venues= $("<p>").html("Venue: " + response[i].venue.name)
          var venueLoc=$("<p>").html("City: " + response[i].venue.city + ", " + response[i].venue.region)
          var date= $("<p>").html("When: " +response[i].datetime)
          var artInfo=$("<p>").html(response[0].artist.name)
          var link=$("<a>").html("<i class='fab fa-facebook fa-lg #4267b2 blue-text' aria-hidden='true'></i>")
          link.attr("href", response[0].artist.facebook_page_url)
          console.log(response[0].artist.facebook_page_url)
          var seeShow= $("<a class='waves-effect waves-light btn-small'>")
          seeShow.text("See This Show")
          seeShow.attr("id", "thisShow")
          seeShow.attr("city", response[i].venue.city)
          seeShow.attr("lat", response[i].venue.latitude )
          seeShow.attr("lon", response[i].venue.longitude)
          
            console.log(pic)

            if(response[i].venue.region === ""){
               venueLoc= $("<p>").html("City: " +response[i].venue.city + ", " + response[i].venue.country)
              }
            
        $("#pic").html(pic)
        $("#info").append(showInfo)
        $("#artInfo").html(artInfo)
        $("#fbLink").html(link)
        $("#fbLink").append("Like them on Facebook!")
        $("#artist").val("")
        }
        
        });
 
    });

    // Show Weather, Restaurants, and Directions when show is clicked

      $(document).on("click", "#thisShow", function (event) {
        $('#dirs').show();
    $('#weather').show();
    $('#Restaurants').show();
    $('#shows').removeClass('s12')
    $('#shows').addClass('s6')
       $("#eats").empty()
       var city = $(this).attr("city")
       VenLat= $(this).attr("lat")
        Venlng = $(this).attr("lon")
        Weather()
        
       
        var yelpURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude="+ VenLat +"&longitude="+ Venlng+ "&term=restaurants&limit=5";

        var apiKey = "Yu1G5QxtO5YUFSh4YZMpbCWkVfstUvpnMirspGbNWj88cLXUw3rxgqrk7G9Kpkkxx_qic8LWkb9JeOeRnnpjZkXEo4s0TXtYPCCZj7DNZ3zwn2WNlb7QoXvBHnZ5XnYx"
        console.log(yelpURL)
        $.ajax({
          url: yelpURL,
          method: "GET",
          dataType: "json",
          headers: {
            "Authorization": `Bearer ${apiKey}`
          }
        }).then(function (res) {
          var info =res.businesses
          console.log(info)
          console.log(res.businesses[0].name)
          res=res
          console.log(info.length)
          $("#map, #panel-direction").html("");
          bytutorialMap.getGeolocationData()

          for (var i = 0; i < info.length; i++){
            console.log(info[i].name)
            console.log(info)
            console.log(info.length)
            
    
            var eatsCard=$("<div class='card horizontal' >");
            var eatsPic= $("<div class = 'card-image'>")
            var resInfo=$("<div class='card-stacked'>")
            

            
            var resName=$("<h4>").text(info[i].name)
            resName.addClass("center-align")
            var resPic= $("<img>")
            resPic.attr("src", info[i].image_url)
            var resRating= $("<h5>").text(info[i].rating +" Stars")
            var resType = $("<h5>").text("Category: " +info[i].categories[0].title)

            if(info[i].rating === 3){

              resRating=$("<h5>").html("Rating:<i class='fas fa-star'></i><i class='fas fa-star' aria-hidden='true'></i><i class='fas fa-star' aria-hidden='true'></i>")

            }
            if(info[i].rating === 3.5){

              resRating=$("<h5>").html("Rating:<i class='fas fa-star'></i><i class='fas fa-star' aria-hidden='true'></i><i class='fas fa-star' aria-hidden='true'></i><<i class='fas fa-star-half' aria-hidden='true'></i>")

            }

            if(info[i].rating === 4){

              resRating=$("<h5>").html("Rating:<i class='fas fa-star'></i><i class='fas fa-star' aria-hidden='true'></i><i class='fas fa-star' aria-hidden='true'></i><i class='fas fa-star' aria-hidden='true'></i>")

            }
            if(info[i].rating === 4.5){

              resRating=$("<h5>").html("Rating:<i class='fas fa-star' aria-hidden='true'></i><i class='fas fa-star' aria-hidden='true'></i><i class='fas fa-star' aria-hidden='true'></i><i class='fas fa-star' aria-hidden='true'></i><i class='fas fa-star-half' aria-hidden='true'></i>")

            }
            if(info[i].rating === 5){

              resRating=$("<h5>").html("Rating:<i class='fas fa-star' aria-hidden='true'></i><i class='fas fa-star' aria-hidden='true'></i><i class='fas fa-star' aria-hidden='true'></i><i class='fas fa-star' aria-hidden='true'></i><i class='fas fa-star' aria-hidden='true'></i>")

            }
            

            
            eatsCard.append(eatsPic)
            eatsPic.append(resPic)
            eatsCard.append(resInfo)

            $("#eats").append(eatsCard)
            resInfo.append(resName)
            resInfo.append(resType)
            resInfo.append(resRating)
            console.log(resName)
           
            
    
          }



        });


//Maps API     
      
var geocoder = new google.maps.Geocoder();




bytutorialMap = {
	initNavigateMap: function (mapID, panelDirectionID, startLatitude, startLongitude, endLatitude, endLongitude) {
		var directionsDisplay = new google.maps.DirectionsRenderer;
		var directionsService = new google.maps.DirectionsService;
		
		
		var map = new google.maps.Map(document.getElementById(mapID), {
		  zoom: 7,
		  center: {lat: startLatitude, lng: startLongitude}
		}); 
		
	
		$("#" + panelDirectionID).html("");
		directionsDisplay.setMap(map);
		directionsDisplay.setPanel(document.getElementById(panelDirectionID));

		
		start = startLatitude + ", " + startLongitude;
		end = endLatitude + ", " + endLongitude;
		bytutorialMap.calculateAndDisplayRoute(directionsService, directionsDisplay, start, end);
	},

	calculateAndDisplayRoute: function (directionsService, directionsDisplay, start, end) {
		directionsService.route({
		  origin: start,
		  destination: end,
		  travelMode: 'DRIVING'
		}, function(response, status) {
		  if (status === 'OK') {
			directionsDisplay.setDirections(response);
		  } else {
			alert('Directions request failed due to ' + status);
		  }
		});
	},

	
	codeAddress: function (address) {
		return new Promise(function(resolve, reject){
			geocoder.geocode({ 'address': address }, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					resolve(results);
				} else {
					reject(Error("Geocode for address " + address + " was not successful for the following reason: " + status));
				}
			});
		});
	},
	
	
	getGeolocationData: function(){
		
        bytutorialMap.initNavigateMap("map", "panel-direction", userLat, userLng, VenLat, Venlng);
        
			
	},
	
	

	clearEntries: function(){
		$("#txtStartingPoint, #txtDestinationPoint").val("");
		$("#map, #panel-direction").html("");
	}
}


// Open Weather API


 function Weather(event) {
  $("#weatherData").empty()

var APIKey = "166a433c57516f51dfab1f7edaed8413";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +   "q=" + city + "&units=imperial&appid=" + APIKey;

  
console.log(queryURL)
$.ajax({
url: queryURL,
method: "GET"
})
.then(function(response) {
console.log(queryURL);
console.log(response);

var cityWeather = $("<h3>" + response.name + " Weather Details</h3>");
cityWeather.addClass('center-align')
var wind = $("<h6><i class='fas fa-wind fa-lg'></i>  " + response.wind.speed +" mph</h6>");
var humidity = $("<h6><i class='fas fa-humidity fa-lg'></i>: " + response.main.humidity+"</h6>");
var temp = $("<h6><i class='fas fa-temperature-high'></i> (F): " + response.main.temp+"</h6>");

$('#weatherData').append(cityWeather)
$('#weatherData').append(temp);
$('#weatherData').append(wind);
$('#weatherData').append(humidity);


console.log("Wind Speed: " + response.wind.speed);
console.log("Humidity: " + response.main.humidity);
console.log("Temperature (F): " + response.main.temp);
})
  
}


      })
  
 

