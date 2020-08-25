function refreshStorage() {
    let json = {};
    let domGalleryItems = document.querySelectorAll('.main__item.item[data-id]:not(.item_unactive)');
    domGalleryItems.forEach(element => {
        let id = element.attributes['data-id'].value;
        let value = element.querySelector('.button.button_in-cart') != null;
        json[id] = value;
    });
    sessionStorage.setItem('redsoft-gallery', JSON.stringify(json));
}

function toggleButton(button, doRefresh) {
    if (button.classList) {
        button.classList.toggle("button_in-cart");
    } else {
        // For IE9
        var classes = button.className.split(" ");
        var i = classes.indexOf("button_in-cart");

        if (i >= 0)
            classes.splice(i, 1);
        else
            classes.push("button_in-cart");
        element.className = classes.join(" ");
    }
    if (doRefresh) refreshStorage();
}

function addToggleButtonEvents() {
    document.querySelectorAll('.main__item.item[data-id] .button').forEach(element => {
        console.log(element);
        element.addEventListener('click', function () {
            toggleButton(element, true);
        });
    });
}

let galleryItems = sessionStorage.getItem('redsoft-gallery');
if (galleryItems == null) {
    refreshStorage();
} else {
    let json = JSON.parse(galleryItems);
    for (var key in json) {
        let item = document.querySelector('.main__item.item[data-id="' + key + '"]');
        let button = item.querySelector('.button');
        if (json[key]) toggleButton(button, false);
        console.log(json[key]);
    }
}
addToggleButtonEvents();