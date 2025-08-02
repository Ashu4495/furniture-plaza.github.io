const countdownEl = document.getElementById('countdown');
const nowText = document.getElementById('now-text');
const mainText = document.getElementById('main-text');
const blackOverlay = document.getElementById('black-overlay');
const loaderSection = document.getElementById('loader-section');
const mainContainer = document.getElementById('main-container');

// New navigation elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');

let count = 0;
const maxCount = 100;
const duration = 4000; // 4 seconds total animation
const intervalTime = duration / maxCount;

let slideIndex = 0;
const slides = document.getElementsByClassName('slide');
let slideInterval;

const interval = setInterval(() => {
  count++;
  countdownEl.textContent = count + ' - 100';

  if (count < 30) {
    nowText.style.opacity = '0';
    nowText.style.animationPlayState = 'paused';
  } else {
    nowText.style.opacity = '1';
    nowText.style.animationPlayState = 'running';
  }

  if (count >= maxCount) {
    clearInterval(interval);
    blackOverlay.classList.add('active');

    setTimeout(() => {
      loaderSection.classList.add('hidden');
      setTimeout(() => {
        mainContainer.classList.add('show');
        document.body.style.overflow = 'auto';
        startSlideshow();
      }, 500);
    }, 1500);
  }
}, intervalTime);

// New navigation functions
function toggleMobileMenu() {
  mobileMenu.classList.toggle('active');
  mobileMenuBtn.classList.toggle('active');
}

// Smooth scrolling for navigation links
function scrollToSection(targetId) {
  const target = document.querySelector(targetId);
  if (target) {
    const offsetTop = target.offsetTop - 70; // Account for fixed navbar
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
}

// New navigation event listeners
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

// Add smooth scrolling to all navigation links
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      if (targetId.startsWith('#')) {
        scrollToSection(targetId);
        // Close mobile menu if open
        if (mobileMenu.classList.contains('active')) {
          toggleMobileMenu();
        }
      }
    });
  });
  
  // Cart button click handler
  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      scrollToSection('#products');
    });
  }
});

// Add keyboard navigation for slideshow and menu
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
    toggleMobileMenu();
  }
  if (e.key === 'ArrowLeft') {
    slideIndex--;
    showSlides(slideIndex);
    // Restart auto slideshow
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 4000);
  }
  if (e.key === 'ArrowRight') {
    slideIndex++;
    showSlides(slideIndex);
    // Restart auto slideshow
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 4000);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        if (mainContainer && mainContainer.classList.contains('show')) {
          setTimeout(() => {
            const logoContainer = document.querySelector('.logo-container');
            if (logoContainer) {
              logoContainer.style.opacity = '1';
              logoContainer.style.transform = 'translateY(0)';
            }
          }, 200);

          setTimeout(() => {
            const shareText = document.querySelector('.share-text');
            if (shareText) {
              shareText.style.opacity = '1';
              shareText.style.transform = 'translateY(0)';
            }
          }, 400);

          setTimeout(() => {
            const largeText = document.querySelector('.large-text h1');
            if (largeText) {
              largeText.style.opacity = '1';
              largeText.style.transform = 'scale(1)';
            }
          }, 600);

          setTimeout(() => {
            const projectBtn = document.querySelector('.project-btn');
            if (projectBtn) {
              projectBtn.style.opacity = '1';
              projectBtn.style.transform = 'translateY(0)';
            }
          }, 800);

          setTimeout(() => {
            const verticalText = document.querySelector('.vertical-text');
            if (verticalText) {
              verticalText.style.opacity = '1';
              verticalText.style.transform = 'translateX(0)';
            }
          }, 1000);
        }
      }
    });
  });

  if (mainContainer) {
    observer.observe(mainContainer, { attributes: true });
  }

  const elementsToAnimate = [
    '.logo-container',
    '.share-text',
    '.project-btn'
  ];

  elementsToAnimate.forEach(selector => {
    const element = document.querySelector(selector);
    if (element) {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'all 0.6s ease';
    }
  });

  const largeText = document.querySelector('.large-text h1');
  if (largeText) {
    largeText.style.opacity = '0';
    largeText.style.transform = 'scale(0.8)';
    largeText.style.transition = 'all 0.8s ease';
  }

  const verticalText = document.querySelector('.vertical-text');
  if (verticalText) {
    verticalText.style.opacity = '0';
    verticalText.style.transform = 'translateX(20px)';
    verticalText.style.transition = 'all 0.6s ease';
  }
});

