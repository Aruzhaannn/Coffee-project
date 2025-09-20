const filterButtons = document.querySelectorAll(".filter_buttons button");
const filterCards = document.querySelectorAll(".filter_cards .cards_img");

// console.log(filterButtons, filterCards);

const filterableCards = e => {
    document.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");
    
    filterCards.forEach(cards_img => {
        cards_img.classList.add("hide");
        if(cards_img.dataset.name === e.target.dataset.name || e.target.dataset.name === "all"){
            cards_img.classList.remove("hide");
        }
    });
};

filterButtons.forEach(button => button.addEventListener("click", filterableCards));