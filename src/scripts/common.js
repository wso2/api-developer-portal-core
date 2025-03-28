document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById('sidebar');
    const collapseBtn = document.getElementById('collapseBtn');
    
    // Remove reference to sidebarPlaceholder which no longer exists
    const sidebarPlaceholder = document.getElementById('sidebarPlaceholder');
    if (sidebarPlaceholder) {
        sidebarPlaceholder.remove();
    }
    
    // Track if the mouse has left the sidebar
    let mouseLeftSidebar = false;
    
    // Add mouse enter and leave event listeners
    sidebar.addEventListener('mouseleave', () => {
        mouseLeftSidebar = true;
    });
    
    sidebar.addEventListener('mouseenter', () => {
        // If mouse re-enters and the sidebar was previously force-collapsed
        if (mouseLeftSidebar && sidebar.classList.contains('force-collapse')) {
            sidebar.classList.remove('force-collapse');
        }
        mouseLeftSidebar = false;
    });
    
    // Toggle between expanded and collapsed state when clicking the collapse button
    collapseBtn.addEventListener('click', () => {
        if (sidebar.classList.contains('expanded')) {
            // If currently expanded, collapse and add a class to prevent hover expansion
            sidebar.classList.remove('expanded');
            
            // Disable hover expansion until mouse re-enters
            sidebar.classList.add('force-collapse');
            
            // Update button text and icon
            collapseBtn.querySelector('.collapse-text').textContent = "Expand";
            collapseBtn.querySelector('i').classList.remove('bi-chevron-left');
            collapseBtn.querySelector('i').classList.add('bi-chevron-right');
        } else {
            // If currently collapsed, expand
            sidebar.classList.add('expanded');
            sidebar.classList.remove('force-collapse');
            
            // Update button text and icon
            collapseBtn.querySelector('.collapse-text').textContent = "Collapse";
            collapseBtn.querySelector('i').classList.remove('bi-chevron-right');
            collapseBtn.querySelector('i').classList.add('bi-chevron-left');
        }
    });
    
    
    // Function to show loading state on subscription button
    window.showSubscribeButtonLoading = function(button) {
        if (button) {
            // Store original text
            button.dataset.originalText = button.innerHTML;
            // Change text to "Subscribing..."
            button.innerHTML = 'Subscribing...';
            button.disabled = true;
        }
    };

    // Function to show success state on subscription button
    window.showSubscribeSuccess = function(button) {
        if (button) {
            // Show success message
            button.innerHTML = 'Subscribed!';
            button.disabled = true;
            
            // Reset back to original text after 2 seconds
            setTimeout(() => {
                resetSubscribeButtonState(button);
            }, 2000);
        }
    };

    // Function to restore subscription button state
    window.resetSubscribeButtonState = function(button) {
        if (button && button.dataset.originalText) {
            button.innerHTML = button.dataset.originalText;
            button.disabled = false;
        }
    };

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
        const dropdown = card.querySelector(".custom-dropdown");

        if (dropdown) {
            // Custom select functionality
            const selectSelected = dropdown.querySelector(".select-selected");
            const selectItems = dropdown.querySelector(".select-items");
            const searchInput = dropdown.querySelector(".select-search-input");
            const selectItemsContainer = dropdown.querySelector(".select-items-container");
            const createAppOption = dropdown.querySelector(".create-app-option");
            const searchTermElement = dropdown.querySelector(".search-term");
            
            // Select first non-subscribed app by default
            const selectFirstAvailableApp = () => {
                // Check if url query params has app ID
                let params = new URLSearchParams(window.location.search);
                let appId = "";
                let appFromParams = false;
                
                // Get application ID from URL parameters if available
                if (params.has('appID')) {
                    appId = params.get('appID');
                    appFromParams = true;
                }
                
                // If we have an app ID from params, try to find and select that app
                if (appFromParams && appId) {
                    const appItem = dropdown.querySelector(`.select-item[data-value="${appId}"]`);
                    if (appItem) {
                        const appName = appItem.getAttribute("data-app-name");
                        // Update hidden input with selected app ID
                        const hiddenField = document.getElementById(
                            dropdown.querySelector("[id^='selectedAppId-']").id
                        );
                        if (hiddenField) {
                            hiddenField.value = appId;
                        }
                        
                        // Update the display text
                        const selectedText = dropdown.querySelector(".selected-text");
                        if (selectedText) {
                            selectedText.textContent = appName;
                            selectedText.classList.add("selected");
                        }
                        
                        // Check if this app is already subscribed (disabled)
                        const subscribeButton = card.querySelector(".common-btn-primary[disabled]");
                        if (appItem.classList.contains("disabled")) {
                            // Keep the button disabled if the app is already subscribed
                            if (subscribeButton && !subscribeButton.disabled) {
                                subscribeButton.setAttribute("disabled", "disabled");
                            }
                        } else {
                            // Enable the Subscribe button if app is not already subscribed
                            if (subscribeButton) {
                                subscribeButton.removeAttribute("disabled");
                            }
                        }
                        return; // Exit early as we've handled the app selection from URL params
                    }
                }
                
                // Fall back to selecting the first available app if no app from params or app from params not found
                const firstAvailableApp = dropdown.querySelector(".select-item:not(.disabled)");
                if (firstAvailableApp) {
                    appId = firstAvailableApp.getAttribute("data-value");
                    const appName = firstAvailableApp.getAttribute("data-app-name");
                    // Update hidden input with selected app ID
                    const hiddenField = document.getElementById(
                        dropdown.querySelector("[id^='selectedAppId-']").id
                    );
                    if (hiddenField) {
                        hiddenField.value = appId;
                    }
                    
                    // Update the display text
                    const selectedText = dropdown.querySelector(".selected-text");
                    if (selectedText) {
                        selectedText.textContent = appName;
                        selectedText.classList.add("selected");
                    }
                    
                    // Enable the Subscribe button
                    const subscribeButton = card.querySelector(".common-btn-primary[disabled]");
                    if (subscribeButton) {
                        subscribeButton.removeAttribute("disabled");
                    }
                }
            };
            
            // Call this function when the page loads
            selectFirstAvailableApp();

            // Toggle dropdown when clicking on the selected item
            selectSelected.addEventListener("click", function (e) {
                e.stopPropagation();
                selectItems.classList.toggle("show");
                selectSelected.setAttribute("aria-expanded",
                    selectItems.classList.contains("show") ? "true" : "false");
                
                // Focus on search input when dropdown is opened
                if (selectItems.classList.contains("show") && searchInput) {
                    setTimeout(() => searchInput.focus(), 100);
                }
            });
            
            // Add search functionality
            if (searchInput) {
                searchInput.addEventListener("input", function(e) {
                    const searchValue = e.target.value.trim();
                    const searchValueLower = searchValue.toLowerCase();
                    const appItems = selectItemsContainer.querySelectorAll(".select-item");
                    const createAppContainer = dropdown.querySelector(".create-app-container");
                    const searchTermElement = dropdown.querySelector(".search-term");
                    let exactMatch = false;
                    
                    appItems.forEach(item => {
                        const appName = item.getAttribute("data-app-name").toLowerCase();
                        if (appName.includes(searchValueLower)) {
                            item.style.display = "flex";
                            if (appName === searchValueLower) {
                                exactMatch = true;
                            }
                        } else {
                            item.style.display = "none";
                        }
                    });
                    
                    // Update the search term in the create option and show/hide create option
                    if (searchValue && searchTermElement) {
                        searchTermElement.textContent = searchValue;
                        if (exactMatch || !searchValue) {
                            createAppContainer.style.display = "none";
                        } else {
                            createAppContainer.style.display = "block";
                        }
                    } else {
                        createAppContainer.style.display = "none";
                    }
                });
                
                // Prevent dropdown from closing when clicking in search input
                searchInput.addEventListener("click", function(e) {
                    e.stopPropagation();
                });
            }
            
            // Handle selection of application items
            const selectableItems = dropdown.querySelectorAll(".select-item:not(.disabled)");
            selectableItems.forEach(item => {
                item.addEventListener("click", function(e) {
                    e.stopPropagation();
                    
                    // Get application data
                    const appId = this.getAttribute("data-value");
                    const appName = this.getAttribute("data-app-name");
                    
                    // Update hidden input with selected app ID
                    const hiddenField = document.getElementById(
                        dropdown.querySelector("[id^='selectedAppId-']").id
                    );
                    if (hiddenField) {
                        hiddenField.value = appId;
                    }
                    
                    // Update the display text
                    const selectedText = dropdown.querySelector(".selected-text");
                    if (selectedText) {
                        selectedText.textContent = appName;
                        selectedText.classList.add("selected");
                    }
                    
                    // Enable the Subscribe button by removing the disabled attribute
                    const subscribeButton = card.querySelector(".common-btn-primary[disabled]");
                    if (subscribeButton) {
                        subscribeButton.removeAttribute("disabled");
                    }
                    
                    // Close dropdown
                    selectItems.classList.remove("show");
                    
                    // Update aria-expanded attribute
                    const combobox = dropdown.querySelector("[role='combobox']");
                    if (combobox) {
                        combobox.setAttribute("aria-expanded", "false");
                    }
                });
            });

            // Function to create application directly via API
            async function createApplicationDirectly(name, description = '') {
                try {
                    const response = await fetch('/devportal/applications', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name,
                            description,
                            type: 'WEB',
                        }),
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
                    }

                    const responseData = await response.json();
                    await showAlert(responseData.message || 'Application created successfully!', 'success');
                    
                    return responseData; // Return the full response to access applicationId
                } catch (error) {
                    console.error('Error creating application:', error);
                    await showAlert(error.message || 'Failed to create application.', 'error');
                    throw error;
                }
            }

            // Handle create app option click
            if (createAppOption) {
                createAppOption.addEventListener("click", function(e) {
                    e.stopPropagation();
                    
                    const appName = searchInput.value.trim();
                    if (appName) {
                        // Show loading state
                        createAppOption.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Creating...';
                        createAppOption.classList.add('disabled');
                        
                        // Call the API to create the application directly
                        createApplicationDirectly(appName)
                            .then(response => {
                                // Update hidden input with the new application ID
                                const hiddenField = document.getElementById(
                                    dropdown.querySelector("[id^='selectedAppId-']").id
                                );
                                if (hiddenField) {
                                    hiddenField.value = response.id;
                                }
                                
                                // Update the display text to show the new application
                                const selectedText = dropdown.querySelector(".selected-text");
                                if (selectedText) {
                                    selectedText.textContent = appName;
                                    selectedText.classList.add("selected");
                                }
                                
                                // Close the dropdown
                                selectItems.classList.remove("show");
                                selectSelected.setAttribute("aria-expanded", "false");

                                const subscribeButton = card.querySelector(".common-btn-primary");
                                if (subscribeButton) {
                                    // Find and enable the subscribe button if it's disabled
                                    subscribeButton.removeAttribute("disabled");
                                }
                            })
                            .catch(error => {
                                // Reset the button on error
                                createAppOption.innerHTML = `Create application "<span class="search-term">${appName}</span>"`;
                                createAppOption.classList.remove('disabled');
                            });
                    }
                });
            }

            // Close dropdown when clicking outside
            document.addEventListener("click", function () {
                selectItems.classList.remove("show");
                selectSelected.setAttribute("aria-expanded", "false");
                
                // Clear search input when closing dropdown
                if (searchInput) {
                    searchInput.value = '';
                    
                    // Reset visibility of all items
                    const appItems = selectItemsContainer?.querySelectorAll(".select-item");
                    appItems?.forEach(item => {
                        item.style.display = "flex";
                    });
                    
                    // Hide create app container
                    const createAppContainer = dropdown.querySelector(".create-app-container");
                    if (createAppContainer) {
                        createAppContainer.style.display = "none";
                    }
                }
            });
        }
    });

    const subscriptionCard = document.querySelectorAll(".subscription-card");
    subscriptionCard.forEach(card => {
        const subscriptionBox = card.querySelector(".subscription-container");
        const dropdown = card.querySelector(".custom-dropdown");
        const subscribeBtn = card.querySelector(".common-btn-primary.subscription-plan-subscribe-btn");

        if (dropdown && subscribeBtn) {
            subscribeBtn.addEventListener("click", function (e) {
                e.preventDefault();
                dropdown.style.display = "block";
                dropdown.classList.add("show");
                subscriptionBox.classList.add("subscription-box");
            });

            // Custom select functionality
            const selectSelected = dropdown.querySelector(".select-selected");
            const selectItems = dropdown.querySelector(".select-items");
            const selectOptions = dropdown.querySelectorAll(".select-item");
            const actionItem = dropdown.querySelector(".select-action-item");

            // Toggle dropdown when clicking on the selected item
            selectSelected.addEventListener("click", function (e) {
                e.stopPropagation();
                selectItems.classList.toggle("show");
                selectSelected.setAttribute("aria-expanded",
                    selectItems.classList.contains("show") ? "true" : "false");
            });

            // Handle action item click (Create Application)
            if (actionItem) {
                actionItem.addEventListener("click", function (e) {
                    e.stopPropagation();

                    // Open the create application modal
                    loadModal('createAppModal');

                    // Close the dropdown
                    selectItems.classList.remove("show");
                    selectSelected.setAttribute("aria-expanded", "false");
                });
            }

            // Close dropdown when clicking outside
            document.addEventListener("click", function () {
                selectItems.classList.remove("show");
                selectSelected.setAttribute("aria-expanded", "false");
            });
        }
    });

    // Load image vectors and apply theme colors
    let primaryMain = getComputedStyle(document.documentElement).getPropertyValue("--primary-main-color").trim();
    let primaryLight = getComputedStyle(document.documentElement).getPropertyValue("--primary-light-color").trim();
    let primaryLightest = getComputedStyle(document.documentElement).getPropertyValue("--primary-lightest-color").trim();
    let secondaryMain = getComputedStyle(document.documentElement).getPropertyValue("--secondary-main-color").trim();

    const apisImage = document.getElementById("apisImage");
    const launchImage = document.getElementById("launchImage");
    const heroImage = document.getElementById("heroImage");
    const applicationsImage = document.getElementById("applicationsImage");

    if (apisImage) {
        fetch(document.querySelector("#apisImage img").src)
            .then(response => response.text())
            .then(data => {
                apisImage.innerHTML = data;
                apisImage.querySelectorAll("#primaryMain").forEach(el => {
                    el.setAttribute("fill", primaryMain);

                });
                apisImage.querySelectorAll("#primaryLight").forEach(el => {
                    el.setAttribute("fill", primaryLight);

                });
                apisImage.querySelectorAll("#primaryLightest").forEach(el => {
                    el.setAttribute("fill", primaryLightest);

                });
                apisImage.querySelectorAll("#secondaryMain").forEach(el => {
                    el.setAttribute("fill", secondaryMain);

                });
            });
    }

    if (applicationsImage) {
        fetch(document.querySelector("#applicationsImage img").src)
            .then(response => response.text())
            .then(data => {
                applicationsImage.innerHTML = data;
                applicationsImage.querySelectorAll("#primaryMain").forEach(el => {
                    el.setAttribute("fill", primaryMain);
                });
                applicationsImage.querySelectorAll("#primaryLight").forEach(el => {
                    el.setAttribute("fill", primaryLight);
                });
                applicationsImage.querySelectorAll("#primaryLightest").forEach(el => {
                    el.setAttribute("fill", primaryLightest);
                });
                applicationsImage.querySelectorAll("#secondaryMain").forEach(el => {
                    el.setAttribute("fill", secondaryMain);
                });
            });
    }

    if (launchImage) {
        fetch(document.querySelector("#launchImage img").src)
            .then(response => response.text())
            .then(data => {
                launchImage.innerHTML = data;
                launchImage.querySelectorAll("#primaryMain").forEach(el => {
                    el.setAttribute("fill", primaryMain);

                });
                launchImage.querySelectorAll("#primaryLight").forEach(el => {
                    el.setAttribute("fill", primaryLight);

                });
                launchImage.querySelectorAll("#primaryLightest").forEach(el => {
                    el.setAttribute("fill", primaryLightest);

                });
                launchImage.querySelectorAll("#secondaryMain").forEach(el => {
                    el.setAttribute("fill", secondaryMain);
                });
            });
    }

    if (heroImage) {
        fetch(document.querySelector("#heroImage img").src)
            .then(response => response.text())
            .then(data => {
                heroImage.innerHTML = data;
                heroImage.querySelectorAll("#primaryMain").forEach(el => {
                    el.setAttribute("stop-color", primaryLightest);
                });
                heroImage.querySelectorAll("#primaryLight").forEach(el => {
                    el.setAttribute("stop-color", primaryLight);
                });
                heroImage.querySelectorAll("#primaryLightest").forEach(el => {
                    el.setAttribute("stop-color", primaryLightest);
                });
                heroImage.querySelectorAll("#secondaryMain").forEach(el => {
                    el.setAttribute("stop-color", secondaryMain);
                });
            });
    }

});


