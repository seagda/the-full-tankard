// Javascript for creating search paramaters IN ACCORDANCE WITH MATERIALIZE

// Create number of results
var numberArticle = document.getElementById("number-article");
noUiSlider.create(numberArticle, {
    start: 5,
    connect: 'lower',
    step: 1,
    range: {
        'min': 0,
        'max': 10
    },
    format: wNumb({
        decimals: 0
    })
});

// Create year Range
var yearRange = document.getElementById("year-range");
noUiSlider.create(yearRange, {
    start: [2019, 2021],
    connect: true,
    step: 1,
    orientation: 'horizontal',
    range: {
        'min': 2015,
        'max': 2021
    },
    format: wNumb({
        decimals: 0
    })
});

// Create variable for button element
var searchArticle = document.getElementById("article-button");

// Set click event for button that passes the parameters
searchArticle.addEventListener("click", event => {
    event.preventDefault();
    $(".preloader-wrapper").removeClass("hidden");
    $("#article-row").empty();

    // Get pageSize, toPublishedDate, and fromPublishedDate from slide selector element
    var pageSizeSlide = document.getElementById("number-article");
    var dateRangeSlide = document.getElementById("year-range");

    var pageSize = pageSizeSlide.noUiSlider.get();
    var fromPublishedDate = dateRangeSlide.noUiSlider.get()[0] + "-01-01";
    var toPublishedDate = dateRangeSlide.noUiSlider.get()[1] + "-12-31";
    var articleQuery = $("#article-keyword").val();

    if (articleQuery !== "") {
        $(".article-btn").removeClass("modal-trigger");
        $(".article-btn").removeAttr("href");
    } else {
        $(".article-btn").addClass("modal-trigger");
        $(".article-btn").attr("href", "#modal");
    }

    // Settings for Ajax call
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=${articleQuery}&pageNumber=1&pageSize=${pageSize}&autoCorrect=true&fromPublishedDate=${fromPublishedDate}&toPublishedDate=${toPublishedDate}`,
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "045e0eb614mshe7dc79e7fe14caep1a845ejsnbb288956f7e2",
            "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
        }
    };

    $.ajax(settings).done(function (response) {
        $(".preloader-wrapper").addClass("hidden");

        // get unsorted results from query
        var unsortedList = response.value;
        // sort by date, descending
        function sortByDateDesc(unsortedList, datePublished) {
            return unsortedList.sort(function (a, b) {
                var x = a.datePublished; var y = b.datePublished;
                return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            });
        }
        var sortedList = sortByDateDesc(unsortedList);

        // append the sorted articles to the card row
        for (i = 0; i < pageSize; i++) {
            var origDate = sortedList[i].datePublished;
            var articleTitle = sortedList[i].title;
            var articleSrc = sortedList[i].url;
            var articleDesc = sortedList[i].description;
            var articleDate = origDate.substring(0, 10);
            var articleCard = $(`
            <section class="col s5 card">
                <section class="card-content white-text">
                    <span class="card-title display-title">${articleTitle}</span>
                    <p class="display-date">${articleDate}</p>
                    <p class="display-desc">${articleDesc}</p>
                </section>
                <section class="card-action display-link">
                    <a href="${articleSrc}" target="_blank"><button class="link">Read more</button></a>
                </section>
            </section>`);

            $("#article-row").append(articleCard);
        };

    });

});