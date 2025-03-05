const sidebar = document.getElementById('sidebar');
const collapseBtn = document.getElementById('collapseBtn');

collapseBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    const arrowIcon = document.getElementById('arrowIcon');

    const urlObj = new URL(arrowIcon.src);

    if (sidebar.classList.contains('collapsed')) {
        arrowIcon.src = urlObj.origin + urlObj.pathname + "?fileType=image&fileName=arrow-left.svg";
    } else {
        arrowIcon.src = urlObj.origin + urlObj.pathname + "?fileType=image&fileName=arrow-right.svg";
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
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            navLinks.forEach(link => link.classList.remove('active'));
            event.currentTarget.classList.add('active');
        });
    });
});