function showSlides(n) {
  const slides = document.getElementsByClassName('slide');
  const dots = document.getElementsByClassName('dot');
  
  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }
  
  // Hide all slides with fade out animation
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active')) {
      slides[i].style.animation = 'fadeOut 0.5s ease-out forwards';
      setTimeout(() => {
        slides[i].style.display = 'none';
        slides[i].classList.remove('active');
      }, 500);
    } else {
      slides[i].style.display = 'none';
      slides[i].classList.remove('active');
    }
  }
  
  // Remove active class from all dots
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove('active');
  }
  
  // Show current slide with entrance animation
  setTimeout(() => {
    if (slides[slideIndex - 1]) {
      slides[slideIndex - 1].style.display = 'block';
      slides[slideIndex - 1].classList.add('active', 'fade');
      slides[slideIndex - 1].style.animation = 'slideIn 1s ease-in-out forwards';
    }
    
    // Activate current dot
    if (dots[slideIndex - 1]) {
      dots[slideIndex - 1].classList.add('active');
    }
  }, 100);
}

function nextSlide() {
  slideIndex++;
  showSlides(slideIndex);
}

function currentSlide(n) {
  slideIndex = n;
  showSlides(slideIndex);
}

function startSlideshow() {
  slideIndex = 1;
  showSlides(slideIndex);
  slideInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
}

// Add keyboard navigation for slideshow
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    slideIndex--;
    showSlides(slideIndex);
    // Restart auto slideshow
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 4000);
  }
  if (e.key === 'ArrowRight') {
    slideIndex++;
    showSlides(slideIndex);
    // Restart auto slideshow
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 4000);
  }
});

document.addEventListener("DOMContentLoaded", () => {
    // Delay grid slideshow initialization to avoid conflicts
    setTimeout(() => {
        const slides = document.querySelectorAll(".slideshow-item");
        const dots = document.querySelectorAll(".slideshow-dot");
        const prevBtn = document.querySelector(".slideshow-btn.prev");
        const nextBtn = document.querySelector(".slideshow-btn.next");

        if (!slides.length || !dots.length || !prevBtn || !nextBtn) {
            console.log("Grid slideshow elements not found, skipping initialization");
            return;
        }

        let currentSlide = 0;
        const totalSlides = slides.length;
        let slideInterval;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle("active", i === index);
                dots[i].classList.toggle("active", i === index);
            });
            currentSlide = index;
        }

        function nextSlide() {
            let nextIndex = (currentSlide + 1) % totalSlides;
            showSlide(nextIndex);
        }

        function prevSlide() {
            let prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(prevIndex);
        }

        function startAutoSlide() {
            slideInterval = setInterval(nextSlide, 4000); // 4 second delay
        }

        function stopAutoSlide() {
            clearInterval(slideInterval);
        }

        // Manual controls
        nextBtn.addEventListener("click", () => {
            nextSlide();
            stopAutoSlide();
            setTimeout(startAutoSlide, 2000); // Restart after 2 seconds
        });

        prevBtn.addEventListener("click", () => {
            prevSlide();
            stopAutoSlide();
            setTimeout(startAutoSlide, 2000); // Restart after 2 seconds
        });

        dots.forEach(dot => {
            dot.addEventListener("click", () => {
                const index = parseInt(dot.getAttribute("data-slide"));
                showSlide(index);
                stopAutoSlide();
                setTimeout(startAutoSlide, 2000); // Restart after 2 seconds
            });
        });

        // Initialize
        showSlide(currentSlide);
        startAutoSlide();
        
        console.log("Grid slideshow initialized with", totalSlides, "slides");
    }, 5000); // Wait 5 seconds before initializing grid slideshow
});

