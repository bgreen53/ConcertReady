
//google maps API
// async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBqvGNseOhu5v3Yg0gHMVe4unXgRoLuPQw&callback=initMap"
  

 //Open weather API
//api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid=b6bcb836bbf008c6cea4df94d9ca492c

//Spotify API
//api.spotify.com

//Ticketmaster API
////"https://app.ticketmaster.com/{package}/{version}/{resource}.json?apikey=b7YejLcyutp7MC8dbDuipAPR4yrvDGy7"

//"https://app.ticketmaster.com/discovery/v1/events.json?apikey=b7YejLcyutp7MC8dbDuipAPR4yrvDGy7"

//Bands in Town
//curl -X GET "https://rest.bandsintown.com/artists/A%20Day%20To%20Remember/events?app_id=642b1873e2de4bb01c82a203278b77e2" -H "accept: application/json"

$(document).ready(function(){
    $('.datepicker').datepicker();
  });


$(document).on("click", "#search", function(event) {
    event.preventDefault()
    var band = $("#artist").val().trim().split(" ").join("%20")
    
    console.log(band)
    var queryURL = "https://rest.bandsintown.com/artists/"+ band +"/events?app_id=642b1873e2de4bb01c82a203278b77e2" 
    //-H "accept: application/json"

  console.log(band)
  console.log(queryURL)

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
       // var results = response.data;
       console.log(response)
       console.log(response[0].venue.name)
       //console.log(results)
       console.log(response[0].artist.image_url)
        
        for (var i = 0; i < response.length; i++) {
          var showInfo = $("<div>");
          showInfo.append(venues)
          showInfo.append(venueLoc)
          showInfo.append(date)

          


          var pic=$("<img>");
          pic.attr("src", response[0].artist.thumb_url)
          var shows = response[i];
          var venues= $("<p>").html(response[i].venue.name)
          var venueLoc=$("<p>").html(response[i].venue.city + ", " + response[i].venue.region)
          var date= $("<p>").html(response[i].datetime)
          
            console.log(pic)

            if(response[i].venue.region === ""){
               venueLoc= $("<p>").html(response[i].venue.city + ", " + response[i].venue.country)
              }
            
        $("#pic").html(pic)
        $("#info").append(showInfo)
        //$("#info").append(venueLoc)
        //$("#info").append(date)
        }
         // var p = $("<p>").text("Rating: " + rating);

          //var personImage = $("<img>");
         // personImage.attr("src", results[i].images.fixed_height.url);

         // gifDiv.prepend(p);
         // gifDiv.prepend(personImage);

         //$("#gifs").prepend(gifDiv);
        });
      
    
    });