document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById("year").textContent = new Date().getFullYear();
 

  // Mobile menu toggle
        document.getElementById('menu-toggle').addEventListener('click', function() {
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenu.classList.toggle('hidden');
        });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });

        const mobileMenu = document.getElementById('mobile-menu');
        if (!mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
      }
    });
  });

   // Gallery Load More/Show Less functionality
    const loadMoreBtn = document.getElementById('load-more-btn');
    const showLessBtn = document.getElementById('show-less-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    let itemsToShow = 3; // Initial number of items to show
    const itemsPerLoad = 3; // Number of items to add each time

    if (loadMoreBtn && showLessBtn) {
        // Load More button click handler
        loadMoreBtn.addEventListener('click', function() {
            // Show next set of items
            for (let i = itemsToShow; i < itemsToShow + itemsPerLoad && i < galleryItems.length; i++) {
                galleryItems[i].classList.remove('hidden');
            }
            
            itemsToShow += itemsPerLoad;
            
            // Show the Show Less button when we've loaded more than initial
            if (itemsToShow > 4) {
                showLessBtn.classList.remove('hidden');
            }
            
            // Hide Load More button if all items are visible
            if (itemsToShow >= galleryItems.length) {
                loadMoreBtn.classList.add('hidden');
            }
        });
        
        // Show Less button click handler
        showLessBtn.addEventListener('click', function() {
            // Hide items beyond the initial 3
            for (let i = 3; i < galleryItems.length; i++) {
                galleryItems[i].classList.add('hidden');
            }
            
            itemsToShow = 3;
            
            // Show Load More button and hide Show Less button
            loadMoreBtn.classList.remove('hidden');
            showLessBtn.classList.add('hidden');
        });
        
        // Initially hide buttons if not needed
        if (galleryItems.length <= 3) {
            loadMoreBtn.classList.add('hidden');
            showLessBtn.classList.add('hidden');
        }
    }

   //Hero Image Slideshow
        let currentSlideIndex = 0;
        const slides = document.querySelectorAll('.hero-slide');
        const indicators = document.querySelectorAll('.image-indicator');
        const totalSlides = slides.length;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(indicator => indicator.classList.remove('active'));
            slides[index].classList.add('active');
            indicators[index].classList.add('active');
        }

        function changeSlide(direction) {
            currentSlideIndex = (currentSlideIndex + direction + totalSlides) % totalSlides;
            showSlide(currentSlideIndex);
        }

        function currentSlide(index) {
            currentSlideIndex = index - 1;
            showSlide(currentSlideIndex);
        }

        // Auto-advance slides
        setInterval(() => changeSlide(1), 5000);


  // Team Slider
function initTeamSlider() {
    const track = document.querySelector('.team-slider-track');
    const slides = document.querySelectorAll('.team-slide');
    const prevBtn = document.querySelector('.team-slider-prev');
    const nextBtn = document.querySelector('.team-slider-next');
    const indicatorsContainer = document.querySelector('.team-slider-indicators');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    const slideCount = slides.length;
    let autoSlideInterval;

    // Create indicators
    if (indicatorsContainer) {
        slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
    }

    function updateSlider() {
        const slideWidth = slides[0].clientWidth;
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

        if (indicatorsContainer) {
            const indicators = indicatorsContainer.querySelectorAll('.indicator');
            indicators.forEach((ind, i) => {
                ind.classList.toggle('active', i === currentIndex);
            });
        }
    }

    function goToSlide(index) {
        currentIndex = (index + slideCount) % slideCount;
        updateSlider();
        resetAutoSlide(); 
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlider();
        resetAutoSlide(); // Reset timer 
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSlider();
        resetAutoSlide(); // Reset timer
    }

    // Auto-advance slides
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Initialize
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    window.addEventListener('resize', updateSlider);

    updateSlider();
    startAutoSlide(); // Start auto-advancing
}

// Initialize team slider when DOM is loaded
initTeamSlider();

