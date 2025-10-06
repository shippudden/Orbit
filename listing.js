let cancelBtn = document.getElementById("cancelBtn");
cancelBtn.addEventListener("click", () => {
    window.location.href = "index.html"; // Redirect to homepage
});

// Image upload handling
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('productImage');
    const imagePlaceholder = document.getElementById('imagePlaceholder');

    // When clicking the placeholder, trigger the file input
    imagePlaceholder.addEventListener('click', function() {
        fileInput.click();
    });

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

    // create-listing.js - REPLACE your fileInput event listener with this
    fileInput.addEventListener('change', (event) => {
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        
        const maxSize = 1 * 1024 * 1024
        if (file.size > maxSize) {
            showSnackbar('Image is too large! Please choose an image under 1MB')
            fileInput.value = ''
            return
        }

        const reader = new FileReader(); // Create a FileReader object

        // This function runs after the file is read
        reader.onload = (event) => {
            // event.target.result contains the Base64 string
            selectedImageUrl = event.target.result;
            
            // Show preview
            imagePlaceholder.innerHTML = `
                <img src="${selectedImageUrl}" alt="Preview" style="max-width: 100%; max-height: 150px; border-radius: 8px;">
                <span>${file.name}</span>
            `;
            showSnackbar('Image uploaded successfully', 3000)
        };

        reader.onerror = () => {
            showSnackbar('Error reading file. Please try another image.')
        }
        
        // Read the file and convert it to a Base64 string
        reader.readAsDataURL(file);
        
    } else {
        imagePlaceholder.innerHTML = `<i class='bx bx-cloud-upload'></i><span>Click to upload or drag and drop</span>`;
        selectedImageUrl = null;
    }
});
});

// Sample products array (in a real app, this would come from a backend or database)
let form = document.getElementById("listingForm");
form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent actual form submission

    const newProduct = {
        id: Date.now().toString(), // Unique ID
        productName: event.target.productName.value,
        image: selectedImageUrl,
        price: event.target.price.value + ' π',
        category: event.target.category.value,
        condition: event.target.condition.value,
        description: event.target.description.value,
        views: '0 views',
        dayPosted: 'Posted just now',
        likes: '0 likes',
        sellerInfo: {
            name: 'Serafina Charles', // Placeholder seller info
            avatar: './Images/Serafina Charles.png',
            location: event.target.location.value
        },
        ratings: []
    }

    // Get existing products from localStorage
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    
    // Redirects to the index.html page
    window.location.href = "index.html";

    if (error.name === 'QuotaExceededError') {
        showSnackbar('Storage is full. Please use smaller images or clear your browser date')
    } else {
        showSnackbar('Error saving product. Please try again.')
    }
})
    
