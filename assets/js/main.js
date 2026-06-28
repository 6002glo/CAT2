// ============================================
// ANIME HUB - MAIN JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎌 Anime Hub loaded!');
    
    // ============================================
    // 1. CONTACT FORM VALIDATION
    // ============================================
    
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Check name
            if (name === '') {
                alert('Please enter your name.');
                return;
            }
            
            // Check email
            if (email === '') {
                alert('Please enter your email address.');
                return;
            }
            
            if (email.includes('@') === false || email.includes('.') === false) {
                alert('Please enter a valid email address (example: name@email.com).');
                return;
            }
            
            // Check message
            if (message === '') {
                alert('Please write your message.');
                return;
            }
            
            if (message.length < 10) {
                alert('Your message must be at least 10 characters long.');
                return;
            }
            
            // All good!
            successMessage.classList.remove('d-none');
            contactForm.reset();
            
            setTimeout(function() {
                successMessage.classList.add('d-none');
            }, 5000);
        });
    }
    
    // ============================================
    // 2. ADD TO CART BUTTONS
    // ============================================
    
    const cartNotification = document.getElementById('cartNotification');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(function(button) {
            button.addEventListener('click', function(event) {
                event.stopPropagation();
                
                const card = this.closest('.product-card');
                const productName = card.querySelector('.card-title').textContent;
                const productPrice = card.querySelector('.badge').textContent;
                
                if (cartNotification) {
                    cartNotification.textContent = '✅ ' + productName + ' (' + productPrice + ') added to cart! 🛒';
                    cartNotification.classList.remove('d-none');
                    
                    setTimeout(function() {
                        cartNotification.classList.add('d-none');
                    }, 3000);
                }
                
                this.textContent = '✅ Added!';
                this.classList.remove('btn-outline-primary');
                this.classList.add('btn-success');
                
                setTimeout(function() {
                    this.textContent = 'Add to Cart';
                    this.classList.remove('btn-success');
                    this.classList.add('btn-outline-primary');
                }.bind(this), 2000);
            });
        });
    }
    
    // ============================================
    // 3. PRODUCT FILTER
    // ============================================
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                filterButtons.forEach(function(btn) {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                productItems.forEach(function(item) {
                    const category = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }
    
    // ============================================
    // 4. GALLERY FILTER
    // ============================================
    
    const galleryFilterButtons = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryFilterButtons.length > 0) {
        galleryFilterButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                galleryFilterButtons.forEach(function(btn) {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                galleryItems.forEach(function(item) {
                    const category = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }
    
    // ============================================
    // 5. LIKE BUTTONS
    // ============================================
    
    const likeButtons = document.querySelectorAll('.like-btn');
    
    if (likeButtons.length > 0) {
        likeButtons.forEach(function(button) {
            button.addEventListener('click', function(event) {
                event.stopPropagation();
                
                this.classList.toggle('liked');
                
                const currentText = this.textContent;
                const currentLikes = parseInt(currentText.match(/\d+/));
                
                if (this.classList.contains('liked')) {
                    this.textContent = '❤️ Liked (' + (currentLikes + 1) + ')';
                    this.style.backgroundColor = '#ff6b6b';
                    this.style.color = 'white';
                } else {
                    this.textContent = '❤️ Like (' + (currentLikes - 1) + ')';
                    this.style.backgroundColor = 'transparent';
                    this.style.color = '#0d6efd';
                }
            });
        });
    }
    
    // ============================================
    // 6. PRODUCT CARD CLICK
    // ============================================
    
    const productCards = document.querySelectorAll('.product-card');
    
    if (productCards.length > 0) {
        productCards.forEach(function(card) {
            card.addEventListener('click', function() {
                const productName = this.querySelector('.card-title').textContent;
                const productPrice = this.querySelector('.badge').textContent;
                alert('🔍 Viewing details for: ' + productName + '\n\nPrice: ' + productPrice + '\nMore information coming soon!');
            });
        });
    }
    
    // ============================================
    // 7. GALLERY CARD CLICK
    // ============================================
    
    const galleryCards = document.querySelectorAll('.gallery-card');
    
    if (galleryCards.length > 0) {
        galleryCards.forEach(function(card) {
            card.addEventListener('click', function() {
                const title = this.querySelector('.card-title').textContent;
                const artist = this.querySelector('.card-text').textContent;
                alert('🎨 "' + title + '"\n\n' + artist + '\n\nClick "Like" if you enjoy this artwork!');
            });
        });
    }
    
    // ============================================
    // 8. BACK TO TOP BUTTON
    // ============================================
    
    const backToTopBtn = document.getElementById('backToTopBtn');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        });
    }
    
});