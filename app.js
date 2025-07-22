// app.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Header & Navigation ---
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a:not(.dropdown-content a)'); // Exclude dropdown links

    // Toggle mobile navigation
    hamburger.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });

    // Close mobile navigation when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
            }
        });
    });

    // Smooth Scrolling for Navigation & internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const headerOffset = document.querySelector('.header').offsetHeight; // Get header height
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset - 20; // Added 20px for extra spacing

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // --- Image Slider ---
    const sliderContainer = document.querySelector('.slider-container');
    const sliderImages = document.querySelectorAll('.slider-image');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    let currentIndex = 0;
    let autoSlideInterval;

    function updateSlider() {
        sliderContainer.style.transform = `translateX(-${currentIndex * 100}vw)`;
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % sliderImages.length;
            updateSlider();
        }, 5000); // Change image every 5 seconds
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % sliderImages.length;
        updateSlider();
        resetAutoSlide(); // Reset timer on manual interaction
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + sliderImages.length) % sliderImages.length;
        updateSlider();
        resetAutoSlide(); // Reset timer on manual interaction
    });

    startAutoSlide(); // Start automatic sliding on page load

    // --- Testimonials Slider ---
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialDotsContainer = document.querySelector('.testimonial-dots');
    let currentTestimonialIndex = 0;

    // Create dots
    testimonialItems.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => {
            currentTestimonialIndex = index;
            updateTestimonialSlider();
        });
        testimonialDotsContainer.appendChild(dot);
    });

    function updateTestimonialSlider() {
        testimonialSlider.style.transform = `translateX(-${currentTestimonialIndex * 100 / testimonialItems.length}%)`;
        document.querySelectorAll('.testimonial-dots .dot').forEach((dot, index) => {
            if (index === currentTestimonialIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Auto-advance testimonials
    setInterval(() => {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialItems.length;
        updateTestimonialSlider();
    }, 7000); // Change testimonial every 7 seconds


    // --- Back to Top Button ---
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Show button after scrolling 300px
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Basic Form Submission (Client-side only) ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual form submission

            // In a real application, you would send this data to a server
            // using fetch() or XMLHttpRequest.
            console.log('Form submitted!');
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            console.log('Form Data:', formObject);

            alert('Thank you for your message! We will get back to you soon.');
            this.reset(); // Clear the form
        });
    }

});