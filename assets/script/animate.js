var abvSlider = document.getElementById("abv");
noUiSlider.create(abvSlider, {
    start: [4, 7],
    connect: true,
    step: 1,
    orientation: 'horizontal',
    range: {
        'min': 3,
        'max': 13
    },
    format: wNumb({
        decimals: 0
    })
});

var ibuSlider = document.getElementById("ibu");
noUiSlider.create(ibuSlider, {
    start: [20, 90],
    connect: true,
    step: 1,
    orientation: 'horizontal',
    range: {
        'min': 5,
        'max': 120
    },
    format: wNumb({
        decimals: 0
    })
});

$(document).ready(function () {
    $('.dropdown-trigger').dropdown();
    $('.materialboxed').materialbox();
    $('.chips').chips();
});