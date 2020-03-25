
//google maps API
// async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBqvGNseOhu5v3Yg0gHMVe4unXgRoLuPQw&callback=initMap"
//<script async src="https://cse.google.com/cse.js?cx=015633656253291760630:etvibjcc0u7"></script>


//Open weather API
//api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid=b6bcb836bbf008c6cea4df94d9ca492c

//Yelp API TNZPMvhXfv08hIWezsqEy28G9IUoCK13r2UgU4F6uPSuwMr7GoXyAilaB02gqtd-LJTsx3AMMbtwkBhUtIoyItGqyYEpTjhC6ezpEEu7-OeOk03LZyzg37dsdB2XnYx


//Spotify API
//api.spotify.com

//Ticketmaster API
////"https://app.ticketmaster.com/{package}/{version}/{resource}.json?apikey=b7YejLcyutp7MC8dbDuipAPR4yrvDGy7"

//"https://app.ticketmaster.com/discovery/v1/events.json?apikey=b7YejLcyutp7MC8dbDuipAPR4yrvDGy7"

//Bands in Town
//curl -X GET "https://rest.bandsintown.com/artists/A%20Day%20To%20Remember/events?app_id=642b1873e2de4bb01c82a203278b77e2" -H "accept: application/json"
var results = []
var res=[]


$(document).ready(function(){
    $('.datepicker').datepicker();
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

$(document).on("click", "#search", function(event) {
    event.preventDefault()
    $("#info").empty()
    $("#artist").empty()
    console.log(userLng)
    
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

      //  var convertDate=moment(response[i].datetime).formatWithJDF("MM.dd.yyyy hh:mm")
      //  console.log(convertDate)
      
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
          var link=$("<a>").html("<i class='fa fa-facebook-square fa-lg' aria-hidden='true'></i>")
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
        }
        
        });
 
    });


      $(document).on("click", "#thisShow", function (event) {
       $("#eats").empty()
       var loc= $(this).attr("city")
        VenLat= $(this).attr("lat")
        Venlng = $(this).attr("lon")
       
       
       
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
      
      });
     


    