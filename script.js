document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById('menu-toggle').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
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

  // Hero Slideshow
  let currentSlideIndex = 0;
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.indicator');
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

  document.querySelector('.prev')?.addEventListener('click', () => changeSlide(-1));
  document.querySelector('.next')?.addEventListener('click', () => changeSlide(1));

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => currentSlide(index + 1));
  });

  let slideInterval = setInterval(() => changeSlide(1), 5000);

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
          window.location.href = '/#home'; // Change to your desired URL
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

const tabs = document.querySelectorAll(".tab-btn");
  const items = document.querySelectorAll(".gallery-item");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const selected = tab.getAttribute("data-tab");

      tabs.forEach(t => t.classList.remove("bg-amber-600", "text-white"));
      tab.classList.add("bg-amber-600", "text-white");

      items.forEach(item => {
        const category = item.getAttribute("data-category");
        item.style.display = (selected === "all" || selected === category) ? "block" : "none";
      });
    });
  });

  // Initialize with 'All' visible
  document.querySelector('.tab-btn[data-tab="all"]').click();

   document.getElementById('partnerButton').addEventListener('click', function() {
        const form = document.getElementById('partnerForm');
        form.classList.toggle('hidden');
    });

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
                    window.location.href = '/#home';
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



});
