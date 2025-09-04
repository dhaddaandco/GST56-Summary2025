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
        'Rate Rationalisation': null, // No content yet
        'Goods': null, // No content yet
        'Services': null, // No content yet
        'Trade Facilitation': null, // No content yet
        'Clarifications': null, // No content yet
        'FAQ': null // No content yet
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
        
        // Search functionality
        const searchBar = document.querySelector('.search-bar');
        
        searchBar.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            // Here you could implement search functionality
            // to filter content based on the search term
            console.log('Searching for:', searchTerm);
        });
        
        searchBar.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value;
                
                // Here you could implement search functionality
                // when user presses Enter
                console.log('Search submitted:', searchTerm);
                
                // Prevent form submission if this was in a form
                e.preventDefault();
            }
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
