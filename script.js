    // GST Website Interactive Functionality

    document.addEventListener('DOMContentLoaded', function() {
        // Navigation functionality
        const navItems = document.querySelectorAll('.nav-item');
        const tabContents = document.querySelectorAll('.tab-content');
        
            // Create a mapping of navigation items to content sections
    const tabMapping = {
        'Overview': null, // No content yet
        'Compensation Cess': 'compensation-cess-content',
        'Intermediaries': 'intermediaries-content',
        'Refunds': 'refunds-content',
        'Rate Rationalisation': 'rate-rationalisation-content',
        'Registration': 'registration-content',
        'Supply & Discounts': 'supply-discounts-content',
        'GSTAT': 'gstat-content',
        'Anti Profiteering': 'anti-profiteering-content',
        'Challenges': 'challenges-content',
        'Time of Supply': 'time-of-supply-content'
    };
        
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all items
                navItems.forEach(nav => nav.classList.remove('active'));
                
                // Add active class to clicked item
                this.classList.add('active');
                
                // Hide all tab contents
                tabContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // Show the corresponding content
                const tabName = this.textContent.trim();
                const contentId = tabMapping[tabName];
                
                if (contentId) {
                    const targetContent = document.getElementById(contentId);
                    if (targetContent) {
                        targetContent.classList.add('active');
                    }
                }
                
                console.log('Selected tab:', tabName);
                    });
    });
    
    // Sub-tab functionality for Rate Rationalisation
    const subNavItems = document.querySelectorAll('.sub-nav-item');
    const subTabContents = document.querySelectorAll('.sub-tab-content');
    
    subNavItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all sub-nav items
            subNavItems.forEach(subNav => subNav.classList.remove('active'));
            
            // Add active class to clicked sub-nav item
            this.classList.add('active');
            
            // Hide all sub-tab contents
            subTabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Show the corresponding sub-tab content
            const subTabId = this.getAttribute('data-subtab');
            const targetContent = document.getElementById(subTabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            console.log('Selected sub-tab:', this.textContent);
        });
    });
    
    // Search functionality
        const searchBar = document.querySelector('.search-bar');
        
        searchBar.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                // If search is empty, show the currently active tab
                const activeTab = document.querySelector('.tab-content.active');
                if (activeTab) {
                    activeTab.style.display = 'block';
                }
                clearSearchHighlights();
                hideSearchMessage();
                return;
            }
            
            // Search through all content sections
            const contentSections = document.querySelectorAll('.tab-content');
            let foundResults = false;
            
            contentSections.forEach(section => {
                const sectionText = section.textContent.toLowerCase();
                const sectionTitle = section.querySelector('.content-title')?.textContent.toLowerCase() || '';
                const sectionTitles = section.querySelectorAll('.section-title');
                const sectionSubtitles = section.querySelectorAll('.section-subtitle');
                
                // Check if search term matches title, section titles, or content
                const titleMatch = sectionTitle.includes(searchTerm);
                const contentMatch = sectionText.includes(searchTerm);
                
                // Check section titles and subtitles
                let sectionMatch = false;
                sectionTitles.forEach(title => {
                    if (title.textContent.toLowerCase().includes(searchTerm)) {
                        sectionMatch = true;
                    }
                });
                sectionSubtitles.forEach(subtitle => {
                    if (subtitle.textContent.toLowerCase().includes(searchTerm)) {
                        sectionMatch = true;
                    }
                });
                
                if (titleMatch || contentMatch || sectionMatch) {
                    section.style.display = 'block';
                    section.classList.add('search-result');
                    foundResults = true;
                    
                    // Highlight matching text
                    highlightSearchTerm(section, searchTerm);
                } else {
                    section.style.display = 'none';
                    section.classList.remove('search-result');
                }
            });
            
            // Show message if no results found
            showSearchResults(foundResults, searchTerm);
        });
        
        searchBar.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value;
                
                // Trigger search on Enter key
                this.dispatchEvent(new Event('input'));
                
                // Prevent form submission if this was in a form
                e.preventDefault();
            }
        });
        
        // Function to highlight search terms
        function highlightSearchTerm(element, searchTerm) {
            const walker = document.createTreeWalker(
                element,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );
            
            const textNodes = [];
            let node;
            
            while (node = walker.nextNode()) {
                textNodes.push(node);
            }
            
            textNodes.forEach(textNode => {
                const parent = textNode.parentNode;
                if (parent.tagName !== 'SCRIPT' && parent.tagName !== 'STYLE' && parent.tagName !== 'MARK') {
                    const text = textNode.textContent;
                    const regex = new RegExp(`(${searchTerm})`, 'gi');
                    const highlightedText = text.replace(regex, '<mark class="search-highlight">$1</mark>');
                    
                    if (highlightedText !== text) {
                        const wrapper = document.createElement('span');
                        wrapper.innerHTML = highlightedText;
                        parent.replaceChild(wrapper, textNode);
                    }
                }
            });
        }
        
        // Function to show search results message
        function showSearchResults(foundResults, searchTerm) {
            let messageElement = document.getElementById('search-message');
            
            if (!foundResults && searchTerm !== '') {
                if (!messageElement) {
                    messageElement = document.createElement('div');
                    messageElement.id = 'search-message';
                    messageElement.className = 'search-message';
                    document.querySelector('.content-container').insertBefore(messageElement, document.querySelector('.content-container').firstChild);
                }
                messageElement.innerHTML = `<p>No results found for "<strong>${searchTerm}</strong>". Try a different search term.</p>`;
                messageElement.style.display = 'block';
            } else if (messageElement) {
                messageElement.style.display = 'none';
            }
        }
        
        // Function to clear search highlights
        function clearSearchHighlights() {
            const highlights = document.querySelectorAll('.search-highlight');
            highlights.forEach(highlight => {
                const parent = highlight.parentNode;
                parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
                parent.normalize();
            });
        }
        
        // Function to hide search message
        function hideSearchMessage() {
            const messageElement = document.getElementById('search-message');
            if (messageElement) {
                messageElement.style.display = 'none';
            }
        }
        
        // Clear search when clicking on navigation
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                searchBar.value = '';
                clearSearchHighlights();
                hideSearchMessage();
                
                // Remove search result class from all sections
                const searchResults = document.querySelectorAll('.search-result');
                searchResults.forEach(section => {
                    section.classList.remove('search-result');
                });
            });
        });
        
        // Smooth scrolling for any internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Add hover effects for better user experience
        const contentSections = document.querySelectorAll('.content-section');
        
        contentSections.forEach(section => {
            section.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            section.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
        
        // Add loading animation (optional)
        window.addEventListener('load', function() {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });
        
        // Print functionality (optional)
        const printButton = document.createElement('button');
        printButton.textContent = 'Print Page';
        printButton.className = 'print-button';
        printButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #3b82f6;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            z-index: 1000;
        `;
        
        printButton.addEventListener('click', function() {
            window.print();
        });
        
        document.body.appendChild(printButton);
        
        // Add print styles
        const printStyles = document.createElement('style');
        printStyles.textContent = `
            @media print {
                .print-button {
                    display: none !important;
                }
                .header {
                    background-color: #1e3a8a !important;
                    -webkit-print-color-adjust: exact;
                    color-adjust: exact;
                }
                .navigation {
                    background: linear-gradient(135deg, #3b82f6, #1e40af) !important;
                    -webkit-print-color-adjust: exact;
                    color-adjust: exact;
                }
                .content-container {
                    box-shadow: none !important;
                    border: 1px solid #ddd;
                }
            }
        `;
        document.head.appendChild(printStyles);
    });
