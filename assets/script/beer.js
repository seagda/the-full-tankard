$(document).ready(function () {
    var beerStyle;
    var queryURLBeer = `https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&`;
    var listBeers = JSON.parse(localStorage.getItem("savedBeer"));
    var listIds = JSON.parse(localStorage.getItem("savedId"));

    fetchAPI("https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&rows=51&facet=style_name&facet=cat_name&facet=name_breweries&facet=country");
    displaySavedBeer();

    $("#style-dropdown").on("change", function () {
        beerStyle = $(this).val();
    });

    var queryURLBeerDropdown = "https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&q=&facet=style_name&facet=cat_name&facet=name"
    $.ajax({
        url: queryURLBeerDropdown,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < response.facet_groups[0].facets.length; i++) {
            var dropdownValue = response.facet_groups[0].facets[i].name;
            $("#style-dropdown").append(new Option(dropdownValue, dropdownValue));
        }
        $('select').formSelect();
    });

    $(".beer-btn").click(function (event) {
        event.preventDefault();
        $("#find-beer-tab").addClass("active");
        $("#card-container").addClass("active");
        $("#card-container").css("display", "block");

        $(".indicator").css("left", "402px");
        $(".indicator").css("right", "501px");
        $(".indicator").css("-webkit-transition", "all 0.6s ease");

        $("#my-beer-tab").removeClass("active");
        $("#my-beer").removeClass("active");
        $("#my-beer").css("display", "none");

        $(".preloader-wrapper").removeClass("hidden");
        localStorage.setItem("stored beer style", beerStyle);

        queryURLBeer = `https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&`;

        if (beerStyle !== undefined) {
            queryURLBeer += "q=" + beerStyle + "&";
        }

        var beerName = $("#beer-keywords").val();
        if (beerName !== "") {
            queryURLBeer += "q=" + beerName;
        };

        localStorage.setItem("stored beer", beerName)

        if (beerName === "" && beerStyle === undefined) {
            $(".beer-btn").addClass("modal-trigger");
            $(".beer-btn").attr("href", "#modal");
        } else {
            $(".beer-btn").removeClass("modal-trigger");
            $(".beer-btn").removeAttr("href");
            $("#card-container").empty();
            fetchAPI(queryURLBeer);
        }
    });

    $("#my-beer-tab").click(function () {
        $("#find-beer-tab").removeClass("active");
        $("#card-container").removeClass("active");
        $("#card-container").css("display", "none");

        $(".indicator").css("left", "511px");
        $(".indicator").css("right", "402px");
        $(".indicator").css("-webkit-transition", "all 0.6s ease");

        $("#my-beer-tab").addClass("active");
        $("#my-beer").addClass("active");
        $("#my-beer").css("display", "block");
    })

    $(document).on("click", ".fa-heart", function () {
        saveBeer($(this));
    });

    // $(document).on("click", ".beer-brewery", function () {
    //     var brewerName = $(this).text();
    //     window.location.href = "brewery.html";
    //     var queryURLBrewery = `https://api.openbrewerydb.org/breweries?by_name=${brewerName}`;

    // });

    function fetchAPI(url) {
        $.ajax({
            url: url,
            method: "GET"
        }).then(function (response) {
            $(".preloader-wrapper").addClass("hidden");
            for (var i = 0; i < response.records.length; i++) {
                var saveState = isSaved(response.records[i]);
                createCard(response.records[i], i, $("#card-container"), saveState);
            };
        });
    }

    function saveBeer(selectedBeer) {
        var state = selectedBeer.attr("data-state");
        var beerIndex = selectedBeer.attr("data-index");
        var savedBeer;

        $.ajax({
            url: queryURLBeer,
            method: "GET"
        }).then(function (response) {
            if (state === "unsave") {
                savedBeer = response.records[beerIndex];
                var beerId = savedBeer.fields.id;
                var inArr = $.inArray(beerId, listIds);
                var savedIcon = selectedBeer.attr("data-saved");

                selectedBeer.attr("class", savedIcon);
                selectedBeer.attr("data-state", "saved");

                if (localStorage.getItem("savedBeer") === null) {
                    listBeers = [{ beerId: beerId, beerData: savedBeer }];
                    listIds = [beerId];
                } else {
                    if (inArr === -1 || listBeers.length === 0) {
                        listBeers.push({ beerId: beerId, beerData: savedBeer });
                        listIds.push(beerId);
                    }
                }
            } else {
                var removedId = listIds[beerIndex];
                var inArr = $.inArray(removedId, listIds);
                var unsaveIcon = selectedBeer.attr("data-unsave");

                selectedBeer.attr("class", unsaveIcon);
                selectedBeer.attr("data-state", "unsave");

                if (inArr !== -1) {
                    listIds.splice(beerIndex, 1);
                    for (var i = 0; i < listBeers.length; i++) {
                        if (removedId === listBeers[i].beerId) {
                            listBeers.splice(i, 1);
                        }
                    }
                }
            }
            localStorage.setItem("savedId", JSON.stringify(listIds));
            localStorage.setItem("savedBeer", JSON.stringify(listBeers));
            displaySavedBeer();
        });
    }

    function displaySavedBeer() {
        $("#my-beer").contents().remove();
        var beerInfo = JSON.parse(localStorage.getItem("savedBeer"));

        if (beerInfo !== null) {
            for (var i = 0; i < beerInfo.length; i++) {
                var saveState = isSaved(beerInfo[i].beerData);
                createCard(beerInfo[i].beerData, i, $("#my-beer"), saveState);
            }
        }
    }

    function isSaved(info) {
        if (localStorage.getItem("savedBeer") !== null) {
            if (info.fields !== undefined) {
                var beerId = info.fields.id;
                var inArr = $.inArray(beerId, listIds);
                if (inArr === -1) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    }

    function createCard(cardInfo, index, container, saveState) {
        var beerCardMedium = $("<section>").addClass("card medium col s3");
        container.append(beerCardMedium);

        var beerCardContent = $("<section>").addClass("card-content");
        beerCardMedium.append(beerCardContent);

        var beerCardTitle = $("<span>").addClass("card-title beer-name");

        var beerSave;

        if (saveState) {
            beerSave = $(`<i class='right fas fa-heart fa-xs' data-saved='right fas fa-heart fa-xs' data-unsave='right far fa-heart fa-xs' data-state='save' data-index=${index}></i>`);
        } else {
            beerSave = $(`<i class='right far fa-heart fa-xs' data-saved='right fas fa-heart fa-xs' data-unsave='right far fa-heart fa-xs' data-state='unsave' data-index=${index}></i>`);
        }

        beerCardTitle.text(cardInfo.fields.name);
        beerCardTitle.append(beerSave);
        beerCardContent.append(beerCardTitle);

        var beerDetail = $("<section>").addClass("detail-info");
        beerCardContent.append(beerDetail);

        // append beerStyle to card
        if (cardInfo.fields.style_name !== undefined) {
            var beerStyleName = $("<section>").addClass("style chip");
            beerStyleName.text("Style: " + cardInfo.fields.style_name);
        };
        beerDetail.append(beerStyleName);

        // append beerCountry to card
        if (cardInfo.fields.country !== undefined) {
            var beerCountryOrigin = $("<section>").addClass("country chip");
            beerCountryOrigin.text("Country: " + cardInfo.fields.country);
        };
        beerDetail.append(beerCountryOrigin);

        // append beerABV to card
        var beerCardABV = $("<section>").addClass("abv chip");
        if (cardInfo.fields.abv !== undefined) {
            var beerCardABV = $("<section>").addClass("abv chip");
            beerCardABV.text("ABV: " + cardInfo.fields.abv.toFixed(2));

        };
        beerDetail.append(beerCardABV);


        // append beerIBU to card 
        if (cardInfo.fields.ibu !== undefined) {
            var beerCardIBU = $("<section>").addClass("ibu chip");
            beerCardIBU.text("IBU: " + cardInfo.fields.ibu.toFixed(2));
        };
        beerDetail.append(beerCardIBU);


        // append briefBeerDescription to card
        var beerTitle = $("<p class='sub desc-title activator'>Description: </p>");
        beerDetail.append(beerTitle);
        var briefBeerDescription = $("<p>").addClass("brief-descript");
        if (cardInfo.fields.descript !== undefined) {
            if (cardInfo.fields.descript.length > 100) {
                briefBeerDescription = $("<p>").addClass("activator");
                briefBeerDescription.text(cardInfo.fields.descript.substr(0, 100) + "...");

                beerTitle.append("<i class='material-icons right'>more_vert</i>");

                var beerCardReveal = $("<section>").addClass("card-reveal");
                beerCardMedium.append(beerCardReveal);

                var beerCardTitle = $("<span>").addClass("card-title");
                beerCardReveal.append(beerCardTitle);

                var beerCloseSign = $("<i class='material-icons right'>close</i>")
                beerCardTitle.append(beerCloseSign);


                // append briefBeerDescription to hidden card
                var beerDescription = $("<p>").addClass("full-descript");
                beerDescription.text(cardInfo.fields.descript);
                beerCardReveal.append(beerDescription);
            } else {
                briefBeerDescription.text(cardInfo.fields.descript);
            }
        } else {
            briefBeerDescription.text(`No description on file for ${cardInfo.fields.name}`);
        }
        beerDetail.append(briefBeerDescription)


        //  append brewery info and link to brewery.html
        var beerBrewery;
        if (cardInfo.fields.name_breweries === undefined) {
            beerBrewery.text(`No brewery on file for ${cardInfo.fields.name}`)
        } else {
            beerBrewery = $(`<button class="link beer-brewery" target="_blank">${cardInfo.fields.name_breweries}</button>`);
            // beerBrewery.attr("href", "brewery.html");
        };
        // beerBrewery.text(cardInfo.fields.name_breweries);
        beerDetail.append($("<p class='sub'>Brewery: </p>"));
        beerDetail.append(beerBrewery);
    }
});
