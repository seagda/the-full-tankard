$(document).ready(function () {
  var randNum = Math.floor(Math.random() * 4588);
  queryURL = `https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&rows=1&start=${randNum}&facet=style_name&facet=cat_name&facet=name_breweries&facet=country&refine.country=United+States`

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
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
      $("#url").append(`Visit <a href="${response.records[0].fields.website}" target="_blank">${response.records[0].fields.name}</a>`);
    }

  });



  //   // create a click event listerer function that displays results from user input
  $(".brewery-btn").click(function (event) {
    event.preventDefault();
    var Brewery = $("#icon_prefix2").val();

    //   // Create variable to hold brewery api key
    var queryURLBrewery = "https://api.openbrewerydb.org/breweries/search?query=" + Brewery
    $.ajax({
      url: queryURLBrewery,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      for (var i = 0; i < response.length; i++) {
        console.log(response[i].name);
        // Transfer content to HTML
        var card = $("<section>").addClass("card horizontal");
        var cardImage = $("<section>").addClass("card-image");
        var cardStacked = $("<section>").addClass("card-stacked");
        var cardContent = $("<section>").addClass("card-content");
        var breweryName = $("<h4>").addClass("company-name");
        breweryName.text("Name: " + response[i].name);
        $("#company-name").append(breweryName);
        var breweryStreet = $("<h6>").addClass("address");
        breweryStreet.text("Address " + response[i].street);
        $("#address").append(breweryStreet);
        // add city, state, zip code
        var breweryPhone = $("<h6>").addClass("phone-num");
        breweryPhone.text("Phone number: " + response[i].phone);
        $("#phone-num").append(breweryPhone);
        var getDirection = $("<button>").addClass("waves-effect btn get-direction-btn");
        cardContent.append(breweryName);
        cardContent.append(breweryStreet);
        cardContent.append(breweryPhone);
        cardContent.append(getDirection);
        var cardAction = $("<section>").addClass("card-action");
        // append website url
        cardStacked.append(cardContent);
        cardStacked.append(cardAction);
        card.append(cardStacked);
        $(".container").append(card);
      }

    });
  });
});


  // create a function that results in a beer name 

  // $(document).ready(function () {
  // $(".beer-btn").click(function (event) {
  //   event.preventDefault();

  //   var beerName = $("#icon_prefix2").val();
  //   var queryURLbeer = "https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&q="+beerName+"&facet=style_name&facet=cat_name&facet=name" 
  //   $.ajax({
  //     url: queryURLbeer,
  //     method: "GET"
  //   }).then(function (response) {
  //     $(".beer-name").text(response.facet_groups[2].facets[0].name);

  //     if (response.records[0].fields.descript === undefined) {
  //               $(".beer-description").text(`no description for ${response.records[0].fields.name} yet`)
  //           } else {
  //               $(".beer-description").text(response.records[0].fields.descript);
  //           }
  //     console.log(response.facet_groups[2].facets);
  //     for (var i = 0; i < response.length; i++) {
  //       console.log(response.facet_groups[2].facets);
  //     //   // Transfer content to HTML
  //       // var beerSearch = $("<div>")

  //       // $("body").append(beerSearch);

  //     // //   var BeerType = $("<div>")
  //     // //   BeerType.text("Type of Beer: " + response.facet_groups[2].facets);
  //     // //   // $("body").append(abv);

  //     // //   var BeerStreet = $("<div>")
  //     // //   BeerStreet.text("Beer Address " + response[i].street);
  //     // //   $("body").append(BeerName, BeerType, BeerStreet);

  //     // //   // $(".abv").text("Beer ABV : " + response[i].abv);
  //     // //   // $(".description").text("Beer description : " + response[i].description);
  //     }

  //   });
  // });
  // });

  // "https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&q="+ beer + "&facet=style_name&facet=cat_name&facet=name"



  // search by beer name, from response data find and display in html : name, brewery and ABV

