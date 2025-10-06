document.addEventListener('DOMContentLoaded', () => {
    const clickableElements = document.querySelectorAll('[data-product-id]');

    initializeSearch()
    setupMobileMenu()

        // Add event listeners for the buttons
    const proposalBtn = document.getElementById('proposalBtn');
    const hireBtn = document.getElementById('hireBtn');

    if (proposalBtn) {
        proposalBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent form submission
            const task = sampleTasks.find(t => t.id === 'task-1'); // Replace with actual task ID
            showEscrowPaymentModal(task, 'task');
        });
    }

    if (hireBtn) {
        hireBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default button action
            const service = sampleServices.find(s => s.id === 'service-1'); // Replace with actual service ID
            showEscrowPaymentModal(service, 'service');
        });
    }

    clickableElements.forEach(productElement => {
        productElement.addEventListener('click', (event) => {
            const clickedFavourite = event.target.closest('.favourite');
            
            if (clickedFavourite) {
                // Toggle favourite state
                const icon = clickedFavourite.querySelector('i');
                if (icon.classList.contains('bxs-heart')) {
                    icon.classList.remove('bxs-heart');
                    icon.classList.add('bx-heart');
                } else {
                    icon.classList.remove('bx-heart');
                    icon.classList.add('bxs-heart');
                }
                event.stopPropagation(); // Prevent navigation
            } else {
                // Navigate to product details page
                const productId = productElement.getAttribute('data-product-id');
                viewProductDetails(productId);
            }
        });
    });

    const products = [

    {
        id: '4',
        productName: 'MacBook Pro 2025 Model',
        image: './Images/MacBook Pro.jpg',
        price: '1,499 π',
        category: 'Electronics',
        badges: 'Top Rated',
        condition: 'New',
        description: 'Featuring the new M4 chip, this laptop delivers exceptional performance for all your computing needs. With a stunning Retina display, long battery life, and sleek design, it\'s perfect for professionals and creatives alike. Comes with 16GB RAM and 1TB SSD storage. Brand new in box with warranty.',
        dayPosted: 'Posted 10 days ago',
        views: '1.5k views',
        likes: '300 likes',
        sellerInfo: {
            name: 'Liam Smith',
            avatar: './Images/Liam Smith.png',
            verified: false,
            rating: '4.9 (200 reviews)',
            location: 'Chicago, IL'
        }
    },

    {
        id: '5',
        productName: 'Serene haven Chair',
        image: './Images/Simple Chair.jpg',
        price: '150 π',
        category: 'Furniture',
        badges: 'Fast Shipper',
        condition: 'Good',
        description: 'This stylish armchair features a sturdy wooden frame and soft fabric upholstery, providing both comfort and durability. Its compact design makes it ideal for small spaces, while the neutral color complements various interior styles. Perfect for reading, relaxing, or adding extra seating to your living room. Gently used with minor signs of wear.',
        views: '600 views',
        dayPosted: 'Posted 7 days ago',
        likes: '75 likes',
        sellerInfo: {
            name: 'Emma Johnson',
            avatar: './Images/Emma Johnson.png',
            verified: true,
            rating: '4.6 (54 reviews)',
            location: 'Austin, TX'
        }
    },

    {
        id: '6',
        productName: 'Black Wireless Xbox Controller',
        image: './Images/XBox Controller.jpg',
        price: '65 π',
        category: 'Gaming',
        badges: 'Trusted Seller',
        condition: 'Like New',
        description: 'Featuring a comfortable ergonomic design, responsive buttons, and textured grips, it provides precise control for all your favorite games. Compatible with Xbox Series X|S, Xbox One, and Windows 10 PCs. Comes with a USB-C charging cable. Like new condition with minimal use.',
        views: '720 views',
        dayPosted: 'Posted 1 day ago',
        likes: '45 likes',
        sellerInfo: {
            name: 'Liam Thompson',
            avatar: './Images/Liam Thompson.png',
            verified: false,
            rating: '4.8 (67 reviews)',
            location: 'Seattle, WA'
        }
    }
];

