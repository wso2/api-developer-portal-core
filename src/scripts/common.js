const sidebar = document.getElementById('sidebar');
const collapseBtn = document.getElementById('collapseBtn');

collapseBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');

    console.log(sidebar.classList.contains('collapsed'));
    if (sidebar.classList.contains('collapsed')) {
        arrowIcon.src = "/images/arrow-left.svg";
    } else {
        arrowIcon.src = "/images/arrow-right.svg";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".api-card");
    cards.forEach(card => {
        const subscriptionBox = card.querySelector(".subscription-container");
        const dropdown = card.querySelector(".custom-dropdown");

        if (dropdown) {
            card.addEventListener("mouseenter", function () {
                dropdown.classList.add("show");
                dropdown.style.display = "block";
                subscriptionBox.classList.add("subscription-box");
            });
    
            card.addEventListener("mouseleave", function () {
                dropdown.classList.remove("show");
                dropdown.style.display = "none";
                subscriptionBox.classList.remove("subscription-box");
            });
        }
    });
});
