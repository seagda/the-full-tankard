$(document).ready(function () {
  $(".brewery-btn").click(function (event) {
    event.preventDefault();
    $("#brewery-card-container").empty()

    var queryURLBrewery = "https://api.openbrewerydb.org/breweries?"

    var breweryCity = $("#region-keyword").val();
    var brewery = $("#brewer-keyword").val();

    if (breweryCity !== "") {
      queryURLBrewery += "by_city=" + breweryCity + "&"
    };

    if (brewery !== "") {
      queryURLBrewery += "by_name=" + brewery;

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
        var getDirection = $("<a>").addClass("waves-effect btn get-direction-btn");

        getDirection.text("Get Directions");
        cardContent.append(breweryName);
        cardContent.append(breweryStreet);
        cardContent.append(breweryPhone);
        cardContent.append(getDirection);

        // TODO: Figure out how to link this href such that when you click on the link it redirects you to the brewery's website
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