// TODO:create a function that results in a beer name 
$(document).ready(function () {
    $(".beer-btn").click(function (event) {
        event.preventDefault();
        $("#card-container").empty();

        var beerName = $("#icon_prefix3").val();
        var queryURLBeer = "https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&q=" + beerName + "&facet=style_name&facet=cat_name&facet=name"

        $.ajax({
            url: queryURLBeer,
            method: "GET"
        }).then(function (response) {
            for (var i = 0; i < response.records.length; i++) {
                var beerCardMedium = $("<section>").addClass("card medium");
                $("#card-container").append(beerCardMedium);
                var beerCardImage = $("<section>").addClass("card-image waves-effect waves-block waves-light");
                beerCardMedium.append(beerCardImage);
                var beerCardBeerImage = $("<section>").addClass("activator beer-image");
                beerCardImage.append(beerCardBeerImage);
                var beerCardContent = $("<section>").addClass("card-content");
                beerCardMedium.append(beerCardContent);

                var beerCardTitleActivator = $("<span>").addClass("card-title activator beer-name");
                var beerIClass = $("<i class='material-icons right'>more_vert</i>");

                beerCardTitleActivator.text("Name: " + response.records[i].fields.name);
                beerCardTitleActivator.append(beerIClass);
                beerCardContent.append(beerCardTitleActivator);


                var learnMoreLink = $("<button class='link'>Learn More</button>");
                var currentResponse = response.records[i];
                learnMoreLink.click({ param: currentResponse }, generateBeerInfo);
                beerCardContent.append(learnMoreLink);

                var beerCardReveal = $("<section>").addClass("card-reveal");
                beerCardMedium.append(beerCardReveal);

                var beerCardTitle = $("<span>").addClass("card-title");
                beerCardReveal.append(beerCardTitle);

                var beerCloseSign = $("<i class='material-icons right'>close</i>")
                beerCardTitle.append(beerCloseSign);

                // append beerDescription
                var beerDescription = $("<p>").addClass("beer-description");
                beerDescription.text(response.records[i].fields.descript);
                beerCardReveal.append(beerDescription);
            }
        });
    });

    function generateBeerInfo(event) {
        event.preventDefault();
        console.log(event.data.param);
        $("#card-container").addClass("hidden");
        $("#beer-info").removeClass("hidden");
        var learnMoreBeerName = event.data.param.fields.name;
        $(".beer-name").text(learnMoreBeerName);
        var beerStyle = event.data.param.fields.style_name;
        $("#beer-style").text(beerStyle);
        var beerCountry = event.data.param.fields.country;
        $("#beer-country").text(beerCountry);
        var learnMoreDescription = event.data.param.fields.descript;
        $(".beer-description").text(learnMoreDescription);
        var abvVal = event.data.param.fields.abv;
        $("#abv-val").text(abvVal.toFixed(2));
        // TODO: clear values
        var ibuVal = event.data.param.fields.ibu;
        $("#ibu-val").text(ibuVal.toFixed(2));
        var srmVal = event.data.param.fields.srm;
        $("#srm-val").text(srmVal.toFixed(2));
        var learnMoreBreweryName = event.data.param.fields.name_breweries;
        $("#brewery-name").text("Breweries: " + learnMoreBreweryName);
    }


    // TODO: save user input in local storage
});