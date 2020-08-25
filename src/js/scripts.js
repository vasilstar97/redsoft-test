function refreshStorage() {
    let json = {};
    let domGalleryItems = document.querySelectorAll('.main__item.item[data-id]:not(.item_unactive)');
    for (var i = 0; i < domGalleryItems.length; ++i) {
        let element = domGalleryItems[i];
        let id = element.attributes['data-id'].value;
        let value = element.querySelector('.button.button_in-cart') != null;
        json[id] = value;
    }
    // domGalleryItems.forEach(element => {
    //     let id = element.attributes['data-id'].value;
    //     let value = element.querySelector('.button.button_in-cart') != null;
    //     json[id] = value;
    // });
    sessionStorage.setItem('redsoft-gallery', JSON.stringify(json));
}

function toggleButton(button, cls, doRefresh) {
    if (button.classList) {
        button.classList.toggle(cls);
        if (button.classList.contains(cls))
            button.innerHTML = "В корзине";
        else button.innerHTML = "Купить";
    } else {
        // For IE9
        var classes = button.className.split(" ");
        var i = classes.indexOf(cls);

        if (i >= 0)
            classes.splice(i, 1);
        else
            classes.push(cls);
        element.className = classes.join(" ");
    }
    if (doRefresh) refreshStorage();
}


function addToggleButtonEvents() {
    let buttons = document.querySelectorAll('.main__item.item[data-id] .button');
    for (let i = 0; i < buttons.length; i++) {
        const element = buttons[i];
        element.onclick = async function () {
            if (element.classList.contains("button_is-loading")) return;
            if (element.classList.contains("button_in-cart")) {
                toggleButton(element, 'button_in-cart', true);
                return;
            }

            let response = await fetch('https://jsonplaceholder.typicode.com/posts/' + (i + 1));
            toggleButton(element, 'button_is-loading', false);
            if (response.ok) {
                let json = await response.json();
                toggleButton(element, 'button_in-cart', true);
                toggleButton(element, 'button_is-loading', false);
            }
        };
    }
}

let galleryItems = sessionStorage.getItem('redsoft-gallery');
if (galleryItems == null) {
    refreshStorage();
} else {
    let json = JSON.parse(galleryItems);
    for (var key in json) {
        let item = document.querySelector('.main__item.item[data-id="' + key + '"]');
        let button = item.querySelector('.button');
        if (json[key]) toggleButton(button, 'button_in-cart', false);
    }
}
addToggleButtonEvents();