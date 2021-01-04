$(document).ready(function () {
  $(".brewery-btn").click(function (event) {
    event.preventDefault();
    $("#brewery-card-container").empty()

    var queryURLBrewery = "https://api.openbrewerydb.org/breweries?"

<<<<<<< HEAD
    var breweryCity = $("#region-keyword").val();
    var brewery = $("#brewer-keyword").val();
=======
    var breweryCity = $("#search-by-city").val();
    var breweryState = $("#search-by-state").val();
    var breweryName = $("#search-by-name").val();
    console.log(breweryName);
>>>>>>> 9ddbf8a3d327ac7b876c9d3921db069f91c416ab

    if (breweryCity !== "") {
      queryURLBrewery += "by_city=" + breweryCity + "&"
    };

    if (breweryState !== "") {
      queryURLBrewery += "by_state=" + breweryState; + "&"
    };

    if (breweryName !== "") {
      queryURLBrewery += "by_name=" + breweryName;
    };


    $.ajax({
      url: queryURLBrewery,
      method: "GET"
    }).then(function (response) {
      for (var i = 0; i < response.length; i++) {

        var card = $("<section>").addClass("card horizontal");
        var cardImage = $("<section>").addClass("card-image");
        var cardStacked = $("<section>").addClass("card-stacked");
        var cardContent = $("<section>").addClass("card-content");

        var breweryName = $("<h4>").addClass("company-name");
        breweryName.text(response[i].name);
        $("#company-name").append(breweryName);

        var breweryStreet = $("<h6>").addClass("address");
        breweryStreet.text("Address: " + response[i].street + ", " + response[i].city + ", " + response[i].state + ", " + response[i].postal_code);
        $("#address").append(breweryStreet);

        var breweryPhone = $("<h6>").addClass("phone-num");
        breweryPhone.text("Phone number: " + response[i].phone);
        $("#phone-num").append(breweryPhone);

        var getDirections = $("<a>").addClass("waves-effect btn get-directions-btn");
        getDirections.text("Get Directions");

        var passToMaps = "";
        console.log(response);
        console.log(response[i].street);

            if (response[i].street !== undefined) {
              passToMaps += response[i].street + ", ";
            }
            if (response[i].city !== undefined) {
              passToMaps += response[i].city + ", ";
            }
            if (response[i].state !== undefined) {
              passToMaps += response[i].state;
            }
        

        var link = `http://maps.google.com/maps?q=${encodeURIComponent(passToMaps)}`;
        console.log(link);
        getDirections.attr("href", link);

        cardContent.append(breweryName);
        cardContent.append(breweryStreet);
        cardContent.append(breweryPhone);
        cardContent.append(getDirections);

        //  Link to the brewery's website
        var cardAction = $("<a target='_blank'>").addClass("card-action link");
        cardAction.text("Visit Website");
        cardAction.attr("href", response[i].website_url);
        
        cardStacked.append(cardContent);
        cardStacked.append(cardAction);
        card.append(cardStacked);
        $("#brewery-card-container").append(card);
      }
    });
  });
});