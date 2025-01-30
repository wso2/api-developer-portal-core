document.addEventListener('DOMContentLoaded', (event) => {
    const params = new URLSearchParams(window.location.search);
    const tags = params.get("tags");
    if (tags) {
        const tagArray = tags.split(',');
        tagArray.forEach(tag => {
            const element = document.getElementById(tag.toLowerCase());
            if (element) {
                element.checked = true;
            }
        });
    }
});


const filterButton = document.getElementById('filter');

if (filterButton) {
    filterButton.addEventListener('click', () => {
        let selectedTags = [];
        document.querySelectorAll('.form-check-input:checked').forEach(checkedCheckbox => {
            selectedTags.push(checkedCheckbox.getAttribute('data-tag'));
        });
        const tagsParam = selectedTags.join(',');
        window.location.href = `${window.location.pathname}?tags=${tagsParam}`;
    });
}