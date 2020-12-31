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
});

  
  



  
