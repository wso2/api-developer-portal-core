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
    // Set active status based on current URL path
    const setActiveSidebarLink = () => {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Set the active class based on path
        if (currentPath.endsWith('/') || currentPath === '') {
            document.getElementById('home')?.classList.add('active');
        } else if (currentPath.includes('/apis')) {
            document.getElementById('apis')?.classList.add('active');
        } else if (currentPath.includes('/applications')) {
            document.getElementById('applications')?.classList.add('active');
        }
    };
    
    // Call the function when page loads
    setActiveSidebarLink();
    
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

            // Custom select functionality
            const selectSelected = dropdown.querySelector(".select-selected");
            const selectItems = dropdown.querySelector(".select-items");
            const selectOptions = dropdown.querySelectorAll(".select-item");
            const actionItem = dropdown.querySelector(".select-action-item");
            const hiddenSelect = dropdown.querySelector("select");

            // Set first non-subscribed option as selected initially
            let firstNonSubscribedOption = null;
            selectOptions.forEach(option => {
                if (!option.querySelector('.subscription-icon') && !firstNonSubscribedOption) {
                    firstNonSubscribedOption = option;
                }
            });

            if (firstNonSubscribedOption) {
                const firstValue = firstNonSubscribedOption.getAttribute("data-value");
                const firstText = firstNonSubscribedOption.textContent.trim();

                // Update the visible selected text
                selectSelected.querySelector(".selected-text").textContent = firstText;

                // Update the hidden select value
                for (let i = 0; i < hiddenSelect.options.length; i++) {
                    if (hiddenSelect.options[i].value === firstValue) {
                        hiddenSelect.selectedIndex = i;
                        break;
                    }
                }
            }

            // Toggle dropdown when clicking on the selected item
            selectSelected.addEventListener("click", function(e) {
                e.stopPropagation();
                selectItems.classList.toggle("show");
                selectSelected.setAttribute("aria-expanded", 
                    selectItems.classList.contains("show") ? "true" : "false");
            });

            // Handle option selection
            selectOptions.forEach(item => {
                // Check if the item is subscribed
                const isSubscribed = item.querySelector('.subscription-icon') !== null;
                
                // Add disabled class if subscribed
                if (isSubscribed) {
                    item.classList.add('disabled');
                    item.style.opacity = '0.6';
                    item.style.cursor = 'not-allowed';
                }
                
                item.addEventListener("click", function(e) {
                    e.stopPropagation();
                    
                    // Don't process click if item is subscribed
                    if (isSubscribed) {
                        return;
                    }
                    
                    const value = this.getAttribute("data-value");
                    const text = this.textContent.trim();

                    // Update the visible selected text
                    selectSelected.querySelector(".selected-text").textContent = text;

                    // Update the hidden select value for form submission
                    for (let i = 0; i < hiddenSelect.options.length; i++) {
                        if (hiddenSelect.options[i].value === value) {
                            hiddenSelect.selectedIndex = i;
                            break;
                        }
                    }

                    // Close the dropdown
                    selectItems.classList.remove("show");
                    selectSelected.setAttribute("aria-expanded", "false");
                });
            });

            // Handle action item click (Create Application)
            if (actionItem) {
                actionItem.addEventListener("click", function(e) {
                    e.stopPropagation();

                    // Navigate to create application page (Or alternatively, trigger a modal)
                    window.location.href = "applications/create";

                    // Close the dropdown
                    selectItems.classList.remove("show");
                    selectSelected.setAttribute("aria-expanded", "false");
                });
            }

            // Close dropdown when clicking outside
            document.addEventListener("click", function() {
                selectItems.classList.remove("show");
                selectSelected.setAttribute("aria-expanded", "false");
            });
        }
    });
});


