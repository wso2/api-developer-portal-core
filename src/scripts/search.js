document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("query");
    if (query) {
        document.getElementById("query").value = decodeURIComponent(query);        
    } else {
        document.getElementById("query").placeholder="Search APIs";
    }
});

document.getElementById("query").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        console.log("Enter key pressed");
        const query = document.getElementById("query").value;
        window.location.href = `${window.location.pathname}?query=${encodeURIComponent(query)}`;
        if (query) {
            searchAPIs(query);
        }
    }
});
