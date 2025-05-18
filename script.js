document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const fabThemeToggle = document.getElementById('fab-theme-toggle');
  const html = document.documentElement;

  const toggleTheme = () => {
    html.classList.toggle('dark');
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
  };

  themeToggle.addEventListener('click', toggleTheme);
  fabThemeToggle.addEventListener('click', toggleTheme);

  if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
  }

  // Loading Spinner
  const loadingSpinner = document.getElementById('loading-spinner');
  window.addEventListener('load', () => {
    loadingSpinner.classList.add('hidden');
  });

  // Back to Top Button
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.classList.remove('hidden');
    } else {
      backToTop.classList.add('hidden');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // FAB Menu Toggle
  const fabToggle = document.getElementById('fab-toggle');
  const fabMenu = document.getElementById('fab-menu');

  fabToggle.addEventListener('click', () => {
    fabMenu.classList.toggle('show');
    fabMenu.classList.toggle('hidden');
  });

  // Sticky Profile Picture
  const profilePicWrapper = document.querySelector('.profile-pic-wrapper');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      profilePicWrapper.classList.add('sticky');
    } else {
      profilePicWrapper.classList.remove('sticky');
    }
  });

  // AOS Initialization
  AOS.init({ duration: 1000, once: true });

  // Particles.js Initialization
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: '#ffffff' },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: false },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
      move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
      modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
  });

  // Typewriter Effect with Width Fix
  const typewriterElement = document.getElementById('typewriter-name');
  const text = "Hi, I'm Prakhar Purwar";
  const typewriterContainer = document.querySelector('.typewriter-container');
  const textWidthMeasure = document.getElementById('text-width-measure');

  // Calculate the width of the full text
  const setContainerWidth = () => {
    const width = textWidthMeasure.offsetWidth;
    typewriterContainer.style.width = `${width}px`;
  };

  // Call this immediately to set the width before the animation starts
  setContainerWidth();

  // Ensure the width is recalculated on window resize
  window.addEventListener('resize', setContainerWidth);

  // Typewriter animation
  let i = 0;
  console.log("Starting typewriter effect");

  function typeWriter() {
    if (i < text.length) {
      typewriterElement.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }

  // Start the typewriter effect after a slight delay
  setTimeout(typeWriter, 500);

  // Project Data
  const projects = [
    { title: 'Data Visualization Dashboard', description: 'A dashboard for visualizing sales data using D3.js and React.', category: 'viz', github: 'https://github.com/PrakharPurwar12/data-viz-dashboard' },
    { title: 'Sentiment Analysis Tool', description: 'A tool for analyzing sentiment in social media posts using NLP.', category: 'nlp', github: 'https://github.com/PrakharPurwar12/sentiment-analysis' },
    { title: 'Portfolio Website', description: 'This very portfolio website built with HTML, CSS, and JavaScript.', category: 'web', github: 'https://github.com/PrakharPurwar12/portfolio' }
  ];

  const projectContainer = document.getElementById('project-container');
  const filterButtons = document.querySelectorAll('.filter-btn');

  function displayProjects(filter = 'all') {
    projectContainer.innerHTML = '';
    const filteredProjects = filter === 'all' ? projects : projects.filter(project => project.category === filter);

    filteredProjects.forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.classList.add('project-card', 'bg-white', 'dark:bg-gray-700', 'rounded-lg', 'p-6', 'shadow-md', 'hover:shadow-lg', 'transition-all');
      projectCard.innerHTML = `
        <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">${project.title}</h3>
        <p class="text-gray-600 dark:text-gray-300">${project.description}</p>
      `;
      projectCard.addEventListener('click', () => openProjectModal(project));
      projectContainer.appendChild(projectCard);

      // Initialize Vanilla Tilt for project cards
      VanillaTilt.init(projectCard, { max: 25, speed: 400, glare: true, 'max-glare': 0.5 });
    });
  }

  displayProjects();

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => {
        btn.classList.remove('bg-indigo-600', 'text-white');
        btn.classList.add('bg-gray-200', 'text-gray-700');
      });
      button.classList.remove('bg-gray-200', 'text-gray-700');
      button.classList.add('bg-indigo-600', 'text-white');
      const filter = button.getAttribute('data-filter');
      displayProjects(filter);
    });
  });

  // Project Modal
  const projectModal = document.getElementById('project-modal');
  const projectModalTitle = document.getElementById('project-modal-title');
  const projectModalDescription = document.getElementById('project-modal-description');
  const projectModalLink = document.getElementById('project-modal-link');
  const projectModalClose = document.getElementById('project-modal-close');

  function openProjectModal(project) {
    projectModalTitle.textContent = project.title;
    projectModalDescription.textContent = project.description;
    projectModalLink.href = project.github;
    projectModal.classList.remove('hidden');
  }

  projectModalClose.addEventListener('click', () => {
    projectModal.classList.add('hidden');
  });

  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      projectModal.classList.add('hidden');
    }
  });

  // Skills Modal
  const skillModal = document.getElementById('skill-modal');
  const skillModalTitle = document.getElementById('skill-modal-title');
  const skillModalDescription = document.getElementById('skill-modal-description');
  const skillModalClose = document.getElementById('skill-modal-close');

  const skillDescriptions = {
    python: 'Proficient in Python for data analysis, machine learning, and scripting.',
    sql: 'Experienced in writing complex SQL queries for data manipulation and retrieval.',
    excel: 'Advanced Excel skills for data analysis, including pivot tables and VBA.',
    'data-analysis': 'Skilled in deriving insights from data using statistical methods and visualization tools.',
    html: 'Familiar with HTML for building structured web content.',
    css: 'Knowledgeable in CSS for styling and responsive design.',
    javascript: 'Capable of using JavaScript for interactive web features.',
    pandas: 'Experienced with Pandas for data manipulation and analysis in Python.'
  };

  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach(card => {
    card.addEventListener('click', () => {
      const skill = card.getAttribute('data-skill');
      skillModalTitle.textContent = skill.charAt(0).toUpperCase() + skill.slice(1);
      skillModalDescription.textContent = skillDescriptions[skill];
      skillModal.classList.remove('hidden');
    });

    const progress = card.querySelector('.progress');
    const progressWidth = progress.getAttribute('data-width');
    setTimeout(() => {
      progress.style.width = progressWidth;
    }, 500);
  });

  skillModalClose.addEventListener('click', () => {
    skillModal.classList.add('hidden');
  });

  skillModal.addEventListener('click', (e) => {
    if (e.target === skillModal) {
      skillModal.classList.add('hidden');
    }
  });

  // Active Navigation Link on Scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 60) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });
});