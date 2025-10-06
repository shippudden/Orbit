document.addEventListener('DOMContentLoaded', function() {
    // Load user's products for the listings tab (only if it exists)
    loadUserProducts();
    
    // Setup tab switching functionality
    setupProfileTabs();
});

function loadUserProducts() {
    const allProducts = JSON.parse(localStorage.getItem('products')) || [];
    const userContainer = document.querySelector('.user-products-grid');
    
    // If no container found, we're probably not on the listings tab
    if (!userContainer) return;
    
    // Filter products created by the current user
    const userProducts = allProducts.filter(product => 
        product.sellerInfo.name === 'Emily Carter' // Replace with dynamic user info later
    );
    
    if (userProducts.length === 0) {
        userContainer.innerHTML = `
            <div class="empty-state">
                <i class='bx bx-package'></i>
                <h3>No listings yet</h3>
                <p>You haven't listed any products for sale.</p>
                <button onclick="window.location.href='create-listing.html'">List Your First Item</button>
            </div>
        `;
        return;
    }
    
    // Update items count
    const itemsCount = document.querySelector('.items-count');
    if (itemsCount) {
        itemsCount.textContent = `${userProducts.length} ${userProducts.length === 1 ? 'item' : 'items'}`;
    }
    
    // Display user's products
    userContainer.innerHTML = ''; // Clear any existing content
    userProducts.forEach(product => {
        const productCard = createProductCard(product);
        userContainer.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card glass';
    card.setAttribute('data-product-id', product.id);
    card.innerHTML = `
        <div class="card-header">
            <span class="condition">${product.condition}</span>
            <span class="favourite"><i class='bx bx-heart'></i></span>
        </div>
        <img class="card-image" src="${product.image}" alt="${product.productName}">
        <div class="card-body">
            <h1 class="card-title">${product.productName}</h1>
            <div class="price-category">
                <span class="price">${product.price}</span>
                <span class="category-label">${typeof product.category === 'object' ? product.category.text : product.category}</span>
            </div>
            <div class="card-status">
                <span class="status-active">Active</span>
                <span>${product.views}</span>
            </div>
        </div>
    `;
    return card;
}

function setupProfileTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding content
            const correspondingContent = document.getElementById(`${tabName}-tab`);
            if (correspondingContent) {
                correspondingContent.classList.add('active');
            }
            
            // If clicking on Listings tab, reload products (in case new ones were added)
            if (tabName === 'listings') {
                loadUserProducts();
            }
        });
    });
}

function add404Interactions() {
    const errorSections = document.querySelectorAll('.error-404');
    
    errorSections.forEach(section => {
        // Click effect
        section.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
        
        // Hover effect - subtle glow
        section.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 20px rgba(255, 107, 107, 0.2)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
}

// Initialize 404 interactions when page loads
document.addEventListener('DOMContentLoaded', add404Interactions);