// ===== SERVICES & TASKS DATA =====
const sampleTasks = [
    {
        id: 'task-1',
        type: 'task',
        title: 'Need Logo for Coffee Shop',
        description: 'Looking for a minimalist logo for my new coffee shop. Should include coffee beans and modern typography. I have some reference images to share.',
        budget: '50-100 π',
        category: 'Design',
        deadline: '5 days',
        skillsRequired: ['Logo Design', 'Branding', 'Minimalist'],
        postedBy: {
            name: 'Coffee Shop Owner',
            avatar: './Images/Emily Carter.png',
            location: 'New York, USA'
        },
        status: 'open',
        proposals: 3,
        createdAt: '2 hours ago'
    },

    {
        id: 'task-2',
        type: 'task', 
        title: 'Website Copywriting Needed',
        description: 'Need engaging copy for a new SaaS startup website. Homepage, features page, and about us page. Target audience: small business owners.',
        budget: '80-150 π',
        category: 'Writing',
        deadline: '7 days',
        skillsRequired: ['Copywriting', 'SaaS', 'Marketing'],
        postedBy: {
            name: 'Tech Startup',
            avatar: './Images/Emma Johnson.png', 
            location: 'San Francisco, CA'
        },
        status: 'open',
        proposals: 5,
        createdAt: '5 hours ago'
    }
];

const sampleServices = [
    {
        id: 'service-1',
        type: 'service',
        title: 'Professional Logo Design',
        description: 'I create custom logos with 3 concepts and unlimited revisions. Specialized in minimalist and modern designs for startups and small businesses.',
        priceRange: '50-200 π',
        category: 'Design',
        deliveryTime: '3-5 days',
        skills: ['Logo Design', 'Branding', 'Adobe Illustrator', 'Minimalist'],
        posterInfo: {
            name: 'Creative Designs Co',
            avatar: './Images/Emma Rodriguez.png',
            verified: true,
            rating: '4.9',
            reviewCount: '47 reviews',
            location: 'Remote'
        },
        completedJobs: 89,
        responseTime: '< 4 hours'
    },

    {
        id: 'service-2',
        type: 'service',
        title: 'Website Development',
        description: 'Full-stack website development with modern technologies. Responsive design, SEO optimized, and fast loading times. Perfect for businesses and portfolios.',
        priceRange: '200-500 π',
        category: 'Programming', 
        deliveryTime: '7-14 days',
        skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'SEO'],
        posterInfo: {
            name: 'Tech Solutions',
            avatar: './Images/Sarah Johnson.png',
            verified: true,
            rating: '4.8',
            reviewCount: '32 reviews',
            location: 'Remote'
        },
        completedJobs: 45,
        responseTime: '< 2 hours'
    }
];


// ===== CARD GENERATION FUNCTIONS =====

