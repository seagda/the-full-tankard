$(document).ready(function () {
  var randNum = Math.floor(Math.random() * 4588);
  queryURL = `https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&rows=1&start=${randNum}&facet=style_name&facet=cat_name&facet=name_breweries&facet=country&refine.country=United+States`

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    $("#rand-beer").text(response.records[0].fields.name);

    if (response.records[0].fields.descript === undefined) {
      $("#rand-description").text(`no description for ${response.records[0].fields.name} yet`)
    } else {
      $("#rand-description").text(response.records[0].fields.descript);
    }

    if (response.records[0].fields.style_id === "-1") {
      $("#rand-style-name").text("style name not avaliable");
    } else {
      $("#rand-style-name").text(response.records[0].fields.style_name);
    }

    $("#rand-brewer-name").text(response.records[0].fields.name_breweries);

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
      $("#rand-url").text("website not avaliable");
    } else {
      $("#rand-url").append(`Visit <a href="${response.records[0].fields.website}" target="_blank" class="link">${response.records[0].fields.name}</a>`);
    }
  });

  $("#get-direction").on("click", function () {
    var link = `http://maps.google.com/maps?q=${encodeURIComponent($("#rand-address").text())}`;
    $(this).attr("href", link);
  });
});

// Get data for Articles from ContextualWebSearch API
const settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=beer%20Pacific%Northwest&pageNumber=1&pageSize=10&autoCorrect=true&fromPublishedDate=2020-01-01&toPublishedDate=2021-12-31",
  "method": "GET",
  "headers": {
    "x-rapidapi-key": "045e0eb614mshe7dc79e7fe14caep1a845ejsnbb288956f7e2",
    "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
  }
};

$.ajax(settings).done(function (response) {

  // get unsorted results from query
  var unsortedList = response.value;
  // sort by date, descending
  function sortByDateDesc(unsortedList, datePublished) {
    return unsortedList.sort(function (a, b) {
      var x = a.datePublished; 
      var y = b.datePublished;
      return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
  }
  var sortedList = sortByDateDesc(unsortedList);
  //        console.log(sortedList);
  // append the sorted articles to the homepage
  for (i = 0; i < 10; i++) {
    var origTitle = sortedList[i].title;
    var origDate = sortedList[i].datePublished;
    var articleTitle = origTitle;//.substring(0, 60);
    var articleSrc = sortedList[i].url;
    var articleDate = origDate.substring(0, 10);
    $("#article-list").append(`<p>${articleDate} - <a href="${articleSrc}" target="_blank" class="link">${articleTitle}</a></p>`);
    // var newsCard = $("<section>").addClass("card news-card");
    // var date = $(`<p class="date">${articleDate}</p>`);
    // var url = $(`<a class="link" href="${articleSrc}" target="_blank">${articleTitle}</a>`);
    // newsCard.append(date);
    // newsCard.append(url);
    // $("#article-container").append(newsCard);
  };

});