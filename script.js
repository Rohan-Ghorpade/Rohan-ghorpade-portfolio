document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('section:not(#hero)');
  const navIcons = document.querySelectorAll('.nav-icon');
  const hiddenNav = document.querySelector('.hidden-nav');
  const exploreBtn = document.querySelector('.explore-btn');
  const body = document.querySelector('body');
  const particlesContainer = document.getElementById('particles');
  const transmitBtn = document.getElementById('transmit-btn');
  const skillBars = document.querySelectorAll('.skill-progress');

  let accessGranted = false;

  // Create floating particles
  function createParticles() {
    const count = 50;
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.top = Math.random() * 100 + 'vh';
      particle.style.animationDelay = Math.random() * 15 + 's';
      particle.style.width = Math.random() * 4 + 2 + 'px';
      particle.style.height = particle.style.width;
      particlesContainer.appendChild(particle);
    }
  }

  createParticles();

  // Initially hide all sections except hero
  sections.forEach((section) => {
    section.style.display = 'none';
  });

  function grantAccess() {
    accessGranted = true;
    exploreBtn.textContent = 'Portfolio Unlocked';
    exploreBtn.style.background = 'rgba(138, 43, 226, 0.2)';
    exploreBtn.style.cursor = 'default';

    // Show hidden sections with animation
    setTimeout(() => {
      sections.forEach((section) => {
        section.style.display = 'flex';
        setTimeout(() => {
          section.classList.add('visible');
        }, 100);
      });

      // Show navigation
      hiddenNav.classList.add('visible');

      // Scroll to about section
      document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    }, 1000);
  }

  // Explore button functionality
  exploreBtn.addEventListener('click', () => {
    if (!accessGranted) {
      grantAccess();
    }
  });

  // Navigation functionality
  navIcons.forEach((icon, index) => {
    icon.addEventListener('click', () => {
      if (!accessGranted) {
        alert('Please unlock the portfolio first by clicking "Explore Portfolio"');
        return;
      }

      const sections = document.querySelectorAll('section');
      sections[index].scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Animate skill bars when they come into view
  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute('data-width');
          entry.target.style.width = width;
          entry.target.classList.add('animate');
        }
      });
    },
    { threshold: 0.5 }
  );

  skillBars.forEach((bar) => {
    skillsObserver.observe(bar);
  });

  // Contact form functionality
  transmitBtn.addEventListener('click', () => {
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;

    if (!name || !email || !message) {
      // Highlight empty fields
      const inputs = document.querySelectorAll('.terminal-input');
      inputs.forEach((input) => {
        if (!input.value) {
          input.style.borderColor = 'var(--neon-pink)';
          input.style.boxShadow = '0 0 10px var(--neon-pink)';
          setTimeout(() => {
            input.style.borderColor = '';
            input.style.boxShadow = '';
          }, 2000);
        }
      });
      return;
    }

    // Success message
    transmitBtn.textContent = 'Message Sent!';
    transmitBtn.style.background = 'rgba(39, 201, 63, 0.2)';
    transmitBtn.style.borderColor = '#27c93f';
    transmitBtn.style.color = '#27c93f';

    // Reset form after 3 seconds
    setTimeout(() => {
      document.getElementById('contact-name').value = '';
      document.getElementById('contact-email').value = '';
      document.getElementById('contact-message').value = '';
      transmitBtn.textContent = 'Send Message';
      transmitBtn.style.background = '';
      transmitBtn.style.borderColor = '';
      transmitBtn.style.color = '';
    }, 3000);
  });

  // Scroll animation for elements
  const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && accessGranted) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeElements.forEach((el) => observer.observe(el));

  // Terminal input focus
  const terminalInputs = document.querySelectorAll('.terminal-input');
  terminalInputs.forEach((input) => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focused');
    });
  });

  // Prevent scrolling if access not granted
  window.addEventListener('scroll', (e) => {
    if (!accessGranted && window.scrollY > window.innerHeight * 0.5) {
      window.scrollTo(0, 0);
      alert('Please unlock the portfolio first by clicking "Explore Portfolio"');
    }
  });

  // Add interactive background effect on mouse move
  document.addEventListener('mousemove', (e) => {
    if (!accessGranted) return;

    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    document.body.style.background = `
        radial-gradient(circle at ${x * 100}% ${
      y * 100
    }%, rgba(40, 0, 80, 0.1), transparent 25%),
        radial-gradient(circle at ${100 - x * 100}% ${
      100 - y * 100
    }%, rgba(100, 0, 150, 0.1), transparent 25%),
        var(--darker-bg)
    `;
  });
});
