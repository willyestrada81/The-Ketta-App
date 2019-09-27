const restaurantCard = document.querySelector('.info-container');

function bgEvening() {
    var random = Math.floor(Math.random() * 3) + 0;
    var img = ["url('../img/restaurant-card.jpg')",
        "url('../img/restaurant-card.jpg')",
        "url('../img/restaurant-card.jpg')"];

    restaurantCard.style.backgroundImage = img[random];
}

bgEvening();