// Products Section JavaScript
// Use a timeout to ensure all elements are loaded
setTimeout(function() {
    console.log('Products section JavaScript loading...');
    
    const productsGrid = document.getElementById('productsGrid');
    const cartSummary = document.getElementById('cartSummary');
    const cartItemsList = document.getElementById('cartItems');
    const cartTotalElem = document.getElementById('cartTotal');
    const downloadInvoiceBtn = document.getElementById('downloadInvoiceBtn');

    console.log('Elements found:', {
        productsGrid: !!productsGrid,
        cartSummary: !!cartSummary,
        cartItemsList: !!cartItemsList,
        cartTotalElem: !!cartTotalElem,
        downloadInvoiceBtn: !!downloadInvoiceBtn
    });

    let cart = [];

    function updateCartUI() {
        console.log('Updating cart UI, cart has', cart.length, 'items');
        if (!cartItemsList || !cartTotalElem || !cartSummary) {
            console.error('Cart UI elements not found');
            return;
        }
        
        cartItemsList.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.name;
            const priceSpan = document.createElement('span');
            priceSpan.textContent = `$${item.price.toFixed(2)}`;
            li.appendChild(priceSpan);
            cartItemsList.appendChild(li);
            total += item.price;
        });
        cartTotalElem.textContent = total.toFixed(2);
        cartSummary.style.display = cart.length > 0 ? 'block' : 'none';
        
        // Update cart count in navbar
        if (cartCount) {
            cartCount.textContent = cart.length;
            cartCount.style.display = cart.length > 0 ? 'flex' : 'none';
        }
    }

    function toggleCartItem(product) {
        console.log('Toggling cart item:', product);
        const index = cart.findIndex(item => item.name === product.name);
        if (index === -1) {
            cart.push(product);
            console.log('Added to cart:', product);
        } else {
            cart.splice(index, 1);
            console.log('Removed from cart:', product);
        }
        updateCartUI();
        updateProductCardStyles();
    }

    function updateProductCardStyles() {
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach((card, index) => {
            const productName = `Product ${index + 1}`;
            const isInCart = cart.find(item => item.name === productName);
            card.style.backgroundColor = isInCart ? '#f0f8ff' : '#fff';
            card.style.borderColor = isInCart ? '#ee0979' : '#ddd';
        });
    }

    function createProductCard(i) {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        // Use images from the images folder
        const imageNames = [
            'chair1.jpg', 'chair2.jpg', 'chair3.jpg', 'chair4.jpg', 
            'sofa1.jpg', 'sofa2.jpg', 'sofa3.jpg', 'sofa4.jpg',
            'pchair5.jpg', 'pchair6.jpg'
        ];
        
        const img = document.createElement('img');
        img.className = 'product-image';
        img.src = `images/${imageNames[i-1]}`;
        img.alt = `Product ${i}`;

        const name = document.createElement('div');
        name.className = 'product-name';
        name.textContent = `Product ${i}`;

        const priceValue = (Math.random() * 100 + 50);
        const price = document.createElement('div');
        price.className = 'product-price';
        price.textContent = `$${priceValue.toFixed(2)}`;

        // Add click event to the entire card for adding to cart
        productCard.addEventListener('click', () => {
            console.log('Product card clicked for product', i);
            toggleCartItem({ name: name.textContent, price: priceValue });
        });

        productCard.appendChild(img);
        productCard.appendChild(name);
        productCard.appendChild(price);

        return productCard;
    }

    // Generate products only if productsGrid exists
    if (productsGrid) {
        console.log('Generating 10 products...');
        for (let i = 1; i <= 10; i++) {
            productsGrid.appendChild(createProductCard(i));
        }
        console.log('Products generated successfully');
    } else {
        console.error('productsGrid element not found!');
    }

    // Add event listener for download invoice button
    if (downloadInvoiceBtn) {
        console.log('Setting up download invoice button...');
        downloadInvoiceBtn.addEventListener('click', () => {
            console.log('Download invoice clicked, cart has', cart.length, 'items');
            if (cart.length === 0) {
                alert('Your cart is empty.');
                return;
            }
            let invoiceText = 'Furniture Plaza Invoice\n\n';
            let total = 0;
            cart.forEach(item => {
                invoiceText += `${item.name} - $${item.price.toFixed(2)}\n`;
                total += item.price;
            });
            invoiceText += `\nTotal: $${total.toFixed(2)}\n\nThank you for your purchase!`;

            console.log('Creating invoice download...');
            const blob = new Blob([invoiceText], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'furniture-plaza-invoice.txt';
            a.click();
            URL.revokeObjectURL(url);
            console.log('Invoice download triggered');
        });
    } else {
        console.error('downloadInvoiceBtn element not found!');
    }
}, 2000); // Wait 2 seconds to ensure page is fully loaded

