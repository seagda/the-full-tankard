$(document).ready(function () {
  var breweryState;

  fetchAPI("https://api.openbrewerydb.org/breweries?");

  $("#state-dropdown").on("change", function () {
    breweryState = $(this).val();
  });

  $(".brewery-btn").click(function (event) {
    event.preventDefault();

    var queryURLBrewery = "https://api.openbrewerydb.org/breweries?";

    var breweryCity = $("#search-by-city").val();

    var breweryName = $("#search-by-name").val();

    if (breweryCity !== "") {
      queryURLBrewery += "by_city=" + breweryCity + "&";
    };

    if (breweryState !== undefined) {
      queryURLBrewery += "by_state=" + breweryState; + "&";
    };

    if (breweryName !== "") {
      queryURLBrewery += "by_name=" + breweryName;
    };

    if (breweryCity === "" && breweryState === undefined && breweryName === "") {
      $(".brewery-btn").addClass("modal-trigger");
      $(".brewery-btn").attr("href", "#modal");
    } else {
      $(".brewery-btn").removeClass("modal-trigger");
      $(".brewery-btn").removeAttr("href");
      $("#brewery-card-container").empty();
      console.log(breweryName);
      fetchAPI(queryURLBrewery);
    }
  });

  $('select').formSelect();

  function fetchAPI(url) {
    $.ajax({
      url: url,
      method: "GET"
    }).then(function (response) {
      $(".preloader-wrapper").addClass("hidden");
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
  }
});