function createTaskCard(task) {
    return `
        <div class="task-card glass" data-type="task" data-id="${task.id}">
            <div class="card-body">
                <h3 class="card-title">${task.title}</h3>
                <p class="card-description">${task.description}</p>

                <div class="bagget-budget">
                    <span class="budget">${task.budget}</span>
                    <span class="badge task-badge">Task</span>
                </div>
                
                <div class="task-details">
                    <div class="detail">
                        <i class='bx bx-category'></i>
                        <span>${task.category}</span>
                    </div>
                    <div class="detail">
                        <i class='bx bx-time'></i>
                        <span>${task.deadline}</span>
                    </div>
                    <div class="detail">
                        <i class='bx bx-user'></i>
                        <span>${task.proposals} proposals</span>
                    </div>
                </div>
                
                <div class="skills">
                    ${task.skillsRequired.map(skill => 
                        `<span class="skill-tag">${skill}</span>`
                    ).join('')}
                </div>
                
                <div class="card-footer">
                    <div class="poster-info">
                        <img src="${task.postedBy.avatar}" alt="${task.postedBy.name}">
                        <div>
                            <strong>${task.postedBy.name}</strong>
                            <span>${task.createdAt}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createServiceCard(service) {
    return `
        <div class="service-card glass" data-type="service" data-id="${service.id}">
            <div class="card-body">
                <h3 class="card-title">${service.title}</h3>
                <p class="card-description">${service.description}</p>

                <div class="bagget-budget">
                    <span class="rating"><i class='bx bx-star'></i> ${service.posterInfo.rating} (${service.posterInfo.reviewCount})</span>
                    <span class="badge service-badge">Service</span>
                </div>
                
                <div class="service-details">
                    <div class="detail">
                        <i class='bx bx-category'></i>
                        <span>${service.category}</span>
                    </div>
                    <div class="detail">
                        <i class='bx bx-time'></i>
                        <span>${service.deliveryTime}</span>
                    </div>
                    <div class="detail">
                        <i class='bx bx-wallet'></i>
                        <span class="price-range">${service.priceRange}</span>
                    </div>
                </div>
                
                <div class="skills">
                    ${service.skills.map(skill => 
                        `<span class="skill-tag">${skill}</span>`
                    ).join('')}
                </div>
                
                <div class="card-footer">
                    <div class="poster-info">
                        <img src="${service.posterInfo.avatar}" alt="${service.posterInfo.name}">
                        <div>
                            <strong>${service.posterInfo.name}</strong>
                            <span>${service.posterInfo.location} • ${service.completedJobs} jobs</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

    const userProducts = JSON.parse(localStorage.getItem('products')) || []
    const allProducts = [...products, ...userProducts];

    const productContainer = document.getElementById('products');
    productContainer.innerHTML = ''; // Clear existing content


    allProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card glass'
        productCard.setAttribute('data-product-id', product.id);
        productCard.innerHTML = `
            <div class="card-header">
                <span class="condition">${product.condition}</span>
                <span class="favourite"><i class='bx bx-heart'></i></span>
            </div>
            <img class="card-image" src="${product.image || './Images/Apple MacBook.png'}" alt="${product.productName}">
            <div class="card-body">
                <h1 class="card-title">${product.productName}</h1>
                <div class="price-category">
                    <span class="price">${product.price}</span>
                    <span class="category-label">${product.category}</span>
                    <span class="badges">${product.badges || ''}</span>
                </div>
                <div class="seller-info">
                    <img src="${product.sellerInfo.avatar}" alt="Avatar">
                    <span>${product.sellerInfo.name}</span>
                </div>
                <div class="card-details">
                    <div class="location">
                        <i class='bx bxs-map'></i>
                        <span>${product.sellerInfo.location}</span>
                    </div>
                    <div class="right">
                        <div class="view">
                            <i class='bx bxs-show'></i>
                            <span>${product.views}</span>
                        </div>
                        <div class="time-posted">
                            <i class='bx bxs-time-five'></i>
                            <span>${product.dayPosted}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        productContainer.appendChild(productCard);
    });

    // Add click event for new cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', () => {
            const productId = card.getAttribute('data-product-id');
            window.location.href = `product-details.html?id=${productId}`;
        });
    });

    // ===== CATEGORY FILTERING FUNCTIONALITY =====
    const categoryPills = document.querySelectorAll('.category, .category-active');
    
    if (categoryPills.length > 0) {
        categoryPills.forEach(pill => {
            pill.addEventListener('click', function() {
                const category = this.textContent.trim();
                
                // Update active state UI
                document.querySelector('.category-active')?.classList.remove('category-active');
                this.classList.add('category-active');

                if(category === 'Services') {
                    renderServicesContent();
                    return;
                }
                
                // Filter and display products
                if (category === 'All') {
                    renderAllProducts(allProducts);
                } else {
                    const filteredProducts = allProducts.filter(product => {
                        // Handle both old string format and new object format
                        if (typeof product.category === 'object') {
                            return product.category.text === category;
                        } else {
                            return product.category === category;
                        }
                    });
                    renderFilteredProducts(filteredProducts);
                }
            });
        });
    }
    
function renderServicesContent() {
    const productContainer = document.getElementById('products');
    productContainer.innerHTML = '';
    
    // Show tasks and services
    sampleTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.innerHTML = createTaskCard(task);
        taskElement.querySelector('.task-card').addEventListener('click', () => {
            const taskId = task.id
            window.location.href = `task-details.html?id=${taskId}`;
        });
        productContainer.appendChild(taskElement);
    });
    
    sampleServices.forEach(service => {
        const serviceElement = document.createElement('div');
        serviceElement.innerHTML = createServiceCard(service);
        serviceElement.querySelector('.service-card').addEventListener('click', () => {
            const serviceId = service.id
            window.location.href = `service-details.html?id=${serviceId}`;
        });
        productContainer.appendChild(serviceElement);
    });
}

    function renderAllProducts(productsArray) {
        const productContainer = document.getElementById('products');
        productContainer.innerHTML = '';
        
        productsArray.forEach(product => {
            const productCard = createProductCard(product);
            productContainer.appendChild(productCard);
        });
        
        // Re-attach click events to the new cards
        attachProductClickEvents();
    }

    function renderFilteredProducts(filteredProducts) {
        const productContainer = document.getElementById('products');
        productContainer.innerHTML = '';
        
        if (filteredProducts.length === 0) {
            productContainer.innerHTML = `
                <div class="no-products-message">
                    <i class='bx bx-search-alt'></i>
                    <h3>No products found</h3>
                    <p>No items found in the ${document.querySelector('.category-active').textContent} category.</p>
                </div>
            `;
            return;
        }
        
        filteredProducts.forEach(product => {
            const productCard = createProductCard(product);
            productContainer.appendChild(productCard);
        });
        
        // Re-attach click events to the new cards
        attachProductClickEvents();
    }

    function createProductCard(product) {
        const productCard = document.createElement('div');
        productCard.className = 'product-card glass';
        productCard.setAttribute('data-product-id', product.id);
        productCard.innerHTML = `
            <div class="card-header">
                <span class="condition">${product.condition}</span>
                <span class="favourite"><i class='bx bx-heart'></i></span>
            </div>
            <img class="card-image" src="${product.image || './Images/Apple MacBook.png'}" alt="${product.productName}">
            <div class="card-body">
                <h1 class="card-title">${product.productName}</h1>
                <div class="price-category">
                    <span class="price">${product.price}</span>
                    <span class="category-label">${typeof product.category === 'object' ? product.category.text : product.category}</span>
                    <span class="badges">${product.badges || ''}</span>
                </div>
                <div class="seller-info">
                    <img src="${product.sellerInfo.avatar}" alt="Avatar">
                    <span>${product.sellerInfo.name}</span>
                </div>
                <div class="card-details">
                    <div class="location">
                        <i class='bx bxs-map'></i>
                        <span>${product.sellerInfo.location}</span>
                    </div>
                    <div class="right">
                        <div class="view">
                            <i class='bx bxs-show'></i>
                            <span>${product.views}</span>
                        </div>
                        <div class="time-posted">
                            <i class='bx bxs-time-five'></i>
                            <span>${product.dayPosted}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return productCard;
    }

    function attachProductClickEvents() {
        // Re-attach click events to all product cards
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', (event) => {
                const clickedFavourite = event.target.closest('.favourite');
                
                if (clickedFavourite) {
                    // Toggle favourite state
                    const icon = clickedFavourite.querySelector('i');
                    if (icon.classList.contains('bxs-heart')) {
                        icon.classList.remove('bxs-heart');
                        icon.classList.add('bx-heart');
                    } else {
                        icon.classList.remove('bx-heart');
                        icon.classList.add('bxs-heart');
                    }
                    event.stopPropagation();
                } else {
                    const productId = card.getAttribute('data-product-id');
                    viewProductDetails(productId);
                }
            });
        });
    }
    // ===== END CATEGORY FILTERING =====
})

