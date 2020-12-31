$(document).ready(function () {
  var randNum = Math.floor(Math.random() * 4588);
  queryURL = `https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&rows=1&start=${randNum}&facet=style_name&facet=cat_name&facet=name_breweries&facet=country&refine.country=United+States`

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    $("#rand-beer").text(response.records[0].fields.name);

    if (response.records[0].fields.descript === undefined) {
      $("#description").text(`no description for ${response.records[0].fields.name} yet`)
    } else {
      $("#description").text(response.records[0].fields.descript);
    }

    if (response.records[0].fields.style_id === "-1") {
      $("#style-name").text("style name not avaliable");
    } else {
      $("#style-name").text(response.records[0].fields.style_name);
    }

    $("#brewery-name").text(response.records[0].fields.name_breweries);

    var address = "";
    if (response.records[0].fields.address1 !== undefined) {
      address += response.records[0].fields.address1 + ", ";
    }
    if (response.records[0].fields.city !== undefined) {
      address += response.records[0].fields.city + ", ";
    }
    if (response.records[0].fields.state !== undefined) {
      address += response.records[0].fields.state;
    }
    $("#rand-address").text(address);

    if (response.records[0].fields.website === undefined) {
      $("#url").text("website not avaliable");
    } else {
      $("#url").append(`Visit <a href="${response.records[0].fields.website}" target="_blank" class="link">${response.records[0].fields.name}</a>`);
    }
  });

  $("#get-direction").on("click", function () {
    var link = `http://maps.google.com/maps?q=${encodeURIComponent($("#rand-address").text())}`;
    $(this).attr("href", link);
  });

  // TODO: Only append results relative to which textarea the user inputs their search term




  $(".brewery-btn").click(function (event) {
    event.preventDefault();
    $("#brewery-card-container").empty()
    var queryURLBrewery = "https://api.openbrewerydb.org/breweries?"
    var breweryCity = $("#icon_prefix_region").val();
    console.log(breweryCity);
    var brewery = $("#icon_prefix2").val();
    console.log(brewery);
    if (breweryCity !== "") {
      queryURLBrewery += "by_city=" + breweryCity + "&"
    };

    if (brewery !== "") {
      queryURLBrewery += "by_name=" + brewery;

    };
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


  // TODO: 
  // TODO:create a function that results in a beer name 

  $(".beer-btn").click(function (event) {
    // console.log("clicked")
    event.preventDefault();
    $("#card-container").empty()
    var beerName = $("#icon_prefix3").val();
    var queryURLBeer = "https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&q=" + beerName + "&facet=style_name&facet=cat_name&facet=name"
    $.ajax({
      url: queryURLBeer,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      // console.log(response.facet_groups[2].facets[4].name);
      // console.log(response.records[5].fields.name);
      for (var i = 0; i < response.length; i++) {
        // console.log(response[i]);
        var beerCard = $("<section>").addClass("card-container");
        var beerCardMedium = $("<section>").addClass("card medium");
        var beerCardImage = $("<section>").addClass("card-image waves-effect waves-block waves-light");
        var beerCardBeerImage = $("<section>").addClass("activator beer-image");
        var beerCardStacked = $("<section>").addClass("card-stacked");
        var beerCardContent = $("<section>").addClass("card-content");

        // append beerCardTitleActivator
        var beerCardTitleActivator = $("<span>").addClass("card-title activator beer-name");
        beerCardTitleActivator.text("Name: " + response.records[i].fields.name);
        $("#card-title activator beer-name").append(beerCardTitleActivator);


        // // TODO: do I need this one? var beerIClass = $("<i>").addClass("material-icons right");
        // // TODO: p tag and "Learn More" href
        var beerCardReveal = $("<section>").addClass("card-reveal");
        var beerCardTitle = $("<span>").addClass("card-title");

        // append beerDescription
        var beerDescription = $("<p>").addClass("beer-description");
        beerDescription.text("Description: " + response.records[i].fields.name);
        $("#beer-description").append(beerDescription);

        // append to card
        beerCardContent.append(beerCardTitleActivator);
        beerCardContent.append(beerDescription);
        beerCardStacked.append(beerCardContent);
        beerCard.append(beerCardStacked);
        $("#card-container").append(beerCard);

        // TODO: create variables to hold everything in hidden card

        var hiddenBeerClass = $("<section>").addClass("hidden");
        var hiddenBeerRow = $("<section>").addClass("row");
        var hiddenBeerColS5 = $("<section>").addClass("col s5");
        var hiddenBeerImage = $("<img>").addClass("materialboxed beer-image");
        var hiddenBeerColS1 = $("<section>").addClass("col s1");
        var hiddenBeerColS6 = $("<section>").addClass("col s6");
        var hiddenBeerInfo = $("<section>").addClass("row beer-info");

        // append hiddenBeerName
        var hiddenBeerName = $("<h1>").addClass("beer-name");
        hiddenBeerName.text("Name: " + response.records[i].fields.name);
        $("#beer-info").append(hiddenBeerName);


        var hiddenBeerTags = $("<span>").addClass("tags");
        var hiddenBeerChip = $("<section>").addClass("chip");

        // append hiddenBeerDescription
        var hiddenBeerDescription = $("<p>").addClass("beer-description");
        hiddenBeerDescription.text("Description: " + response.records[i].fields.descript);
        $("#beer-description").append(hiddenBeerDescription);


        var hiddenBeerRowValues = $("<section>").addClass("row values");
        var hiddenBeerABVCol = $("<section>").addClass("col s3");

        // append hiddenBeerABV
        var hiddenBeerABV = $("<h2>").addClass("abv-val");
        hiddenBeerABV.text("ABV: " + response.records[i].fields.abv);
        $("#abv-val").append(hiddenBeerABV);

        var hiddenBeerIBUCol = $("<section>").addClass("col s1");
        var hiddenBeerIBUCol2 = $("<section>").addClass("col s3");

        // append hiddenBeerIBU
        var hiddenBeerIBU = $("<h2>").addClass("ibu-val");
        hiddenBeerIBU.text("IBU: " + response.records[i].fields.ibu);
        $("#ibu-val").append(hiddenBeerIBU);


        var hiddenBeerSRMCol = $("<section>").addClass("col s1");
        var hiddenBeerSRMCol2 = $("<section>").addClass("col s3");

        // append hiddenBeerSRM
        var hiddenBeerSRM = $("<h2>").addClass("srm-val");
        hiddenBeerSRM.text("SRM: " + response.records[i].fields.srm);
        $("#srm-val").append(hiddenBeerSRM);

        // TODO: Not sure if we have info for hops, malts, food pairing, or glassware
        var hiddenBeerMoreInfo = $("<section>").addClass("row detail-info");
        var hiddenBeerHopsCol = $("<section>").addClass("col s5");
        var hiddenBeerHops = $("<section>").addClass("hops");
        var hiddenBeerMaltsCol = $("<section>").addClass("col s1");
        var hiddenBeerMaltsCol2 = $("<section>").addClass("col s5");
        var hiddenBeerMalts = $("<section>").addClass("malts");
        var hiddenBeerPairRow = $("<section>").addClass("beer-pair");
        var hiddenBeerPairCol = $("<section>").addClass("col s5");
        var hiddenBeerFoodPairing = $("<section>").addClass("food-pairing");
        var hiddenBeerGlasswareCol = $("<section>").addClass("col s1");
        var hiddenBeerGlasswareCol2 = $("<section>").addClass("col s5");
        var hiddenBeerGlassware = $("<section>").addClass("glassware");
        var hiddenBeerGlasswareImg = $("<section>").addClass("glassware-img");
        var hiddenBeerGlasswareType = $("<p>").addClass("glassware-type");


        var hiddenBeerBreweryRow = $("<section>").addClass("row detail-info");
        var hiddenBeerBreweryHeader = $("<h4>").addClass("col s12");

        // append hiddenBeerBreweryName
        var hiddenBeerBreweryName = $("<section>").addClass("brewery-name");
        hiddenBeerBreweryName.text("Brewery: " + response.records[i].fields.name_breweries);
        $("#brewery-name").append(hiddenBeerBreweryName);

        // TODO: append hidden card info to beerCard
        beerCardContent.append(hiddenBeerName);
        beerCardContent.append(hiddenBeerDescription);
        beerCardContent.append(hiddenBeerABV);
        beerCardContent.append(hiddenBeerIBU);
        beerCardContent.append(hiddenBeerSRM);
        beerCardContent.append(hiddenBeerBreweryName);
        beerCardStacked.append(beerCardContent);
        beerCard.append(beerCardStacked);
        $("#card-container").append(beerCard);
      }

    });
  });
});




