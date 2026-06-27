// ============================================
// ANIME HUB - MAIN JAVASCRIPT
// MILESTONE 3 - COMPLETE
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
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
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
            
            if (errors.length > 0) {
                alert('⚠️ Please fix the following issues:\n\n' + errors.join('\n'));
                return;
            }
            
            successMessage.classList.remove('d-none');
            contactForm.reset();
            
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
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                productItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        item.classList.remove('hidden');
                        item.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }
    
    // ============================================
    // FEATURE 3: ADD TO CART
    // ============================================
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                
                const card = this.closest('.product-card');
                const productName = card.querySelector('.card-title').textContent;
                const productPrice = card.querySelector('.badge').textContent;
                
                if (cartNotification) {
                    cartNotification.textContent = `✅ ${productName} (${productPrice}) added to cart! 🛒`;
                    cartNotification.classList.remove('d-none');
                    
                    setTimeout(() => {
                        cartNotification.classList.add('d-none');
                    }, 3000);
                }
                
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
    // FEATURE 4: GALLERY FILTER
    // ============================================
    const galleryFilterButtons = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryFilterButtons.length > 0) {
        galleryFilterButtons.forEach(button => {
            button.addEventListener('click', function() {
                galleryFilterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        item.classList.remove('hidden');
                        item.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }
    
    // ============================================
    // FEATURE 5: LIKE BUTTON (Gallery)
    // ============================================
    const likeButtons = document.querySelectorAll('.like-btn');
    
    if (likeButtons.length > 0) {
        likeButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Toggle like state
                this.classList.toggle('liked');
                
                // Update like count
                const currentText = this.textContent;
                const currentLikes = parseInt(currentText.match(/\d+/));
                
                if (this.classList.contains('liked')) {
                    this.textContent = `❤️ Liked (${currentLikes + 1})`;
                    this.style.backgroundColor = '#ff6b6b';
                    this.style.color = 'white';
                } else {
                    this.textContent = `❤️ Like (${currentLikes - 1})`;
                    this.style.backgroundColor = 'transparent';
                    this.style.color = '#0d6efd';
                }
            });
        });
    }
    
    // ============================================
    // FEATURE 6: PRODUCT CARD CLICK
    // ============================================
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function() {
            const productName = this.querySelector('.card-title').textContent;
            const productPrice = this.querySelector('.badge').textContent;
            alert(`🔍 Viewing details for: ${productName}\n\nPrice: ${productPrice}\nMore information coming soon!`);
        });
    });
    
    // ============================================
    // FEATURE 7: GALLERY CARD CLICK
    // ============================================
    document.querySelectorAll('.gallery-card').forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.card-title').textContent;
            const artist = this.querySelector('.card-text').textContent;
            alert(`🎨 "${title}"\n\n${artist}\n\nClick "Like" if you enjoy this artwork!`);
        });
    });
    
    // ============================================
    // FEATURE 8: SCROLL REVEAL (Bonus)
    // ============================================
    function revealOnScroll() {
        const elements = document.querySelectorAll('.card, .product-item, .gallery-item');
        
        elements.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 150;
            
            if (elementTop < windowHeight - revealPoint) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial styles for scroll reveal
    document.querySelectorAll('.card, .product-item, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
});

// ============================================
// CSS ANIMATIONS (injected via JS)
// ============================================
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }
`;
document.head.appendChild(styleSheet);