document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. MOBILE NAVIGATION TOGGLE
  // ==========================================
  const menuBtn = document.getElementById('menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const toggleMobileNav = () => {
    const isOpen = menuBtn.classList.toggle('open');
    mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen);
    mobileNav.setAttribute('aria-hidden', !isOpen);
    
    // Prevent body scroll when menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  menuBtn.addEventListener('click', toggleMobileNav);

  // Close mobile nav when clicking a link
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (menuBtn.classList.contains('open')) {
        toggleMobileNav();
      }
    });
  });

  // ==========================================
  // 2. SCROLL ACTION HEADER & ACTIVE LINK TRACKING
  // ==========================================
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

  const handleScroll = () => {
    const scrollY = window.pageYOffset;

    // Header scroll background transition
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active Section Link Highlighting
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120; // offset for sticky nav
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        // Desktop nav update
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
        // Mobile nav update
        mobileNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  // Initial check
  handleScroll();

  // ==========================================
  // 3. SERVICES FILTERING
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active class on buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        // Premium transition effect: fade out, toggle display, fade in
        if (filterValue === 'all' || category === filterValue) {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          
          setTimeout(() => {
            card.style.display = 'flex';
            // Trigger browser reflow
            card.offsetHeight;
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 300);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ==========================================
  // 4. CONTACT FORM VALIDATION & SUBMISSION
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');

  const showToast = () => {
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  };

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Elements & Values
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const serviceSelect = document.getElementById('service');
    const dateInput = document.getElementById('date');
    const messageInput = document.getElementById('message');
    const submitBtn = contactForm.querySelector('.form-submit-btn');

    // Simple validation (Phone pattern check)
    const phonePattern = /^[0-9]{9,10}$/;
    if (!phonePattern.test(phoneInput.value.trim())) {
      alert('กรุณากรอกเบอร์โทรศัพท์ที่ถูกต้อง (เช่น 0891234567)');
      phoneInput.focus();
      return;
    }

    // Simulate form submission to backend
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> กำลังส่งข้อมูล...';

    // Mock network call (1.5 seconds)
    setTimeout(() => {
      // Log data to console (representing successful receipt)
      console.log('--- Form Submission Success ---');
      console.log('Name:', nameInput.value);
      console.log('Phone:', phoneInput.value);
      console.log('Service:', serviceSelect.value || 'Not selected');
      console.log('Preferred Date:', dateInput.value || 'Not selected');
      console.log('Message:', messageInput.value || 'None');

      // Reset form
      contactForm.reset();
      
      // Reset button
      submitBtn.disabled = false;
      submitBtn.innerText = 'ส่งข้อมูลนัดหมาย';

      // Show beautiful feedback toast
      showToast();
    }, 1500);
  });

  // ==========================================
  // 5. SCROLL TRIGGER ANIMATION (Intersection Observer)
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once animated, we don't need to observe it again
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null, // use viewport
    threshold: 0.15, // trigger when 15% visible
    rootMargin: '0px 0px -50px 0px' // offset bottom threshold slightly
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
});
