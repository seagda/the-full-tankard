// TODO:create a function that results in a beer name 
$(document).ready(function () {
    var queryURLBeer = `https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&`
    var beerStyle = "";
    var beerName;
    var queryURLBeerDropdown = "https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&q=&facet=style_name&facet=cat_name&facet=name"
  
    $("#style-dropdown").on("change", function () {
        queryURLBeer = "https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&"
        beerStyle = $(this).val();
  
  
        if (beerStyle !== "") {
            queryURLBeer += "q=" + beerStyle + "&";
        }
    });
  
    $.ajax({
        url: queryURLBeerDropdown,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (var i = 0; i < response.facet_groups[0].facets.length; i++) {
            var dropdownValue = response.facet_groups[0].facets[i].name;
            $("#style-dropdown").append(new Option(dropdownValue, dropdownValue));
        }
        $('select').formSelect();
  
    });
    // TODO: have dropdown list items populate beer cards with style names when clicked
    // var beerABV = document.getElementById("abv");
    // beerABV.addEventListener("click", event => {
    //     beerABV.noUiSlider.get();
    //     console.log(beerABV.noUiSlider.get())
    // });
  
    // var beerIBU = document.getElementById("ibu");
    // beerIBU.addEventListener("click", event => {
    //     beerIBU.noUiSlider.get();
    //     console.log(beerIBU.noUiSlider.get())
    // });
  
    $(".beer-btn").click(function (event) {
        event.preventDefault();
        beerName = $('#beer-keywords').val();
        $("#card-container").empty();
        if (beerName !== "") {
            queryURLBeer += "q=" + beerName;
        };
        $.ajax({
            url: queryURLBeer,
            method: "GET"
        }).then(function (response) {
  
            for (var i = 0; i < response.records.length; i++) {
                var beerCardMedium = $("<section>").addClass("card medium");
                $("#card-container").append(beerCardMedium);
  
                var beerCardContent = $("<section>").addClass("card-content");
                beerCardMedium.append(beerCardContent);
  
                var beerCardTitleActivator = $("<span>").addClass("card-title activator beer-name");
                var beerIClass = $("<i class='material-icons right'>more_vert</i>");
  
                beerCardTitleActivator.text("Name: " + response.records[i].fields.name);
                beerCardTitleActivator.append(beerIClass);
                beerCardContent.append(beerCardTitleActivator);
  
                // append beerStyle to card
                var beerStyleName = $("<p>").addClass("style");
                if (response.records[i].fields.style_name === undefined) {
                    beerStyleName.text(`No style on file for ${response.records[i].fields.name}`)
                } else {
                    beerStyleName.text("Style: " + response.records[i].fields.style_name);
                };
                beerCardContent.append(beerStyleName);
  
                // append beerCountry to card
                var beerCountryOrigin = $("<p>").addClass("country");
                if (response.records[i].fields.country === undefined) {
                    beerCountryOrigin.text(`No country of origin on file for ${response.records[i].fields.name}`)
                } else {
                    beerCountryOrigin.text("Country of origin: " + response.records[i].fields.country);
                };
                beerCardContent.append(beerCountryOrigin);
  
                // append beerABV to card
                var beerCardABV = $("<p>").addClass("abv");
                if (response.records[i].fields.abv === undefined) {
                    beerCardABV.text(`No ABV on file for ${response.records[i].fields.name}`)
                } else {
                    beerCardABV.text("ABV: " + response.records[i].fields.abv.toFixed(2));
  
                };
                beerCardContent.append(beerCardABV);
  
  
                // append beerIBU to card 
                var beerCardIBU = $("<p>").addClass("ibu");
                if (response.records[i].fields.ibu === undefined) {
                    beerCardIBU.text(`No IBU on file for ${response.records[i].fields.name}`)
                } else {
                    beerCardIBU.text("IBU: " + response.records[i].fields.ibu.toFixed(2));
                };
                beerCardContent.append(beerCardIBU);
  
  
                // append briefBeerDescription to card
                var briefBeerDescription = $("<p>").addClass("brief-descript activator");
                if (response.records[i].fields.descript.length > 100) {
                    briefBeerDescription.text(response.records[i].fields.descript.substr(0, 100) + "...");
                }
                else {
                    briefBeerDescription.text(response.records[i].fields.descript);
                }
  
  
                beerCardContent.append(briefBeerDescription)
  
                //  append brewery info and link to brewery.html
                var beerBrewery = $("<a target='_blank'>").addClass("beer-brewery");
                if (response.records[i].fields.name_breweries === undefined) {
                    beerBrewery.text(`No brewery on file for ${response.records[i].fields.name}`)
                } else {
                    beerBrewery.text("Brewery: " + response.records[i].fields.name_breweries);
                    beerBrewery.attr("href", "brewery.html")
                };
                beerCardContent.append(beerBrewery);
  
  
  
  
                var beerCardReveal = $("<section>").addClass("card-reveal");
                beerCardMedium.append(beerCardReveal);
  
                var beerCardTitle = $("<span>").addClass("card-title");
                beerCardReveal.append(beerCardTitle);
  
                var beerCloseSign = $("<i class='material-icons right'>close</i>")
                beerCardTitle.append(beerCloseSign);
  
  
  
  
                // append briefBeerDescription to hidden card
                var beerDescription = $("<p>").addClass("full-descript");
                beerDescription.text(response.records[i].fields.descript);
                beerCardReveal.append(beerDescription);
            };
        });
  
    });
  
    // 
    //  user dropdownSelection goes here
  
  
    //     // TODO: save user input in local storage
  
  });