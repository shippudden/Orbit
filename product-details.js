const products = [
    {
        id: '1',
        productName: 'Apple MacBook Pro 2023 Model',
        image: './Images/MacBook Pro.jpg',
        price: '1,299 π',
        category: 'Electronics',
        condition: 'New',
        description: 'Experience the power of the latest Apple MacBook Pro 2023 model. Featuring the new M2 chip, this laptop delivers exceptional performance for all your computing needs. With a stunning Retina display, long battery life, and sleek design, it\'s perfect for professionals and creatives alike. Comes with 16GB RAM and 512GB SSD storage. Brand new in box with warranty.',
        views: '1.2k views',
        dayPosted: 'Posted 3 days ago',
        likes: '256 likes',
        sellerInfo: {
            name: 'Sarah Johnson',
            avatar: './Images/Sarah Johnson.png',
            verified: true,
            rating: '4.8 (128 reviews)',
            location: 'San Francisco, CA'
        }
    },

    {
        id: '2',
        productName: 'Serenity Luxe Sofa Set',
        image: './Images/Sofa.jpg',
        price: '375 π',
        category: 'Furniture',
        condition: 'Excellent',
        description: 'This elegant set includes a spacious three-seater sofa and a matching loveseat, both upholstered in premium fabric with plush cushioning for ultimate comfort. The sleek design and neutral color make it a perfect fit for any modern home decor. Ideal for relaxing or entertaining guests. Gently used and well-maintained.',
        views: '850 views',
        dayPosted: 'Posted 5 days ago',
        likes: '98 likes',
        sellerInfo: {
            name: 'Mike Chen',
            avatar: './Images/Mike Chen.png',
            verified: false,
            rating: '4.5 (76 reviews)',
            location: 'Los Angeles, CA'
        }
    },

    {
        id: '3',
        productName: 'Cannon EOS R10 Mirrorless Camera',
        image: './Images/Camera.jpg',
        price: '1,799 π',
        category: 'Electronics',
        condition: 'Like New',
        description: 'Capture stunning photos and videos with the Cannon EOS R10 Mirrorless Camera. Featuring a 24.2MP APS-C sensor, 4K video recording, and advanced autofocus system, this camera is perfect for both beginners and enthusiasts. The compact and lightweight design makes it easy to carry around for all your adventures. Comes with a 18-55mm lens, extra battery, and memory card. Like new condition with minimal use.',
        views: '1k views',
        dayPosted: 'Posted 2 days ago',
        likes: '150 likes',
        sellerInfo: {
            name: 'Emma Rodriguez',
            avatar: './Images/Emma Rodriguez.png',
            verified: true,
            rating: '4.7 (89 reviews)',
            location: 'New York, NY'
        }
    },

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
        category: 'Electronics',
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
    },
];

const userProducts = JSON.parse(localStorage.getItem('products')) || []
const allProducts = [...products, ...userProducts]

// Function to get product ID from URL
function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Function to display product details
function displayProductDetails(product) {
    document.getElementById('productName').textContent = product.productName;
    document.getElementById('productImg').src = product.image;
    document.getElementById('productPrice').textContent = product.price;
    document.getElementById('productCategory').textContent = product.category;
    document.getElementById('productCondition').textContent = product.condition
    document.getElementById('sellerBadges').textContent = product.badges || '';
    document.getElementById('productCondition').textContent = product.condition;
    document.getElementById('productDescription').textContent = product.description;
    document.getElementById('productViews').textContent = product.views;
    document.getElementById('productPostedDate').textContent = product.dayPosted;
    document.getElementById('productLikes').textContent = product.likes;
    document.getElementById('sellerAvatar').src = product.sellerInfo.avatar;
    document.getElementById('sellerName').textContent = product.sellerInfo.name;
    document.getElementById('sellerRating').textContent = product.sellerInfo.rating;
    document.getElementById('sellerLocation').textContent = product.sellerInfo.location;
    document.getElementById('sellerVerified').style.display = product.sellerInfo.verified ? 'inline' : 'none';

    // Reviews section
    const sellerRating = document.getElementById('sellerRating');
    if (product.ratings && product.ratings.length > 0) {
        sellerRating.innerHTML = product.ratings.map(rating => `
            <div class="rating">
                <p class="rating-text">${rating.text}</p>
            </div>
        `).join('');
    } else {
        sellerRating.innerHTML = "<p>No rating yet.</p>";
    }
}

    function showSnackbar(message, duration = 4000) {
        const snackbarContainer = document.getElementById('snackbarContainer')
        const snackbarMsg = document.getElementById('snackbarMsg')

        snackbarMsg.innerText = message
        snackbarContainer.classList.add('show')

        if (duration > 0) {
            setTimeout(() => {
                hideSnackbar()
            }, duration);
        }
    }

    function hideSnackbar() {
        const snackbarContainer = document.getElementById('snackbarContainer')
        snackbarContainer.classList.remove('show')
    }