document.querySelector('.bx-message-rounded').addEventListener('click', openMessages)

function openMessages() {
    // Create a modal for messages inbox
    const messagesModal = document.createElement('div');
    messagesModal.className = 'modal';
    messagesModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>📨 Your Messages</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="messages-inbox">
                    <div class="empty-state">
                        <i class='bx bx-conversation'></i>
                        <h3>No messages yet</h3>
                        <p>Your message inbox is empty. Start a conversation by contacting a seller!</p>
                    </div>
                    
                    <div class="conversation-list" style="display: none;">
                        <!-- Future conversations would appear here -->
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-primary" onclick="closeModal()">Close</button>
            </div>
        </div>
    `;
    
    messagesModal.querySelector('.modal-close').addEventListener('click', closeModal);
    document.body.appendChild(messagesModal);
    showModal(messagesModal);
}

function showModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal()
        }
    })
}

function closeModal() {
    const modal = document.querySelector('.modal.active');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
    document.body.style.overflow = '';
}

// ===== SEARCH FUNCTIONALITY =====
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;

    // Add a clear button (optional)
    const searchBar = document.querySelector('.search-bar');
    const clearBtn = document.createElement('i');
    clearBtn.className = 'bx bx-x search-clear';
    clearBtn.style.display = 'none';
    clearBtn.style.cursor = 'pointer';
    clearBtn.style.fontSize = '1.5rem';
    clearBtn.style.color = 'var(--color-primary)';
    searchBar.appendChild(clearBtn);

    // Event for search input
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        // Show/hide clear button
        clearBtn.style.display = searchTerm ? 'block' : 'none';
        
        // Filter products based on search term
        filterProducts(searchTerm);
    });

    // Clear search when X is clicked
    clearBtn.addEventListener('click', function() {
        searchInput.value = '';
        clearBtn.style.display = 'none';
        filterProducts(''); // Reset to show all products
        searchInput.focus();
    });

    // Close search on escape key
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchInput.value = '';
            clearBtn.style.display = 'none';
            filterProducts('');
        }
    });
}

function filterProducts(searchTerm) {
    const productCards = document.querySelectorAll('.product-card');
    const featuredProducts = document.querySelector('.products-grid');
    // const allProductsSection = document.querySelector('.all-products-container');
    
    let hasMatches = false;

    productCards.forEach(card => {
        const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
        const category = card.querySelector('.category-label')?.textContent.toLowerCase() || '';
        const description = card.getAttribute('data-description') || ''; // You might want to add this data attribute

        const matches = title.includes(searchTerm) || category.includes(searchTerm) || description.includes(searchTerm);

        card.style.display = matches || !searchTerm ? 'block' : 'none';
        
        if (matches) hasMatches = true;
    });

    // Show "no results" message if needed
    const productsContainer = document.querySelector('.products');
    if (!hasMatches && searchTerm) {
        if (!productsContainer.querySelector('.no-results-message')) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results-message';
            noResults.innerHTML = `
                <div style="text-align: center; padding: 2rem; grid-column: 1 / -1;">
                    <i class='bx bx-search-alt' style="font-size: 3rem; color: var(--color-primary);"></i>
                    <h3>No products found</h3>
                    <p>No items matching "${searchTerm}"</p>
                </div>
            `;
            productsContainer.appendChild(noResults);
        }
    } else {
        const noResults = productsContainer.querySelector('.no-results-message');
        if (noResults) noResults.remove();
    }

    // Hide featured products when searching
    if (featuredProducts) {
        featuredProducts.style.display = searchTerm ? 'none' : 'grid';
    }
    
    // Hide category pills when searching
    const categoryContainer = document.querySelector('.category-container');
    if (categoryContainer) {
        categoryContainer.style.display = searchTerm ? 'none' : 'block';
    }
}

// ===== MOBILE MENU FUNCTIONALITY =====
function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    if (!menuToggle) return;
    
    // Create mobile menu overlay
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
        <div class="mobile-menu-content">
            <div class="mobile-menu-close">
                <i class='bx bx-x'></i>
            </div>
            
            <!-- User Profile Section -->
            <div class="mobile-user-profile">
                <img src="./Images/Emily Carter.png" alt="Emily Carter" class="mobile-user-avatar">
                <div class="mobile-user-info">
                    <h3>Emily Carter</h3>
                    <p>Barcelona, Spain</p>
                    <div class="mobile-wallet">
                        <i class='bx bxs-wallet'></i>
                        <span>0.00 π</span>
                    </div>
                </div>
            </div>
            
            <!-- Menu Items -->
            <div class="mobile-menu-item" data-action="sell">
                <i class='bx bx-plus'></i>
                <span>Sell Product</span>
            </div>
            
            <div class="mobile-menu-item" data-action="messages">
                <i class='bx bx-message-rounded'></i>
                <span>Messages</span>
            </div>
            
            <div class="mobile-menu-item" data-action="profile">
                <i class='bx bx-user'></i>
                <span>My Profile</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(mobileMenu);
    
    // Toggle menu function
    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    // Open menu when hamburger is clicked
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
    
    // Close menu when X is clicked
    mobileMenu.querySelector('.mobile-menu-close').addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
    
    // Close menu when clicking outside content
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            toggleMenu();
        }
    });
    
    // Close menu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Handle menu item clicks
    mobileMenu.querySelectorAll('.mobile-menu-item').forEach(item => {
        item.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            toggleMenu(); // Close menu first
            
            switch(action) {
                case 'profile':
                    window.location.href = 'profile.html';
                    break;
                case 'sell':
                    window.location.href = 'listing.html';
                    break;
                case 'messages':
                    openMessages();
                    break;
            }
        });
    });
}

// ===== ESCROW & TRUST SYSTEM =====
function showEscrowPaymentModal(item, type) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <div class="headline">
                    <i class='bx bx-shield-alt' style="color: #10B981;"></i>
                    <h2>Pi Escrow Protection</h2>
                </div>
                <button class="modal-close"><i class='bx bx-x'></i></button>
            </div>
            
            <div class="modal-body">
                <div class="escrow-explanation">
                    <p><strong>Your Pi is safe with Orbit Escrow:</strong></p>
                    <ul>
                        <li>Pi held securely until you approve the work</li>
                        <li>24-hour review period after delivery</li>
                        <li>Dispute resolution available if needed</li>
                        <li>Funds released only after your confirmation</li>
                    </ul>
                </div>
                
                <div class="purchase-details">
                    <div class="purchase-info">
                        <h3>${type === 'task' ? 'Task: ' + item.title : 'Service: ' + item.title}</h3>
                        <p class="purchase-price">${type === 'task' ? 'Budget: ' + item.budget : 'Price: ' + item.priceRange}</p>
                    </div>
                </div>
                
                <div class="escrow-steps">
                    <div class="escrow-step">
                        <i class='bx bx-lock-alt'></i>
                        <h4>1. Pi Locked</h4>
                        <p>Funds held in secure escrow</p>
                    </div>
                    <div class="escrow-step">
                        <i class='bx bx-task'></i>
                        <h4>2. Work Delivered</h4>
                        <p>Service provider completes work</p>
                    </div>
                    <div class="escrow-step">
                        <i class='bx bx-check-circle'></i>
                        <h4>3. You Approve</h4>
                        <p>Review and confirm satisfaction</p>
                    </div>
                    <div class="escrow-step">
                        <i class='bx bx-coin'></i>
                        <h4>4. Pi Released</h4>
                        <p>Funds sent to service provider</p>
                    </div>
                </div>
            </div>
            
            <div class="modal-footer">
                <button class="btn-secondary" onclick="closeModal()">Learn More</button>
                <button class="btn-primary" id="payBtn" onclick="showPaymentSuccessModal('${item.id}', '${type}')">
                    <i class='bx bx-shield-alt'></i> Pay with Escrow Protection
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    showModal(modal);
}

function showPaymentSuccessModal(itemId, type) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <div class="headline">
                    <i class='bx bxs-check-circle' style="color: #10B981;"></i>
                    <h2>Payment Secured!</h2>
                </div>
            </div>
            
            <div class="modal-body">
                <div class="escrow-explanation">
                    <p><strong>Your Pi is now protected by Orbit Escrow</strong></p>
                    <p>The funds are locked and will only be released when you confirm the work is completed satisfactorily.</p>
                </div>
                
                <div class="next-steps">
                    <h4>What happens next?</h4>
                    <ul>
                        <li>The ${type === 'task' ? 'freelancers' : 'service provider'} has been notified</li>
                        <li>You have 24 hours to review after delivery</li>
                        <li>Orbit support available for any issues</li>
                        <li>Don't forget to leave a review after completion</li>
                    </ul>
                </div>
            </div>
            
            <div class="modal-footer">
                <button class="btn-primary" onclick="closeModal()">Continue to Orbit</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    showModal(modal);
}

let createTaskBtn = document.querySelector('.create-task');
if (createTaskBtn) {
    createTaskBtn.addEventListener('click', () => {
        window.location.href = 'create-task.html'; // Redirect to listing page
    });
}

let offerServicesBtn = document.querySelector('.offer-services');
if (offerServicesBtn) {
    offerServicesBtn.addEventListener('click', () => {
        window.location.href = 'offer-services.html'; // Redirect to listing page
    });
}

function viewProductDetails (productId) {
    window.location.href = `product-details.html?id=${productId}`;
}

let logo = document.querySelector(".logo-container");
logo.addEventListener("click", () => {
    window.location.href = "index.html"; // Redirect to homepage
});

let sellBtn = document.getElementById("sellBtn");
sellBtn.addEventListener("click", () => {
    window.location.href = "listing.html"; // Redirect to sell page
});

// REPLACE the profile avatar click event with this:
let profileAvatar = document.getElementById("profileAvatar");
profileAvatar.addEventListener('click', () => {
    window.location.href = "profile.html"
})