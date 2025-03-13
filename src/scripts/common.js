const sidebar = document.getElementById('sidebar');
const collapseBtn = document.getElementById('collapseBtn');

collapseBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    const arrowIcon = document.getElementById('arrowIcon');
    if (sidebar.classList.contains('collapsed')) {
        arrowIcon.style.transform = "rotate(0deg)";
    } else {
        arrowIcon.style.transform = "rotate(180deg)";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Set active status based on current URL path
    const setActiveSidebarLink = () => {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        const apiSubmenu = document.getElementById('api-submenu');
        const apisLink = document.getElementById('apis');
        
        // Function to extract base path from links in the sidebar
        const extractBasePath = () => {
            const homeLink = document.getElementById('home');
            if (homeLink && homeLink.getAttribute('href')) {
                const href = homeLink.getAttribute('href');
                // Remove trailing slash if present
                return href.endsWith('/') ? href.slice(0, -1) : href;
            }
            return '';
        };
        
        const basePath = extractBasePath();
        
        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Set the active class based on path
        if (currentPath.endsWith('/') || currentPath === '') {
            document.getElementById('home')?.classList.add('active');
            apiSubmenu.classList.remove('show');
            apisLink?.classList.remove('has-active-submenu');
        } else if (currentPath.includes('/apis')) {
            apisLink?.classList.add('active');
            apiSubmenu.classList.remove('show');
            apisLink?.classList.remove('has-active-submenu');
        } else if (currentPath.includes('/api/')) {
            apiSubmenu.classList.add('show');
            apisLink?.classList.add('active');
            apisLink?.classList.add('has-active-submenu');
            
            // Extract API ID from URL path and update submenu links
            const apiIdMatch = currentPath.match(/\/api\/([^\/]+)/);
            if (apiIdMatch && apiIdMatch[1]) {
                const apiId = apiIdMatch[1];
                
                // Update the submenu links with the correct API ID and base path
                document.getElementById('api-overview').href = `${basePath}/api/${apiId}`;
                document.getElementById('api-docs').href = `${basePath}/api/${apiId}/docs/specification`;
                
                // Set active submenu item
                if (currentPath.includes('/docs')) {
                    document.getElementById('api-docs')?.classList.add('active');
                } else {
                    document.getElementById('api-overview')?.classList.add('active');
                }
            }
        } else if (currentPath.includes('/applications')) {
            document.getElementById('applications')?.classList.add('active');
            apiSubmenu.classList.remove('show');
            apisLink?.classList.remove('has-active-submenu');
        }
    };
    
    // Call the function when page loads
    setActiveSidebarLink();

    // Set active documentation link based on current path
    const setActiveDocLink = () => {
        const currentPath = window.location.pathname;
        const docLinks = document.querySelectorAll('.doc-link');

        // Check if we're on a docs page
        if (currentPath.includes('/docs/')) {
            docLinks.forEach(link => {
                const href = link.getAttribute('href');
                // Remove active class first
                link.classList.remove('active');

                // Add active class if the href matches the current path
                if (href === currentPath ||
                    (href && currentPath.endsWith(href)) ||
                    (href && currentPath === href)) {
                    link.classList.add('active');
                }
            });
        }
    };

    // Call the function when page loads
    setActiveDocLink();

    const apiCards = document.querySelectorAll(".api-card");
    apiCards.forEach(card => {
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

                    // Open the create application modal
                    loadModal('createAppModal');

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

    const subscriptionCard = document.querySelectorAll(".subscription-card");
    subscriptionCard.forEach(card => {
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

                    // Open the create application modal
                    loadModal('createAppModal');

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