// Load product details on page load
document.addEventListener('DOMContentLoaded', () => {
    const productId = getProductIdFromURL();
    const product = allProducts.find(p => p.id === productId);
    if (product) {
        displayProductDetails(product);
    } else {
        // Optionally show a "Product not found" message
        document.querySelector('.product-details').innerHTML = "<h2>Oops! We couldn't find the product you were looking for. Please check the URL or return to the homepage.</h2>";
    }

    setupActionButtons()
});

// Button functionality
function setupActionButtons() {
    const buyNowBtn = document.querySelector('.buy-now-btn');
    const contactBtn = document.querySelector('.contact-btn');
    
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', handleBuyNow);
    }
    
    if (contactBtn) {
        contactBtn.addEventListener('click', handleContactSeller);
    }
}

async function handleBuyNow() {
    const productId = getProductIdFromURL();
    const product = allProducts.find(p => p.id === productId);
    
    if (!product) {
        showSnackbar('Product not found!');
        return;
    }
    
    // Simulate payment processing
    showSnackbar('Processing your purchase...', 3000);
    
    setTimeout(() => {
        // Simulate successful payment
        const modal = createPaymentSuccessModal(product);
        document.body.appendChild(modal);
        showModal(modal);
        
    }, 3000);
}

function handleContactSeller() {
    const productId = getProductIdFromURL();
    const product = allProducts.find(p => p.id === productId);
    
    if (!product) {
        showSnackbar('Product not found!');
        return;
    }
    
    // Open chat interface
    openChatWithSeller(product.sellerInfo.name, product.productName);
}

