// ============================================
// ANIME HUB - MAIN JAVASCRIPT
// ============================================

// Wait for the page to load fully
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎌 Anime Hub loaded successfully!');
    
    // ============================================
    // FEATURE 1: CONTACT FORM VALIDATION
    // ============================================
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop page refresh
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validation
            let errors = [];
            
            if (name === '') {
                errors.push('Please enter your name.');
            }
            
            if (email === '') {
                errors.push('Please enter your email address.');
            } else if (!email.includes('@') || !email.includes('.')) {
                errors.push('Please enter a valid email address (e.g., name@domain.com).');
            }
            
            if (message === '') {
                errors.push('Please write your message.');
            } else if (message.length < 10) {
                errors.push('Message must be at least 10 characters long.');
            }
            
            // Show errors or success
            if (errors.length > 0) {
                alert('⚠️ Please fix the following issues:\n\n' + errors.join('\n'));
                return;
            }
            
            // If all valid, show success message
            successMessage.classList.remove('d-none');
            contactForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                successMessage.classList.add('d-none');
            }, 5000);
        });
    }
    
    // ============================================
    // FEATURE 2: SHOP PRODUCT FILTER
    // ============================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');
    const cartNotification = document.getElementById('cartNotification');
    
    if (filterButtons.length > 0) {
        // Add click event to each filter button
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter products
                productItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        item.classList.remove('hidden');
                        // Add animation
                        item.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }
    
    // ============================================
    // FEATURE 3: ADD TO CART (Bonus Feature)
    // ============================================
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent card click
                
                // Get product info
                const card = this.closest('.product-card');
                const productName = card.querySelector('.card-title').textContent;
                const productPrice = card.querySelector('.badge').textContent;
                
                // Show notification
                if (cartNotification) {
                    cartNotification.textContent = `✅ ${productName} (${productPrice}) added to cart! 🛒`;
                    cartNotification.classList.remove('d-none');
                    
                    // Hide after 3 seconds
                    setTimeout(() => {
                        cartNotification.classList.add('d-none');
                    }, 3000);
                }
                
                // Button feedback
                this.textContent = '✅ Added!';
                this.classList.remove('btn-outline-primary');
                this.classList.add('btn-success');
                
                setTimeout(() => {
                    this.textContent = 'Add to Cart';
                    this.classList.remove('btn-success');
                    this.classList.add('btn-outline-primary');
                }, 2000);
            });
        });
    }
    
    // ============================================
    // PRODUCT CARD CLICK (View Details)
    // ============================================
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function() {
            const productName = this.querySelector('.card-title').textContent;
            alert(`🔍 Viewing details for: ${productName}\n\nMore information coming soon!`);
        });
    });
});

// ============================================
// ADDITIONAL CSS ANIMATIONS (injected via JS)
// ============================================
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }
`;
document.head.appendChild(styleSheet);