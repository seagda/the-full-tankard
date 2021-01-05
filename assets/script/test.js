$(document).ready(function () {
    $(".brewery-btn").click(function (event) {
        event.preventDefault();
        $("#brewery-card-container").empty();
    var queryURLBrewery = "https://api.openbrewerydb.org/breweries?"
    var breweryCity = $("#search-by-city").val();
    console.log(breweryCity);
    var brewery = $("#search-by-name").val();
    console.log(brewery);
    var storedBrewery = localStorage.getItem("stored brewery")
    var storedBreweryCity = localStorage.getItem("stored brewery city")
    if (breweryCity !== "") {
    queryURLBrewery += "by_city=" + breweryCity + "&"};
    localStorage.setItem("stored brewery city", breweryCity);
    if (brewery !== "") {
    queryURLBrewery += "by_name=" + brewery;
    
    };
    localStorage.setItem("stored brewery", brewery);
    console.log(queryURLBrewery);
        $.ajax({
          url: queryURLBrewery,
          method: "GET"
        }).then(function (response) {
    
          console.log(response);
          console.log(response.length);
          for (var i = 0; i < response.length; i++) {
            // console.log(response[i].name);
            var card = $("<section>").addClass("card horizontal");
            var cardImage = $("<section>").addClass("card-image");
            var cardStacked = $("<section>").addClass("card-stacked");
            var cardContent = $("<section>").addClass("card-content");
    
            var breweryName = $("<h4>").addClass("company-name");
            breweryName.text("Name: " + response[i].name);
            $("#company-name").append(breweryName);
    
            var breweryStreet = $("<h6>").addClass("address");
            breweryStreet.text("Address: " + response[i].street + ", " + response[i].city + ", " + response[i].state + ", " + response[i].postal_code);
            $("#address").append(breweryStreet);
            
            var breweryPhone = $("<h6>").addClass("phone-num");
            breweryPhone.text("Phone number: " + response[i].phone);
            $("#phone-num").append(breweryPhone);
            var getDirection = $("<button>").addClass("waves-effect btn get-direction-btn");
            getDirection.text("Get Directions");
            cardContent.append(breweryName);
            cardContent.append(breweryStreet);
            cardContent.append(breweryPhone);
            cardContent.append(getDirection);
            // TODO: Figure out how to link this href such that when you click on the link it redirects you to the brewery's website
            var cardAction = $("<a target='_blank'>").addClass("card-action");
            cardAction.text(response[i].website_url);
            cardAction.attr("href", response[i].website_url);
            //$("#card-action").append(cardAction);
            cardStacked.append(cardContent);
            cardStacked.append(cardAction);
            card.append(cardStacked);
            $("#brewery-card-container").append(card);
          }
    
        });
      });
    });