function createPaymentSuccessModal(product) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <div class="headline">
                    <i class='bx bxs-check-circle'></i>
                    <h2>Purchase Successful!</h2>
                </div>
                <button class="modal-close"><i class='bx bx-x'></i></button>
            </div>
            <div class="modal-body">
                <div class="purchase-details">
                    <img src="${product.image}" alt="${product.productName}" class="purchase-image">
                    <div class="purchase-info">
                        <h3>${product.productName}</h3>
                        <p class="purchase-price">${product.price}</p>
                        <p class="purchase-seller">Sold by: ${product.sellerInfo.name}</p>
                    </div>
                </div>
                <div class="next-steps">
                    <h4>What's next?</h4>
                    <ul>
                        <li class="list-item">
                            <i class='bx bxs-envelope'></i> 
                            The seller will contact you within 24 hours
                        </li>
                        <li class="list-item">
                            <i class='bx bxs-package'></i> 
                            Arrange pickup or delivery details
                        </li>
                        <li class="list-item">
                            <i class='bx bxs-star'></i> 
                            Don't forget to leave a review after receiving your item
                        </li>
                    </ul>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-primary">Continue Shopping</button>
                <button class="btn-secondary">Message Seller</button>
            </div>
        </div>
    `;
    const continueBtn = modal.querySelector('.btn-primary');
    const messageBtn = modal.querySelector('.btn-secondary');
    continueBtn.addEventListener('click', () => {
        closeModal();
        window.location.href = 'index.html'; // Redirect to homepage
    });
    messageBtn.addEventListener('click', () => {
        openChatWithSeller(product.sellerInfo.name, product.productName);
    });
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    return modal;
}

function openChatWithSeller(sellerName) {
    closeModal(); // Close any open modals first

    window.conversationContext = {
        stage: 'greeting',
        priceDiscussed: false,
        meetingDiscussed: false,
        conditionDiscussed: false,
        messageCount: 0
    }
    
    const chatModal = document.createElement('div');
    chatModal.className = 'modal';
    chatModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>💬 Chat with ${sellerName}</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="chat-container">
                    <div class="chat-messages" id="chat-messages">
                        
                    </div>
                    <div class="chat-input-container">
                        <input type="text" id="chat-input" placeholder="Type your message...">
                        <button class="send-btn">
                            <i class='bx bx-send'></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    chatModal.querySelector('.modal-close').addEventListener('click', closeModal);
    document.body.appendChild(chatModal);
    showModal(chatModal);

    const sendBtn = document.addEventListener('click', sendMessage)
}

function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    chatInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage()
        }
    });

    const message = chatInput.value.trim();
    
    if (message) {
        const chatMessages = document.getElementById('chat-messages');
        
        // Add user's message
        const userMessage = document.createElement('div');
        userMessage.className = 'message sent';
        userMessage.innerHTML = `
            <p>${message}</p>
            <span class="message-time">Just now</span>
        `;
        chatMessages.appendChild(userMessage);
        
        // Clear input
        chatInput.value = '';
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate seller response after a delay
        simulateSellerResponseToMessage(message);
    }
}

function simulateSellerResponseToMessage(userMessage) {
    const chatMessages = document.getElementById('chat-messages');
    const sellerName = document.querySelector('.modal-header h2').textContent.replace('💬 Chat with ', '');

    if (!window.conversationContext) {
        window.conversationContext = {
            stage: 'greeting',
            priceDiscussed: false,
            meetingDiscussed: false,
            conditionDiscussed: false,
            messageCount: 1
        }
    } else {
        window.conversationContext.messageCount++
    }
    
    setTimeout(() => {
        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        typingIndicator.innerHTML = `
            <div class="typing-dots">
                <span></span><span></span><span></span>
            </div>
            <p>${sellerName} is typing...</p>
        `;
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Generate intelligent response
        let response = generateSellerResponse(userMessage, window.conversationContext.messageCount);

        // Simulate typing time based on respose length
        const typingTime = Math.max(2000, Math.min(4000, response.length * 20));
        
        setTimeout(() => {
            // Remove typing indicator
            typingIndicator.remove();
            
            // Add seller's response
            const sellerMessage = document.createElement('div');
            sellerMessage.className = 'message received';
            sellerMessage.innerHTML = `
                <p>${response}</p>
                <span class="message-time">Just now</span>
            `;
            chatMessages.appendChild(sellerMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
        }, typingTime); // 2.5 seconds typing
    }, 1000); // 1 second delay
}

function generateSellerResponse(userMessage, messageCount) {
    const lowerMessage = userMessage.toLowerCase();
    const context = window.conversationContext
    
    // Conversation context tracking
    const conversationContext = window.conversationContext || {
        stage: 'greeting',
        priceDiscussed: false,
        meetingDiscussed: false,
        conditionDiscussed: false,
        messageCount: 0
    };
    
    conversationContext.messageCount = messageCount || 0;
    window.conversationContext = conversationContext;

    // Response logic based on conversation stage and message content
    if (context.messageCount === 1) {
        conversationContext.stage = 'greeting';
        return "Hello! Thanks for your interest in my item. What would you like to know?";
    }

    if(context.messageCount === 2) {
        if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.  includes('hey')) {
        conversationContext.stage = 'greeting';
            return "Hi there! Thanks for messaging me. What would you like to know about the item?";
        }
    }

    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
        conversationContext.priceDiscussed = true;
        conversationContext.stage = 'price';
        return "The price is firm at the listed amount, but I can throw in free delivery if you're local!";
    }

    if (lowerMessage.includes('discount') || lowerMessage.includes('cheaper') || lowerMessage.includes('lower')) {
        conversationContext.stage = 'negotiation';
        return "I'm pretty firm on the price since it's already competitively priced. However, I can include the original accessories if that helps!";
    }

    if (lowerMessage.includes('available') || lowerMessage.includes('when') || lowerMessage.includes('meet') || lowerMessage.includes('pickup')) {
        conversationContext.meetingDiscussed = true;
        conversationContext.stage = 'meeting';
        return "I'm available weekends and evenings after 6 PM. I'm located downtown - we can meet at the central mall or I can deliver within the city. What works for you?";
    }

    if (lowerMessage.includes('condition') || lowerMessage.includes('used') || lowerMessage.includes('new') || lowerMessage.includes('quality')) {
        conversationContext.conditionDiscussed = true;
        conversationContext.stage = 'condition';
        return "It's in excellent condition - barely used and well maintained. No scratches or issues. I have all the original packaging and accessories too!";
    }

    if (lowerMessage.includes('photo') || lowerMessage.includes('picture') || lowerMessage.includes('image')) {
        conversationContext.stage = 'photos';
        return "Absolutely! I can send you more detailed photos. Is there any specific angle or part you'd like to see closer?";
    }

    if (lowerMessage.includes('why') || lowerMessage.includes('sell') || lowerMessage.includes('reason')) {
        conversationContext.stage = 'story';
        return "I'm upgrading to the newer model, so I'm letting this one go at a great price. It's been amazing, I'm just ready for an upgrade!";
    }

    if (lowerMessage.includes('hold') || lowerMessage.includes('reserve') || lowerMessage.includes('wait')) {
        conversationContext.stage = 'reservation';
        return "I can hold it for you for 24 hours if you're serious about buying. I've had a lot of interest though, so I can't hold it longer than that.";
    }

    if (lowerMessage.includes('yes') || lowerMessage.includes('okay') || lowerMessage.includes('sure') || lowerMessage.includes('deal')) {
        if (conversationContext.stage === 'price') {
            return "Great! When would you like to meet up? I'm available this weekend.";
        }
        if (conversationContext.stage === 'meeting') {
            return "Perfect! I'll mark it as pending for you. What's your phone number so we can coordinate the meetup?";
        }
        return "Awesome! Is there anything else you'd like to know before we arrange the pickup?";
    }

    if (lowerMessage.includes('no') || lowerMessage.includes('not') || lowerMessage.includes('maybe later')) {
        conversationContext.stage = 'followup';
        return "No problem at all! Take your time. The item will be available until it's sold. Feel free to message me if you have any other questions!";
    }

    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks') || lowerMessage.includes('appreciate')) {
        conversationContext.stage = 'closing';
        return "You're very welcome! Happy to help. Let me know if you have any other questions or if you'd like to arrange a meeting!";
    }

    if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye') || lowerMessage.includes('see you')) {
        conversationContext.stage = 'end';
        return "Thanks for messaging! Have a great day. Don't hesitate to reach out if you have any more questions! 👋";
    }

    // Default responses based on conversation stage
    switch (conversationContext.stage) {
        case 'price':
            return "The price is really competitive for the condition it's in. I can assure you it's worth every bit!";
        case 'meeting':
            return "Perfect! Saturday at 2 PM works great. I'll mark it as pending for you!";
        case 'condition':
            return "It's been well taken care of and comes with everything you see in the photos!";
        case 'negotiation':
            return "I'm firm on the price, but I can include some extra accessories I have for it!";
        default:
            const defaultResponses = [
                "That's a great question! Is there anything specific you'd like to know?",
                "I'd be happy to help with that. What would you like to know?",
                "Thanks for your message! How can I help you today?",
                "I'm here to answer any questions you might have about the item!",
                "Feel free to ask anything about the product - I'm happy to help!"
            ];
            return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
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