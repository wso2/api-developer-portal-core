document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("query");

    const currentPage = window.location.pathname.split("/").pop(); // Get current file name
    const menuItems = document.querySelectorAll("nav ul li a");
    const queryId = document.getElementById("query");

    if (query) {
        document.getElementById("query").value = decodeURIComponent(query);        
    } else {
        if (queryId) {
            document.getElementById("query").placeholder="Search APIs";
        }
    }

    menuItems.forEach(item => {
        console.log("item", item.getAttribute("href").split("/").pop());
        console.log("currentPage", currentPage);
        if (item.getAttribute("href").split("/").pop() === currentPage) {
            console.log("active");
            item.classList.add("active");
        }
    });
});

const queryId = document.getElementById("query");
if (queryId) {
    queryId.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            const query = queryId.value;
            window.location.href = `${window.location.pathname}?query=${encodeURIComponent(query)}`;
        }
    });
}