const teamMembers = {
    rick: {
        name: "Dr. Rick McCartney",
        role: "CEO",
        image: "imgaes/Slide1.jpg"
    },
    chris: {
        name: "Chris Koha",
        role: "COO",
        image: "imgaes/Slide2.jpg"
    },
    caroline: {
        name: "Caroline Nieto",
        role: "Chief Product Officer",
        image: "imgaes/Slide3.jpg"
    },
    victor: {
        name: "Víctor Albertos",
        role: "CTO",
        image: "imgaes/Slide4.jpg"
    }
};

// DOM elements
const teamMemberElements = document.querySelectorAll('.team-member');
const cookieConsent = document.getElementById('cookieConsent');

// Function to handle popup image loading
function handlePopupImages() {
    teamMemberElements.forEach(member => {
        const popup = member.querySelector('.member-popup');
        const img = popup.querySelector('.popup-image');
        
        // Preload image for smooth hover effect
        const tempImg = new Image();
        tempImg.onload = function() {
            img.style.opacity = '1';
        };
        tempImg.onerror = function() {
            // If image fails to load, hide the popup
            popup.style.display = 'none';
        };
        tempImg.src = img.src;
    });
}

// Add hover effects to team members
teamMemberElements.forEach(member => {
    // Mouse enter event
    member.addEventListener('mouseenter', () => {
        // Add active class for styling
        member.classList.add('active');
    });
    
    // Mouse leave event
    member.addEventListener('mouseleave', () => {
        // Remove active class
        member.classList.remove('active');
    });
});

// Cookie consent functionality
const btnAccept = document.querySelector('.btn-accept');
const btnDecline = document.querySelector('.btn-decline');

if (btnAccept) {
    btnAccept.addEventListener('click', () => {
        cookieConsent.style.display = 'none';
        // You can add localStorage to remember user's choice
        localStorage.setItem('cookieConsent', 'accepted');
    });
}

if (btnDecline) {
    btnDecline.addEventListener('click', () => {
        cookieConsent.style.display = 'none';
        // You can add localStorage to remember user's choice
        localStorage.setItem('cookieConsent', 'declined');
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if user has already made a choice about cookies
    const cookieChoice = localStorage.getItem('cookieConsent');
    if (cookieChoice) {
        cookieConsent.style.display = 'none';
    }
    
    // Handle popup images
    handlePopupImages();
    
    // Add smooth transitions and animations
    teamMemberElements.forEach((member, index) => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            member.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            member.style.opacity = '1';
            member.style.transform = 'translateY(0)';
        }, index * 100);
    });
});