// Contact Form Submission with Popup
const form = document.getElementById('contact-form');
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  fetch('https://formsubmit.co/ajax/goldenheartmovement@gmail.com', {
    method: 'POST',
    headers: {
      'Accept': 'application/json'
    },
    body: formData
  })
    .then(response => {
      if (response.ok) {
        showToast('Thank you! Your message has been received🤝.');
        form.reset();

        // Redirect after 4 seconds (optional)
        setTimeout(() => {
          window.location.href = '/'; // Change to your desired URL
        }, 4000);
      } else {
        return response.json().then(data => {
          showToast('Error: ' + (data.message || 'Unknown error.'));
        });
      }
    })
    .catch(error => {
      console.error(error);
      showToast('Error sending message. Check console.');
    });
});

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.remove('opacity-0');
  toast.classList.add('opacity-100');

  setTimeout(() => {
    toast.classList.remove('opacity-100');
    toast.classList.add('opacity-0');
  }, 3000);
}


    // Partnership Form Submission
const partnershipForm = document.getElementById('partnership-form');
if (partnershipForm) {
    partnershipForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(partnershipForm);

        fetch('https://formsubmit.co/ajax/goldenheartmovement@gmail.com', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        })
        .then(response => {
            if (response.ok) {
                showToast('Thank you! Your partnership request has been submitted. We will contact you soon.');
                partnershipForm.reset();
                document.getElementById('partnerForm').classList.add('hidden');
                
                // Optional: Redirect after submission
                setTimeout(() => {
                    window.location.href = '/';
                }, 4000);
            } else {
                return response.json().then(data => {
                    showToast('Error: ' + (data.message || 'Failed to submit partnership request.'));
                });
            }
        })
        .catch(error => {
            console.error(error);
            showToast('Error submitting partnership request. Please try again.');
        });
    });
}

 //Initialize AOS 
  AOS.init({
    duration: 800, // Animation duration in milliseconds
    once: true, // Whether animation should happen only once
    easing: 'ease-in-out', // Easing function for the animations
    offset: 100 // Offset (in pixels) to trigger the animation earlier or later
  });
  AOS.init({
    duration: 2000,
    easing: 'ease-out-cubic',
  });




});


document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("donation-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get values
    const name = document.getElementById("donorName").value.trim();
    const email = document.getElementById("donorEmail").value.trim();
    const phone = document.getElementById("donorPhone").value.trim();
    const amount = parseFloat(document.getElementById("donationAmount").value.trim()) * 100; // Convert to kobo
    const donationType = document.getElementById("donation-type").value;
    const notes = document.getElementById("notes").value.trim();
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;

    if (!paymentMethod || !amount || !email || !name) {
      alert("Please complete all required fields.");
      return;
    }

    // Paystack Integration
    let handler = PaystackPop.setup({
      key: 'pk_test_1816638ca2eae0a6830151029323a4bceb7ad291', // Replace with your real Paystack public key
      email: email,
      amount: amount,
      currency: "KES",
      metadata: {
        custom_fields: [
          {
            display_name: name,
            variable_name: "donation_type",
            value: donationType,
          },
          {
            display_name: "Phone Number",
            variable_name: "phone",
            value: phone,
          },
          {
            display_name: "Note",
            variable_name: "dedication_note",
            value: notes,
          },
          {
            display_name: "Payment Method",
            variable_name: "method",
            value: paymentMethod
          }
        ],
      },
      callback: function (response) {
        // ✅ Redirect to success page with reference
        window.location.href = "success.html?ref=" + response.reference;
        setTimeout(function() {
      window.location.href = "index.html"; // or your home page URL
    }, 60000); // 60000 milliseconds = 1 minute
      },
      onClose: function () {
        alert("Transaction was cancelled.");
      }
    });

    handler.openIframe();
  });
});



    document.addEventListener("DOMContentLoaded", function () {
      const partnerButton = document.getElementById("partnerButton");
      const partnerForm = document.getElementById("partnerForm");

      partnerButton.addEventListener("click", function () {
        partnerForm.classList.toggle("hidden");
      });
    });