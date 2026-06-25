document.addEventListener("DOMContentLoaded", () => {
  // Global Features
  window.showPremiumToast = function(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `premium-toast ${type}`;
    
    let icon = '';
    if (type === 'success') {
      icon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
    } else if (type === 'download') {
      icon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>';
    } else if (type === 'open') {
      icon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>';
    } else if (type === 'error') {
      icon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
    } else {
      icon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
    }
      
    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-message">${message}</div>
    `;
    
    container.appendChild(toast);
    
    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3500); // Exists for 3.5 seconds
  };

  window.openPremiumViewer = function(title, pdfUrl) {
    const modal = document.getElementById('premium-viewer-modal');
    const modalTitle = document.getElementById('premium-modal-title');
    const dlBtn = document.getElementById('modal-download-btn');
    const iframe = document.getElementById('pdf-viewer-iframe');
    
    if(!modal) return;
    
    modalTitle.textContent = title;
    // Set direct download logic
    dlBtn.href = pdfUrl;
    dlBtn.download = title.replace(/[^a-zA-Z0-9]/g, "_") + ".pdf";
    
    iframe.src = pdfUrl;
    
    modal.classList.add('active');
    window.showPremiumToast(`Opening ${title}...`, 'success');
  };

  document.getElementById('modal-close-btn')?.addEventListener('click', () => {
    document.getElementById('premium-viewer-modal').classList.remove('active');
    setTimeout(() => {
      document.getElementById('pdf-viewer-iframe').src = '';
    }, 400);
  });

  // Reduced Motion & Performance Settings
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (prefersReducedMotion) {
    document.body.classList.add("reduce-motion");
    showToast("Reduced motion enabled for performance.", "success", false);
  }

  // Toast Notification Logic
  function showToast(message, type = "success", showUndo = true) {
    if (window.showPremiumToast) {
       window.showPremiumToast(message, type);
       return;
    }
    let container = document.getElementById("toast-stack-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-stack-container";
      document.body.appendChild(container);
    }

    // Dynamic Title & Subtitle Parsing
    let title = message;
    let subtitle = "System dispatch successfully verified.";
    const msgLower = message.toLowerCase();

    if (
      msgLower.includes("download") ||
      msgLower.includes("preparing secure")
    ) {
      title = "Resume Download Started";
      subtitle = "Preparing secure PDF payload...";
    } else if (
      msgLower.includes("opening resume") ||
      msgLower.includes("pdf")
    ) {
      title = "Viewer Initialized";
      subtitle = "Loading premium resume embed...";
    } else if (
      msgLower.includes("certificate") ||
      msgLower.includes("credential")
    ) {
      title = "Certificate Accessing";
      subtitle = "Routing secure external credential link...";
    } else if (
      msgLower.includes("ai implementation") ||
      msgLower.includes("strategy")
    ) {
      title = "Strategy Completed";
      subtitle = "Synthesized flow pipeline sequence.";
    } else if (
      msgLower.includes("reduced motion") ||
      msgLower.includes("motion")
    ) {
      title = "Motion Constrained";
      subtitle = "Optimized layout frames for responsiveness.";
    } else if (
      msgLower.includes("message") ||
      msgLower.includes("submitted") ||
      msgLower.includes("sent")
    ) {
      title = "Message Sent Successfully";
      subtitle = "We'll get back to you shortly.";
    } else if (msgLower.includes("copied")) {
      title = "Copied to Clipboard";
      subtitle = "Item saved successfully.";
    }

    // Timeouts per specs: Success = 3s, Error = 5s, Default = 4s
    const duration = type === "success" ? 3000 : type === "error" ? 5000 : 4000;

    // Create single toast element
    const toastItem = document.createElement("div");
    toastItem.className = `toast-item ${type}`;

    let iconSvg = `
      <svg class="toast-check-svg" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
    `;
    if (type === "success") {
      iconSvg = `
        <svg class="toast-check-svg" viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `;
    } else if (type === "error") {
      iconSvg = `
        <svg class="toast-check-svg" viewBox="0 0 24 24">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      `;
    }

    toastItem.innerHTML = `
      <div class="toast-item-body">
        <div class="toast-left">
          <div class="toast-icon-circle">
            ${iconSvg}
          </div>
        </div>
        <div class="toast-center">
          <div class="toast-title">${title}</div>
          <div class="toast-subtitle">${subtitle}</div>
        </div>
        <button class="toast-dismiss-btn" aria-label="Dismiss">✕</button>
      </div>
    `;

    let startTime = Date.now();
    let remaining = duration;
    let currentTimeout;

    function startTimer() {
      startTime = Date.now();
      currentTimeout = setTimeout(dismiss, remaining);
    }

    function pauseTimer() {
      clearTimeout(currentTimeout);
      remaining -= Date.now() - startTime;
      if (remaining < 0) remaining = 0;
    }

    function dismiss() {
      toastItem.classList.add("dismissed");
      toastItem.addEventListener("transitionend", () => {
        toastItem.remove();
      });
    }

    // Hover listeners to pause/resume dismiss timer
    toastItem.addEventListener("mouseenter", pauseTimer);
    toastItem.addEventListener("mouseleave", () => {
      startTimer();
    });

    // Dismiss click listener
    const dismissBtn = toastItem.querySelector(".toast-dismiss-btn");
    if (dismissBtn) {
      dismissBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        dismiss();
      });
    }

    container.appendChild(toastItem);

    // Micro-delayed viewport state transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        toastItem.classList.add("show");
      });
    });

    startTimer();
  }

  // Contact Form Handling
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    // Suggestion Chips
    const chips = contactForm.querySelectorAll(".chip");
    const messageArea = contactForm.querySelector("#message");
    const formSuccessWrap = document.getElementById("form-success-wrap");

    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        if (messageArea) {
          messageArea.value = chip.getAttribute("data-text");
          // Add active state to chip
          chips.forEach((c) => c.classList.remove("active"));
          chip.classList.add("active");
        }
      });
    });

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector(".btn-submit");
      const originalContent = submitBtn ? submitBtn.innerHTML : "";

      if (submitBtn) {
        submitBtn.classList.add("loading");
        submitBtn.disabled = true;
        submitBtn.innerHTML = "<span>Sending...</span>";
      }

      // Simulate API call
      emailjs.sendForm(
    "service_xmhmq0p",
    "template_jrzdagm",
    contactForm
)
.then(() => {

    if (submitBtn) {
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;
    }

    contactForm.reset();
    chips.forEach((c) => c.classList.remove("active"));

    showToast("Message Sent Successfully", "success");

    if (formSuccessWrap) {
        formSuccessWrap.classList.add("active");

        setTimeout(() => {
            formSuccessWrap.classList.remove("active");
        }, 4000);
    }

})
.catch((error) => {

    console.error("EmailJS Error:", error);

    if (submitBtn) {
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;
    }

    showToast("Failed to send message", "error");

});
    });
  }

  // Premium Navigation System Logic
  const scrollContainer = document.querySelector(".scroll-container");
  const navItems = document.querySelectorAll(".nav-item");

  // Get exactly the sections referenced by the nav items
  const validNavIds = Array.from(navItems)
    .map((item) => item.getAttribute("data-section"))
    .filter(Boolean);
  const uniqueNavIds = [...new Set(validNavIds)];
  const navTargetSections = uniqueNavIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  // Mobile Menu Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const drawerClose = document.getElementById("drawer-close");
  const sidebar = document.querySelector(".sidebar");
  const menuBackdrop = document.getElementById("menu-backdrop");

  if (sidebar && menuBackdrop) {
    const toggleMenu = () => {
      if (menuToggle) menuToggle.classList.toggle("active");
      sidebar.classList.toggle("active");
      menuBackdrop.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    };

    const closeMenu = () => {
      if (menuToggle) menuToggle.classList.remove("active");
      sidebar.classList.remove("active");
      menuBackdrop.classList.remove("active");
      document.body.classList.remove("menu-open");
    };

    if (menuToggle) {
      menuToggle.addEventListener("click", toggleMenu);
    }
    if (drawerClose) {
      drawerClose.addEventListener("click", closeMenu);
    }
    menuBackdrop.addEventListener("click", closeMenu);

    // Close sidebar when clicking a nav item on mobile
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        if (window.innerWidth <= 1024 && sidebar.classList.contains("active")) {
          closeMenu();
        }
      });
    });
  }

  // CTA Button Connections
  const exploreWorkBtn = document.querySelector(".hero-actions .btn-primary");
  const getInTouchBtn = document.querySelector(".hero-actions .btn-secondary");

  // Smooth Scroll on Click
  let isNavScrolling = false;
  let navTimeout;

  const isMobile = () => window.innerWidth <= 1024;

  function scrollToSection(section) {
    if (!section) return;
    isNavScrolling = true;

    if (!isMobile()) {
      // Temporarily disable scroll-snap on desktop to prevent scroll conflicts
      if (scrollContainer) {
        scrollContainer.style.setProperty(
          "scroll-snap-type",
          "none",
          "important",
        );
      }

      const targetTop = section.offsetTop;
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: targetTop,
          behavior: "smooth",
        });
      }

      clearTimeout(navTimeout);
      navTimeout = setTimeout(() => {
        if (scrollContainer) {
          scrollContainer.style.removeProperty("scroll-snap-type");
        }
        isNavScrolling = false;

        // Final fallback validation of active target after scroll
        if (section && section.id) {
          updateNavState(section.id);
        }
      }, 2000);
    } else {
      // On mobile, scroll body
      const targetTop = section.getBoundingClientRect().top + window.scrollY;

      // Offset by mobile nav header height of 56px
      const offsetTop = targetTop - 56;
      window.scrollTo({
        top: offsetTop >= 0 ? offsetTop : 0,
        behavior: "smooth",
      });

      clearTimeout(navTimeout);
      navTimeout = setTimeout(() => {
        isNavScrolling = false;
        if (section && section.id) {
          updateNavState(section.id);
        }
      }, 2000);
    }
  }

  if (exploreWorkBtn) {
    exploreWorkBtn.addEventListener("click", () => {
      const workSection = document.getElementById("work");
      scrollToSection(workSection);
    });
  }

  // Navigation State Updater Rule Engine
  const WORK_PARENT = "intro";
  const WORK_CHILDREN = ["work", "more-work"];

  function updateNavState(activeId) {
    let changed = false;
    navItems.forEach((item) => {
      const itemSection = item.getAttribute("data-section");
      let isActive = itemSection === activeId;

      // Parent-Child Tracking: if active child, parent is also active
      if (itemSection === WORK_PARENT && WORK_CHILDREN.includes(activeId)) {
        isActive = true;
      }

      if (item.classList.contains("active") !== isActive) {
        item.classList.toggle("active", isActive);
        changed = true;
      }
    });

    if (changed) {
      updateNavIndicator();
    }
  }

  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      const id = item.getAttribute("data-section");
      const section = document.getElementById(id);

      if (section) {
        // Update active state immediately using rules
        updateNavState(id);
        scrollToSection(section);
      }
    });
  });

  // Intersection Observer for Active State Tracking

  // Create continuous thresholds from 0 to 1 with 0.05 step
  const thresholds = [];
  for (let i = 0; i <= 100; i++) {
    thresholds.push(i / 100);
  }

  const navObserverOptions = {
    root: isMobile() ? null : scrollContainer,
    threshold: thresholds,
    rootMargin: "-49% 0px -49% 0px", // Exact viewport center detection tripwire
  };

  const navIndicator = document.querySelector(".nav-indicator");

  function updateNavIndicator() {
    requestAnimationFrame(() => {
      const activeItems = document.querySelectorAll(".nav-item.active");
      // Target the deepest active element (last in the DOM)
      const activeItem = activeItems[activeItems.length - 1];

      if (activeItem && navIndicator) {
        const top = activeItem.offsetTop;
        const height = activeItem.offsetHeight;
        navIndicator.style.opacity = "1";
        navIndicator.style.transform = `translate3d(0, ${top}px, 0)`;
        navIndicator.style.height = `${height}px`;
      }
    });
  }

  const elementVisibility = new Map();

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      elementVisibility.set(
        entry.target,
        entry.isIntersecting ? entry.intersectionRect.height : 0,
      );
    });

    if (isNavScrolling) return;

    const sectionVisibility = new Map();
    elementVisibility.forEach((height, targetEl) => {
      const sectionId = targetEl.id || targetEl.getAttribute("data-section");
      if (sectionId) {
        const currentMax = sectionVisibility.get(sectionId) || 0;
        if (height > currentMax) {
          sectionVisibility.set(sectionId, height);
        }
      }
    });

    let highestSectionId = null;
    let highestHeight = -1;

    sectionVisibility.forEach((height, sectionId) => {
      if (height > highestHeight) {
        highestHeight = height;
        highestSectionId = sectionId;
      }
    });

    if (highestSectionId && highestHeight > 0) {
      updateNavState(highestSectionId);
    }
  }, navObserverOptions);

  navTargetSections.forEach((section) => navObserver.observe(section));

  // Initial call and periodic check for reliability
  setTimeout(updateNavIndicator, 200);
  window.addEventListener("resize", updateNavIndicator);

  // URL Hash Support
  const hashMapping = {
    projects: "more-work",
    featured: "work",
    stats: "capabilities",
    work: "intro",
  };

  function handleHashScroll() {
    if (window.location.hash) {
      let id = window.location.hash.substring(1);
      if (hashMapping[id]) {
        id = hashMapping[id];
      }
      const section = document.getElementById(id);
      if (section) {
        updateNavState(id);
        setTimeout(() => {
          scrollToSection(section);
        }, 150);
      }
    }
  }

  window.addEventListener("load", handleHashScroll);
  window.addEventListener("hashchange", handleHashScroll);

  // Project Data System
  const projects = [
    {
  id: "globalgrad",
position: 0,
label: "AI STUDY ABROAD PLATFORM",
title: "GlobalGrad",
image: "src/assets/globalgrad.jpg",

description:
  "An AI-powered study abroad platform that helps students discover universities, scholarships, countries, and manage applications through intelligent guidance and real-time information.",

tags: [
  "React",
  "TypeScript",
  "Node.js",
  "Express",
  "Firebase",
  "Gemini AI"
],

architecture: "Study Abroad Decision Ecosystem",

performance: "AI Powered | Real-Time Data | Cloud Hosted",

features: [
  {
    // Graduation Cap
    icon: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/>',
    text: "University Explorer",
  },
  {
    // Award / Scholarship
    icon: '<circle cx="12" cy="8" r="5"/><path d="m8 13-1 8 5-3 5 3-1-8"/>',
    text: "Scholarship Finder",
  },
  {
    // Globe
    icon: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20"/><path d="M12 2a15 15 0 0 0 0 20"/>',
    text: "Country Comparison",
  },
  {
    // Bot / AI
    icon: '<rect x="4" y="8" width="16" height="10" rx="2"/><path d="M12 4v4"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/>',
    text: "AI Assistant",
  },
  {
    // Clipboard
    icon: '<rect x="6" y="4" width="12" height="16" rx="2"/><path d="M9 2h6v4H9z"/><path d="M9 10h6"/><path d="M9 14h4"/>',
    text: "Application Tracking",
  },
  {
    // Dashboard
    icon: '<rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="5" rx="1"/><rect x="13" y="10" width="8" height="11" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/>',
    text: "Admin Dashboard",
  },
],

metrics: [
  { value: "120+", label: "Universities" },
  { value: "15+", label: "Countries" },
  { value: "500+", label: "Scholarships " },
  { value: "24/7", label: "AI Guidance" },
],
    demoUrl:
    "https://global-grad-im0rw36bo-yasashvichowdaryvallepalli-5916s-projects.vercel.app/",

  githubUrl:
    "https://github.com/yasashvi45/GlobalGrad",
      mockupVariant: "mini-mockup variant-1",
      actions: [
        { type: "primary", text: "Case Study" },
        {
          type: "secondary",
          text: "Live Demo",
          url: "https://global-grad-im0rw36bo-yasashvichowdaryvallepalli-5916s-projects.vercel.app/",
        },
        {
          type: "icon",
          icon: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
        },
      ],
         
   caseStudy: {
  category: "AI Study Abroad Platform",

  duration: "2026",

  overview:
    "GlobalGrad is an AI-powered study abroad platform that simplifies university selection, scholarship discovery, country comparison, and application management.",

  problem:
    "Students struggle to find reliable information about universities, scholarships, tuition fees, and application requirements across different countries.",

  solution:
    "Built a centralized platform with AI-powered guidance, university exploration tools, scholarship management, and admin controls.",

  features: [
    {
      name: "University Explorer",
      desc: "Search and compare universities worldwide."
    },
    {
      name: "Scholarship Finder",
      desc: "Discover funding opportunities."
    },
    {
      name: "Country Comparison",
      desc: "Compare tuition, living costs and visa pathways."
    },
    {
      name: "AI Assistant",
      desc: "Gemini-powered personalized guidance."
    },
    {
      name: "Application Tracking",
      desc: "Manage student applications."
    },
    {
      name: "Admin Dashboard",
      desc: "Manage universities, scholarships and users."
    }
  ],

  implementation: {
    frontend: "React + TypeScript",
    backend: "Node.js + Express",
    database: "Firebase",
    ai: "Google Gemini AI"
  },

  challenges: [
    "AI integration",
    "Admin dashboard development",
    "University data management",
    "Deployment and scalability"
  ],

  learnings: [
    "Full Stack Development",
    "Firebase Integration",
    "REST APIs",
    "AI Integration",
    "Cloud Deployment"
  ],

  future: [
    "Visa Guidance",
    "IELTS Preparation",
    "AI University Recommendation",
    "Student Community",
    "Deadline Notifications"
  ],

  outcome:
    "Successfully developed and deployed an AI-powered study abroad platform with intelligent student assistance and complete administration tools."
}
    },
    {
      id: "chronova-watch",
      position: 0,
      label: "LUXURY E-COMMERCE",
      title: "Chronova",
      image: "src/assets/chronova.jpg",
      description:
        "Premium luxury watch e-commerce platform featuring category browsing, authentication workflows, shopping cart management, and personalized customer dashboards.",
      tags: ["HTML", "CSS", "JavaScript"],
      architecture: "RESPONSIVE",
      techHierarchy: "Frontend: HTML, CSS, JavaScript",
      performance: "ECOM",
      demoUrl: "https://yasashvi45.github.io/chronova-website/",
      githubUrl: "https://github.com/Yasashvi45/chronova-website",
      mockupVariant: "mini-mockup variant-1",
      actions: [
        { type: "primary", text: "Case Study" },
        {
          type: "secondary",
          text: "Live Demo",
          url: "https://yasashvi45.github.io/chronova-website/",
        },
        {
          type: "icon",
          icon: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
        },
      ],
      caseStudy: {
        category: "Luxury Watch E-Commerce Platform",
        duration: "Development Phase",
        overview: "Chronova is a premium watch e-commerce platform designed to provide users with a luxury shopping experience. The project focuses on modern user interface design, product discovery, responsive layouts, and seamless shopping workflows.",
        problem: "Many beginner e-commerce projects focus only on functionality and ignore premium user experience. The goal was to build a visually refined platform that combines usability with luxury branding.",
        solution: "Developed a responsive e-commerce website with product browsing, detailed product pages, cart management, and modern interface design principles.",
        features: [
          { name: "Product Catalog", desc: "Browse a curated collection of luxury timepieces." },
          { name: "Product Detail Pages", desc: "View detailed specifications and high-quality imagery." },
          { name: "Shopping Cart", desc: "Manage selected items smoothly before checkout." },
          { name: "Responsive Design", desc: "Optimized layouts for desktop, tablet, and mobile devices." },
          { name: "Search and Filtering", desc: "Easily find specific watches through tailored search capabilities." },
          { name: "Premium UI Components", desc: "Refined visual elements to match luxury branding." },
          { name: "Mobile Optimization", desc: "Seamless navigation and purchasing flows on smartphones." }
        ],
        implementation: {
          frontend: "HTML, CSS, JavaScript",
          architecture: "Component-based UI structure with reusable design sections."
        },
        challenges: [
          "Designing luxury visual aesthetics",
          "Maintaining responsiveness",
          "Creating smooth user interactions",
          "Managing product layouts"
        ],
        learnings: [
          "UI/UX design principles",
          "Responsive development",
          "Frontend architecture",
          "E-commerce workflows"
        ],
        future: [
          "Payment Integration",
          "User Authentication",
          "Wishlist",
          "Product Reviews",
          "Admin Dashboard"
        ],
        outcome: "Successfully created a luxury-inspired e-commerce platform showcasing frontend engineering and modern design capabilities."
      }
    },
    {
      id: "campus-issue",
      position: 1,
      label: "CAMPUS MANAGEMENT",
      title: "Campus Issue Reporting System",
      image: "src/assets/campus issue reporting system.jpg",
      description:
        "The Campus Issue Reporting System is a web-based platform that allows students to report campus-related problems and enables administrators to manage and resolve them efficiently.",
      tags: ["HTML", "CSS", "JavaScript"],
      architecture: "FRONTEND-FOCUSED",
      techHierarchy: "Frontend: HTML/CSS/JS ",
      performance: "MERN",
      demoUrl: "https://campus-issue-reporting-system.netlify.app/login.html",
      githubUrl: "https://github.com/yasashvi45/campus-issue-reporting-system",
      mockupVariant: "mini-mockup variant-1",
      actions: [
        { type: "primary", text: "Case Study" },
        {
          type: "secondary",
          text: "Live Demo",
          url: "https://campus-issue-reporting-system.netlify.app/login.html",
        },
        {
          type: "icon",
          icon: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
        },
      ],
      caseStudy: {
        category: "Campus Management Platform",
        duration: "Development Phase",
        overview: "The Campus Issue Reporting System is a web-based platform that allows students to report campus-related problems and enables administrators to manage and resolve them efficiently.",
        problem: "Students often struggle to communicate infrastructure, maintenance, and facility issues. Traditional reporting methods are slow and difficult to track.",
        solution: "Developed a centralized platform where students can submit complaints, monitor progress, and receive updates while administrators manage issue resolution.",
        features: [
          { name: "Issue Submission", desc: "Easily report precise campus problems." },
          { name: "Complaint Tracking", desc: "Track the real-time status of reported issues." },
          { name: "Category Management", desc: "Organize complaints by relevant campus departments." },
          { name: "Status Updates", desc: "Receive automated updates on resolution progress." },
          { name: "Student Dashboard", desc: "Personalized view of all submitted reports." },
          { name: "Admin Dashboard", desc: "Centralized interface for administrators to manage operations." },
          { name: "Resolution Workflow", desc: "Structured steps from opening to resolving an issue." },
          { name: "Report History", desc: "View past resolved issues and historical data." }
        ],
        implementation: {
          frontend: "HTML, CSS, JavaScript",
          backend: "Node.js",
          database: "MongoDB"
        },
        challenges: [
          "Designing reporting workflows",
          "Managing issue statuses",
          "Database organization",
          "Dashboard usability"
        ],
        learnings: [
          "Full-stack development",
          "CRUD operations",
          "Database management",
          "Authentication concepts",
          "Admin workflow design"
        ],
        future: [
          "Email Notifications",
          "Mobile Application",
          "AI Issue Categorization",
          "Analytics Dashboard"
        ],
        outcome: "Successfully built a structured complaint management platform that improves communication between students and administration."
      }
    },
    {
      id: "life-os",
      position: 3,
      label: "PRODUCTIVITY SUITE",
      title: "LifeOS Personal Workspace",
      image: "src/assets/projects/life-os.jpg",
      description:
        "An all-in-one productivity suite combining task management, habit tracking, journaling, and goal setting into a single unified dashboard.",
      tags: ["React", "TypeScript", "Redux", "Supabase", "Tailwind CSS"],
      architecture: "SPA",
      techHierarchy: "Frontend: React | Backend: Supabase",
      performance: "Offline-First",
      demoUrl: "https://demo.example.com",
      githubUrl: "https://github.com",
      mockupVariant: "mini-mockup variant-1",
      actions: [
        { type: "primary", text: "Case Study" },
        {
          type: "secondary",
          text: "Live Demo",
          url: "https://demo.example.com",
        },
        {
          type: "icon",
          icon: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
        },
      ],
      caseStudy: {
        category: "Software Engineering Project",
        duration: "Development Phase",
        overview: "Project details can be expanded as development progresses.",
        problem: "Project details can be expanded as development progresses.",
        solution: "Project details can be expanded as development progresses.",
        features: [
          { name: "Core Feature", desc: "Project details can be expanded as development progresses." }
        ],
        implementation: {
          frontend: "Project details can be expanded as development progresses."
        },
        challenges: [
          "Project details can be expanded as development progresses."
        ],
        learnings: [
          "Project details can be expanded as development progresses."
        ],
        future: [
          "Project details can be expanded as development progresses."
        ],
        outcome: "Project details can be expanded as development progresses."
      }
    },
    {
      id: "doc-workspace",
      position: 4,
      label: "COLLABORATION TOOL",
      title: "DocSpace Real-Time Editor",
      image: "src/assets/projects/doc-workspace.jpg",
      description:
        "A real-time collaborative document editor featuring live cursors, rich text formatting, version history, and team workspaces with granular permissions.",
      tags: ["Vue.js", "Node.js", "Socket.io", "MongoDB", "TipTap"],
      architecture: "WEBSOCKETS",
      techHierarchy: "Frontend: Vue.js | Backend: Node.js | DB: MongoDB",
      performance: "Real-time sync",
      demoUrl: "https://global-grad-im0rw36bo-yasashvichowdaryvallepalli-5916s-projects.vercel.app/",
      githubUrl: "https://github.com/yasashvi45/GlobalGrad",
      mockupVariant: "mini-mockup variant-1",
      actions: [
        { type: "primary", text: "Case Study" },
        {
          type: "secondary",
          text: "Live Demo",
          url: "https://global-grad-im0rw36bo-yasashvichowdaryvallepalli-5916s-projects.vercel.app/",
        },
        {
          type: "icon",
          icon: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
        },
      ],
      caseStudy: {
        category: "Software Engineering Project",
        duration: "Development Phase",
        overview: "Project details can be expanded as development progresses.",
        problem: "Project details can be expanded as development progresses.",
        solution: "Project details can be expanded as development progresses.",
        features: [
          { name: "Core Feature", desc: "Project details can be expanded as development progresses." }
        ],
        implementation: {
          frontend: "Project details can be expanded as development progresses."
        },
        challenges: [
          "Project details can be expanded as development progresses."
        ],
        learnings: [
          "Project details can be expanded as development progresses."
        ],
        future: [
          "Project details can be expanded as development progresses."
        ],
        outcome: "Project details can be expanded as development progresses."
      }
    },
  ];


  // Case Study Popup Management
  const csOverlay = document.getElementById("csOverlay");
  const csCloseBtn = document.getElementById("csCloseBtn");
  const csContentContainer = document.getElementById("csContent");
  const csHeaderTitle = document.getElementById("csHeaderTitle");
  const csScrollContainer = document.getElementById("csScrollContainer");

  function openCaseStudy(projectId) {
    const project = projects.find((p) => p.id === projectId);
    if (!project || !project.caseStudy) return;

    // Render Content
    const cs = project.caseStudy;
    csHeaderTitle.textContent = project.title;

    csContentContainer.innerHTML = `
      <div class="csc-hero-compact">
        <h1 class="csc-title-compact">${project.title}</h1>
        <div class="csc-tagline">${cs.category || project.label}</div>
        <div class="csc-meta-row">
            <div class="csc-meta-pill duration-pill">${cs.duration || "Development Phase"}</div>
            ${project.tags.map(tag => `<div class="csc-meta-pill tag-pill">${tag}</div>`).join("")}
        </div>
        ${cs.overview ? `<p class="csc-overview-text">${cs.overview}</p>` : ''}
      </div>

      <div class="csc-grid-2col">
        <div class="csc-col">
            ${cs.problem ? `
            <div class="csc-box">
                <div class="csc-box-title">Problem Statement</div>
                <p class="csc-box-text">${cs.problem}</p>
            </div>` : ''}
            ${cs.challenges && cs.challenges.length > 0 ? `
            <div class="csc-box">
                <div class="csc-box-title">Challenges</div>
                <ul class="csc-compact-list">
                    ${cs.challenges.map(c => `<li>${c}</li>`).join("")}
                </ul>
            </div>` : ''}
        </div>
        <div class="csc-col">
            ${cs.solution ? `
            <div class="csc-box">
                <div class="csc-box-title">Solution</div>
                <p class="csc-box-text">${cs.solution}</p>
            </div>` : ''}
            ${cs.outcome ? `
            <div class="csc-box highlight-box">
                <div class="csc-box-title">Outcome</div>
                <p class="csc-box-text">${cs.outcome}</p>
            </div>` : ''}
        </div>
      </div>

      ${cs.features && cs.features.length > 0 ? `
      <div class="csc-section-compact">
        <div class="csc-section-h">Core Features</div>
        <div class="csc-features-compact-grid">
          ${cs.features.map(f => `
            <div class="csc-feature-mini-card">
              <span class="csc-feature-name">${f.name}</span>
              <span class="csc-feature-desc">${f.desc}</span>
            </div>
          `).join("")}
        </div>
      </div>
      ` : ''}

      ${cs.implementation ? `
      <div class="csc-section-compact">
        <div class="csc-section-h">Implementation Details</div>
        <div class="csc-tech-chips">
            ${Object.entries(cs.implementation).map(([key, value]) => `
                <div class="csc-tech-chip"><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value}</div>
            `).join("")}
        </div>
      </div>
      ` : ''}

      ${(cs.learnings && cs.learnings.length > 0) || (cs.future && cs.future.length > 0) ? `
      <div class="csc-bottom-grid">
        ${cs.learnings && cs.learnings.length > 0 ? `
        <div class="csc-box">
            <div class="csc-box-title">Key Learnings</div>
            <ul class="csc-compact-list">
                ${cs.learnings.map(l => `<li>${l}</li>`).join("")}
            </ul>
        </div>
        ` : ''}
        ${cs.future && cs.future.length > 0 ? `
        <div class="csc-box">
            <div class="csc-box-title">Future Improvements</div>
            <ul class="csc-compact-list">
                ${cs.future.map(f => `<li>${f}</li>`).join("")}
            </ul>
        </div>
        ` : ''}
      </div>
      ` : ''}

      ${!cs.overview && !cs.problem ? `
      <div class="csc-box">
        <p class="csc-box-text csc-placeholder">Project details can be expanded as development progresses.</p>
      </div>
      ` : ''}
    `;

    // Show Overlay
    csOverlay.classList.add("is-active");
    document.body.style.overflow = "hidden";
    csScrollContainer.scrollTop = 0;
  }

  function closeCaseStudy() {
    csOverlay.classList.remove("is-active");
    document.body.style.overflow = "";
  }

  if (csCloseBtn) csCloseBtn.addEventListener("click", closeCaseStudy);
  if (csOverlay) {
    csOverlay.addEventListener("click", (e) => {
      if (e.target === csOverlay) closeCaseStudy();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCaseStudy();
  });

  function renderProjects() {
    const featuredSection = document.querySelector(".featured-project-section");
    const featuredContainer = document.querySelector(
      ".featured-project-section .projects-container",
    );
    const carouselTrack = document.querySelector(".carousel-track");

    if (featuredContainer) {
    const featured = projects.find(
  p => p.id === "globalgrad"
);
      

      featuredContainer.innerHTML = `
      <div class="featured-card premium-product-showcase group">
        <div class="featured-card-overlay"></div>
        <div class="premium-border-glow"></div>
        <div class="featured-left">
          <div class="floating-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l2.4 7.6 7.6 2.4-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z"/></svg> FLAGSHIP AI PROJECT
          </div>
          <div class="product-preview overflow-hidden rounded-xl">
            <div class="product-preview-glow"></div>
            <div class="featured-project-image">
                <img
                    src="${featured.image}"
                    alt="${featured.title}"
                    class="featured-project-img"
                    onerror="console.warn('Missing image path:', this.src); this.parentElement.classList.add('image-error')"
                />
            </div>
            <div class="preview-overlay"></div>
          </div>
          
          <div class="premium-metrics-row">
            ${featured.metrics
              .map(
                (m) => `
              <div class="premium-metric">
                <span class="pm-value">${m.value}</span>
                <span class="pm-label">${m.label}</span>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
        
        <div class="featured-right">
          <span class="featured-label">${featured.label}</span>
          <h3 class="featured-title">${featured.title}</h3>
          <p class="featured-desc">${featured.description}</p>
          
          <div class="project-specs">
            <div class="spec-item">
              <span class="spec-label">ARCHITECTURE</span>
              <span class="spec-value">${featured.architecture || "N/A"}</span>
            </div>
            <div class="spec-item">
                <span class="spec-value text-accent">
               Gemini AI | Firebase | Full Stack
               </span>
            </div>
          </div>

          <div class="tech-stack-pills">
            ${featured.tags.map((tag) => `<span class="tech-pill">${tag}</span>`).join("")}
          </div>

          <div class="project-features-grid premium-features">
            <div class="features-column">
              ${featured.features
                .slice(0, 3)
                .map(
                  (f) => `
                <div class="feature-point">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${f.icon}</svg>
                  <span>${f.text}</span>
                </div>
              `,
                )
                .join("")}
            </div>
            <div class="features-column">
              ${featured.features
                .slice(3, 6)
                .map(
                  (f) => `
                <div class="feature-point">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${f.icon}</svg>
                  <span>${f.text}</span>
                </div>
              `,
                )
                .join("")}
            </div>
          </div>

          <div class="featured-actions">
            ${featured.actions
              .map((a) => {
                if (a.type === "icon") {
                  return `<button class="btn-icon" aria-label="Project Link" onclick="window.open('${featured.githubUrl || "https://github.com"}', '_blank')"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${a.icon}</svg></button>`;
                }
                if (
                  a.text.includes("Technical") ||
                  a.text === "Architecture" ||
                  a.text === "Case Study"
                ) {
                  return `<button class="btn-primary" onclick="openCaseStudy('${featured.id}')">${a.text}</button>`;
                }
                return `<button class="btn-secondary" onclick="window.open('${a.url || featured.demoUrl || "https://demo.example.com"}', '_blank')">${a.text}</button>`;
              })
              .join("")}
          </div>
        </div>
      </div>
      `;
    }

    if (!carouselTrack) return;

    // Sort by position ASC (filtering out the featured project)
    const sortedProjects = [...projects]
      .filter((p) => p.id !== "globalgrad")
      .sort((a, b) => a.position - b.position);

    window.openCaseStudy = openCaseStudy; // Expose to global for onclick

    // Render exactly 4 carousel cards, no duplicates or generated copies
    carouselTrack.innerHTML = sortedProjects
      .map((p) => {
        if (!p.image) {
          // Check for image path as per requirements
        }

        return `
      <div class="carousel-item">
        <div class="project-card">
          <div class="project-card-overlay"></div>
          <div class="pc-preview">
            <div class="pc-preview-glow"></div>
            <div class="preview-grid-overlay"></div>
            <div class="featured-project-image">
                <img
                    src="${p.image}"
                    alt="${p.title}"
                    class="featured-project-img"
                    loading="lazy"
                    onerror="console.warn('Missing image path:', this.src); this.parentElement.classList.add('image-error')"
                />
            </div>
          </div>
          <div class="pc-content">
            <span class="pc-label">${p.label}</span>
            <h3 class="pc-title">${p.title}</h3>
            <p class="pc-desc">${p.description}</p>
            <div class="pc-tech">
              ${p.tags
                .slice(0, 3)
                .map((t) => `<span>${t}</span>`)
                .join("")}
            </div>
            <div class="pc-stats">
              <span>${p.performance ? p.performance.split("|")[0].trim() : ""}</span>
              <span>${p.architecture ? p.architecture.split(" ")[0] : ""}</span>
            </div>
            <div class="pc-actions">
              <button class="btn-primary" onclick="openCaseStudy('${p.id}')">Case Study</button>
              <button class="btn-icon" aria-label="Project Link" onclick="window.open('${p.githubUrl || "https://github.com"}', '_blank')">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>
                </svg>
              </button>
              <button class="btn-secondary live-demo-btn" onclick="window.open('${p.demoUrl || "https://demo.example.com"}', '_blank')">Live Demo</button>
            </div>
          </div>
        </div>
      </div>
    `;
      })
      .join("");

    // Re-initialize carousel with new items
    initCarousel();
    initMagneticButtons();
  }

  // Spacing Fix: Increase gap between top label and sub-line
  
  // Premium Portfolio Loader
  const setupLoaderAndTriggerSequence = () => {
    const loader = document.getElementById("system-loader");
    const terminalLinesContainer = document.getElementById("terminal-lines");
    
    // Run loader on every page load
    if (loader) {
      // Stop scroll temporarily
      document.body.style.overflow = "hidden";
      
      const messages = [
        "Initializing Frontend Systems...",
        "Loading AI Components...",
        "Optimizing Performance...",
        "Preparing Portfolio Experience..."
      ];
      
      let currentLineIdx = 0;
      
      const renderTerminal = () => {
        if (!terminalLinesContainer) return;
        terminalLinesContainer.innerHTML = Array.from({length: currentLineIdx + 1}).map((_, i) => {
          const isLast = i === currentLineIdx;
          const text = messages[i];
          if (isLast) {
            return `<div class="terminal-line active"><span class="status sys">[SYS]</span> ${text}<span class="terminal-cursor"></span></div>`;
          }
          return `<div class="terminal-line active"><span class="status">[OK]</span> ${text}</div>`;
        }).join("");
      };
      
      const advanceSequence = () => {
        if (currentLineIdx < messages.length - 1) {
          currentLineIdx++;
          renderTerminal();
          setTimeout(advanceSequence, 450); // 450ms per line 
        } else {
          // Finish sequence
          setTimeout(() => {
            loader.classList.add("loader-hidden");
            document.body.style.overflow = "";
            setTimeout(triggerLoadSequence, 200);
            
            // Cleanup DOM after transition
            setTimeout(() => {
                if (loader.parentNode) loader.parentNode.removeChild(loader);
            }, 1000);
          }, 600); // Wait bit before hiding
        }
      };
      
      // Initial render after some ms
      setTimeout(() => {
        renderTerminal();
        setTimeout(advanceSequence, 450);
      }, 700);

    } else {
      if (loader) {
        loader.style.display = "none";
      }
      triggerLoadSequence();
    }
  };

  setupLoaderAndTriggerSequence();

  // Reveal System: Text Reveal Logic
  function initTextReveal() {
    const headings = document.querySelectorAll(
      ".hero-heading, .about-heading, .entry-heading, .resume-heading, .contact-heading",
    );
    headings.forEach((heading) => {
      // Split by lines if they exist, or just apply character/word reveal
      // In this case, we use CSS-based masking via a class
      heading.classList.add("premium-text-reveal");
    });
  }

  // Global Reveal Observer
  function initRevealObserver() {
    const options = {
      root: document.querySelector(".scroll-container"),
      threshold: 0.05,
      rootMargin: "100px 0px 100px 0px",
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    }, options);

    document
      .querySelectorAll(".reveal-on-scroll")
      .forEach((el) => revealObserver.observe(el));
  }

  // Trigger staggered load for initial elements (Hero)
  function triggerLoadSequence() {
    const homeSection = document.getElementById("home");
    if (homeSection) homeSection.classList.add("is-visible");

    // Connected Experience: Detailed Staggered Entry
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) {
      sidebar.style.opacity = "0";
      sidebar.style.transition =
        "opacity 1s cubic-bezier(0.22, 1, 0.36, 1) 0.5s";
      setTimeout(() => (sidebar.style.opacity = "1"), 50);
    }

    const revealConfig = [
      { selector: ".top-badge", delay: 50 },
      { selector: ".hero-role", delay: 130 },
      { selector: ".hero-line", delay: 210, stagger: 60 },
      { selector: ".hero-description", delay: 350 },
      { selector: ".hero-tags", delay: 430 },
      { selector: ".hero-actions", delay: 510, stagger: 60 },
      { selector: ".hero-right", delay: 300, scale: true },
    ];

    revealConfig.forEach((config) => {
      const elements = document.querySelectorAll(config.selector);
      elements.forEach((el, index) => {
        el.style.opacity = "0";
        el.style.transform = config.scale ? "scale(0.96)" : "translateY(25px)";
        el.style.transition = "none";
        el.style.willChange = "opacity, transform";

        const individualDelay =
          config.delay + (config.stagger ? index * config.stagger : 0);

        setTimeout(() => {
          el.style.transition = `opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)`;
          el.style.opacity = "1";
          el.style.transform = config.scale ? "scale(1)" : "translateY(0)";
          if (config.scale) {
            el.style.filter = "drop-shadow(0 20px 50px rgba(0,0,0,0.3))";
          }
        }, 100 + individualDelay);
      });
    });
  }

  // Initialize all animation systems
  initTextReveal();
  initRevealObserver();

  // Button Shine Effect - Randomly trigger
  function setupButtonShine() {
    const buttons = document.querySelectorAll(
      ".btn-primary, .btn-secondary, .btn-submit",
    );

    const triggerShine = (btn) => {
      btn.classList.add("shine");
      setTimeout(() => btn.classList.remove("shine"), 800);
    };

    // Shine on hover
    buttons.forEach((btn) => {
      btn.addEventListener("mouseenter", () => {
        if (!btn.classList.contains("shine")) {
          triggerShine(btn);
        }
      });
    });

    // Occasional random shine
    setInterval(() => {
      const randomBtn = buttons[Math.floor(Math.random() * buttons.length)];
      if (randomBtn && !randomBtn.classList.contains("shine")) {
        triggerShine(randomBtn);
      }
    }, 10000);
  }

  setupButtonShine();

  // Cursor Interaction (Premium Minimal Follow)
  function initCursorFollow() {
    const interactables = document.querySelectorAll(
      ".btn-primary, .btn-secondary, .btn-download, .btn-icon, .project-card, .nav-item, .social-glass-btn, .capability-card, .internship-card-layer, .cert-rail-item",
    );

    interactables.forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * 0.08;
        const deltaY = (e.clientY - centerY) * 0.08;

        // Apply a micro-shift towards cursor
        // Check if it already has a transform (like magnetic)
        if (el.classList.contains("magnetic")) return;

        el.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.01)`;
      });

      el.addEventListener("mouseleave", () => {
        if (el.classList.contains("magnetic")) return;
        el.style.transform = "";
      });
    });
  }

  initCursorFollow();

  function initMagneticButtons() {
    const magneticEls = document.querySelectorAll(
      ".btn-primary, .btn-secondary, .btn-download, .btn-icon",
    );
    magneticEls.forEach((btn) => {
      if (!btn.classList.contains("magnetic-applied")) {
        btn.classList.add("magnetic", "magnetic-applied");

        btn.addEventListener("mousemove", (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          // Minimal magnetic pull
          btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.02)`;
        });

        btn.addEventListener("mouseleave", () => {
          btn.style.transform = "translate(0px, 0px) scale(1)";
        });
      }
    });
  }

  function initCarousel() {
    const track = document.querySelector(".carousel-track");
    const prevBtn = document.querySelector(".carousel-arrow.prev");
    const nextBtn = document.querySelector(".carousel-arrow.next");

    if (track && prevBtn && nextBtn) {
      const items = Array.from(document.querySelectorAll(".carousel-item"));
      const itemsLength = items.length;
      let currentIndex = 0;
      let cachedItemWidth = 0;

      let itemsPerView = window.innerWidth <= 767 ? 1 : 2;
      let maxIndex = Math.max(0, itemsLength - itemsPerView);

      const updateCarousel = () => {
        itemsPerView = window.innerWidth <= 767 ? 1 : 2;
        maxIndex = Math.max(0, itemsLength - itemsPerView);

        // Let it wrap if bounds exceeded
        if (currentIndex < 0) currentIndex = maxIndex;
        if (currentIndex > maxIndex) currentIndex = 0;

        if (items[0]) {
          cachedItemWidth = items[0].getBoundingClientRect().width;
          track.style.transform = `translateX(-${currentIndex * cachedItemWidth}px)`;
        }

        prevBtn.style.opacity = "1";
        prevBtn.style.pointerEvents = "auto";

        nextBtn.style.opacity = "1";
        nextBtn.style.pointerEvents = "auto";
      };

      let resizeTimer;
      window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateCarousel, 100);
      });

      prevBtn.onclick = () => {
        currentIndex -= itemsPerView;
        updateCarousel();
      };

      nextBtn.onclick = () => {
        currentIndex += itemsPerView;
        updateCarousel();
      };

      // Touch/Swipe Support
      let startX = 0;
      let currentX = 0;
      let isDragging = false;
      let moveTicking = false;

      track.onpointerdown = (e) => {
        if (e.target.closest("button")) return;
        startX = e.clientX;
        currentX = e.clientX;
        isDragging = true;
        track.style.transition = "none";
        track.setPointerCapture(e.pointerId);
      };

      track.onpointermove = (e) => {
        if (!isDragging) return;
        currentX = e.clientX;

        if (!moveTicking) {
          requestAnimationFrame(() => {
            const diff = currentX - startX;
            const baseTranslate = -(currentIndex * cachedItemWidth);
            track.style.transform = `translateX(${baseTranslate + diff}px)`;
            moveTicking = false;
          });
          moveTicking = true;
        }
      };

      track.onpointerup = (e) => {
        if (!isDragging) return;
        isDragging = false;
        track.releasePointerCapture(e.pointerId);
        track.style.transition =
          "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)";

        const diff = currentX - startX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) {
            currentIndex -= itemsPerView;
          } else {
            currentIndex += itemsPerView;
          }
        }

        updateCarousel();
      };

      document.addEventListener("keydown", (e) => {
        const carouselSection = document.querySelector(
          ".carousel-project-section",
        );
        if (carouselSection && carouselSection.classList.contains("in-view")) {
          if (e.key === "ArrowLeft") {
            currentIndex -= itemsPerView;
            updateCarousel();
          } else if (e.key === "ArrowRight") {
            currentIndex += itemsPerView;
            updateCarousel();
          }
        }
      });

      updateCarousel();
    }
  }

  // Initial call
  renderProjects();

  // Code Card and Hero Parallax
  const heroRight = document.querySelector(".hero-right");
  const codeCard = document.querySelector(".code-card");

  if (heroRight && codeCard && window.innerWidth > 1024) {
    let ticking = false;
    heroRight.addEventListener("mousemove", (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = heroRight.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = ((y - centerY) / centerY) * -8;
          const rotateY = ((x - centerX) / centerX) * 8;

          codeCard.style.setProperty("--mouse-x", `${x}px`);
          codeCard.style.setProperty("--mouse-y", `${y}px`);
          codeCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
          ticking = false;
        });
        ticking = true;
      }
    });

    heroRight.addEventListener("mouseleave", () => {
      codeCard.style.transform = "";
    });
  }

  // Scroll driven animation
  const heroMain = document.querySelector(".main-container");

  if (scrollContainer && heroMain) {
    let lastScrollY = -1;
    let scrollTicking = false;

    scrollContainer.addEventListener(
      "scroll",
      () => {
        if (!scrollTicking) {
          requestAnimationFrame(() => {
            const scrollTop = scrollContainer.scrollTop;
            if (scrollTop === lastScrollY) {
              scrollTicking = false;
              return;
            }
            lastScrollY = scrollTop;

            const windowHeight = window.innerHeight;
            if (scrollTop < windowHeight) {
              const progress = Math.max(
                0,
                Math.min(1, scrollTop / windowHeight),
              );
              const scale = 1 - progress * 0.05;
              const translateY = progress * -50;
              const opacity = 1 - progress * 1.2; // Slightly faster fade

              heroMain.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
              heroMain.style.opacity = Math.max(0, opacity);
            }
            scrollTicking = false;
          });
          scrollTicking = true;
        }
      },
      { passive: true },
    );
  }

  // Capabilities Card Hover
  const capCard = document.querySelector(".capabilities-card");
  if (capCard) {
    let ticking = false;
    capCard.addEventListener("mousemove", (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = capCard.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          capCard.style.setProperty("--mouse-x", `${x}px`);
          capCard.style.setProperty("--mouse-y", `${y}px`);

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -4;
          const rotateY = ((x - centerX) / centerX) * 4;

          capCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
          ticking = false;
        });
        ticking = true;
      }
    });

    capCard.addEventListener("mouseleave", () => {
      capCard.style.transform = "";
    });
  }

  // Featured Card Hover Parallax
  const featuredCard = document.querySelector(".featured-card");
  if (featuredCard) {
    let ticking = false;
    featuredCard.addEventListener("mousemove", (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = featuredCard.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -3;
          const rotateY = ((x - centerX) / centerX) * 3;

          featuredCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.01)`;
          ticking = false;
        });
        ticking = true;
      }
    });

    featuredCard.addEventListener("mouseleave", () => {
      featuredCard.style.transform =
        "translateY(0) rotateX(0) rotateY(0) scale(1)";
    });
  }

  // Sub-interactions via section observer
  const viewSections = document.querySelectorAll(
    "#home, #about, #capabilities, #intro, #work, #more-work, #internships, #certifications, #resume, #contact",
  );
  const countUpElements = document.querySelectorAll(".count-up");

  const sectionOptions = {
    root: scrollContainer,
    threshold: 0,
    rootMargin: "-10% 0px -10% 0px", // Trigger as soon as slightly in view
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        entry.target.classList.remove("fading-out");

        // Trigger counts when capabilities section is in view
        if (entry.target.classList.contains("capabilities-section")) {
          countUpElements.forEach((element) => {
            if (!element.classList.contains("counted")) {
              element.classList.add("counted");
              const targetStr = element.getAttribute("data-target");
              if (!targetStr) return;
              const target = parseInt(targetStr);
              const duration = 1200;
              const startTime = performance.now();

              function updateCount(currentTime) {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const easeProgress = 1 - Math.pow(1 - progress, 4);
                const currentCount = Math.floor(easeProgress * target);

                element.textContent = currentCount + "+";

                if (progress < 1) {
                  requestAnimationFrame(updateCount);
                } else {
                  element.textContent = target + "+";
                }
              }
              requestAnimationFrame(updateCount);
            }
          });
        }
        // Trigger typewriter when AI section is in view
        if (entry.target.classList.contains("ai-section")) {
          const promptTextElement = entry.target.querySelector(".prompt-text");
          if (
            promptTextElement &&
            !promptTextElement.classList.contains("typing-started")
          ) {
            promptTextElement.classList.add("typing-started");
            startTypewriter(promptTextElement);
          }
        }
      }
    });
  }, sectionOptions);

  function startTypewriter(element) {
    const fullText =
      "Orchestrate cluster upgrade: v4.2.1 --strategy=rolling --verify=state-bridge --region=ap-south-1 --optimize-latency";
    let textIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentText = fullText.substring(0, textIndex);
      element.textContent = currentText;

      let typeSpeed = isDeleting ? 20 : 40;
      typeSpeed += Math.random() * 25;

      // Pause at full stops and colons for human-like rhythm
      if (textIndex > 0 && [".", ",", ":"].includes(fullText[textIndex - 1])) {
        typeSpeed += 400;
      }

      if (!isDeleting && textIndex < fullText.length) {
        textIndex++;
      } else if (isDeleting && textIndex > 0) {
        // Only delete after a long pause
        textIndex--;
      } else {
        // Stay at the finished state for a significantly longer time (15 seconds)
        // This makes the UI feel more like a stable engineering dashboard
        typeSpeed = isDeleting ? 800 : 15000;
        isDeleting = !isDeleting;
      }

      setTimeout(typeEffect, typeSpeed);
    }

    element.textContent = "";
    setTimeout(typeEffect, 1200);
  }

  viewSections.forEach((sec) => sectionObserver.observe(sec));

  // Subtle Parallax Effect
  const parallaxElements = document.querySelectorAll(
    ".sidebar, .hero-left, .about-right, .ai-left, .resume-left",
  );

  if (window.innerWidth > 1024) {
    const scrollTarget =
      scrollContainer &&
      getComputedStyle(scrollContainer).overflowY === "scroll"
        ? scrollContainer
        : window;

    scrollTarget.addEventListener("scroll", () => {
      // Parallax shifts disabled as per user instruction to stabilize internal section content
    });
  }

  // Internships Wrapper Observer
  const internshipsWrapper = document.querySelector(".internships-wrapper");
  if (internshipsWrapper) {
    const wrapperObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            internshipsWrapper.classList.add("is-in-view");
          } else {
            internshipsWrapper.classList.remove("is-in-view");
          }
        });
      },
      { threshold: 0.1 },
    );
    wrapperObserver.observe(internshipsWrapper);
  }

  // Internships Snap Observer
  const internshipTriggers = document.querySelectorAll(".internship-trigger");
  const internshipCards = document.querySelectorAll(".internship-card-layer");
  const internshipDots = document.querySelectorAll(".timeline-dot");

  if (internshipTriggers.length > 0) {
    const intObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index"));

            internshipCards.forEach((c, i) => {
              if (i === index) {
                c.className = "internship-card-layer is-active";
              } else if (i < index) {
                c.className = "internship-card-layer past";
              } else {
                c.className = "internship-card-layer future";
              }
            });

            internshipDots.forEach((d, i) => {
              if (i === index) {
                d.className = "timeline-dot is-active";
              } else {
                d.className = "timeline-dot";
              }
            });
          }
        });
      },
      { threshold: 0.35, rootMargin: "0px 0px -100px 0px" },
    );

    internshipTriggers.forEach((t) => intObserver.observe(t));

    // Make timeline dots clickable to navigate/scroll to internship slots
    internshipDots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const index = parseInt(dot.getAttribute("data-index"));
        const targetTrigger = internshipTriggers[index];
        if (targetTrigger) {
          targetTrigger.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      });
    });

    // Initial trigger for first card
    if (internshipCards.length > 0) {
      internshipCards[0].classList.add("is-active");
      if (internshipDots.length > 0)
        internshipDots[0].classList.add("is-active");
    }
  }

  // CERTIFICATIONS DATA & LOGIC
  const certifications = [
    {
      id: "meta-vc",
      title: "Version Control",
      provider: "Meta",
      description:
        "Professional certification covering Git, GitHub, version control workflows, branching strategies, collaboration practices, repository management, and modern software development workflows.",
      date: "2024",
      logo: '<line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',
      image:
        "src/assets/meta version control.jpg",
      url: "src/assets/certificates/meta frontend development version control.pdf",
    },
    {
      id: "meta-js",
      title: "Programming with JavaScript",
      provider: "Meta",
      description:
        "Comprehensive JavaScript certification covering programming fundamentals, ES6 features, DOM manipulation, asynchronous operations, APIs, debugging, and modern web application development.",
      date: "2024",
      logo: '<path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>',
      image:
        "src/assets/front-end development.jpg",
      url: "src/assets/certificates/meta frontend development programming with javascript.pdf",
    },
    {
      id: "meta-fe",
      title: "Introduction to Front-End Development",
      provider: "Meta",
      description:
        "Front-end development foundations including HTML, CSS, responsive design, accessibility principles, web architecture, and modern user interface development practices.",
      date: "2024",
      logo: '<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>',
      image:
        "src/assets/front-end development.jpg",
      url: "src/assets/certificates/meta Introduction to front end development.pdf",
    },
    {
  id: "ibm-ai-fundamentals",
  title: "Artificial Intelligence Fundamentals",
  provider: "IBM SkillsBuild",
  type: "verify",
  description:
    "Foundational certification covering AI concepts, machine learning basics, neural networks, responsible AI, real-world AI applications, and emerging technologies.",
  date: "2026",
  logo: '<path d="M12 2a3 3 0 0 1 3 3v2h2a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3v-2H5a3 3 0 0 1-3-3v-4a3 3 0 0 1 3-3h2V5a3 3 0 0 1 3-3z"/>',
  image: "src/assets/artificial intelligence fundamentals.jpg",
  url: "https://www.credly.com/earner/earned/badge/48771ba6-adef-447b-93ff-38f2ea223c7c"
},
{
  id: "ibm-frontend",
  title: "Front-End Web Development",
  provider: "IBM SkillsBuild",
  type: "verify",
  description:
    "Covers modern front-end development including HTML5, CSS3, JavaScript, responsive design, UI/UX principles, accessibility, and web application development.",
  date: "2026",
  logo: '<path d="M8 6h8v12H8z"/><path d="M12 10h.01"/><path d="M10 14h4"/>',
  image: "src/assets/front-end web development.jpg",
  url: "https://www.credly.com/earner/earned/badge/db49fee5-7de8-453c-b769-811e9a604ed2"
},
{
  id: "ibm-backend",
  title: "Back-End Development",
  provider: "IBM SkillsBuild",
  type: "verify",
  description:
    "Certification focused on server-side development, APIs, databases, backend architecture, application deployment, security practices, and scalable web services.",
  date: "2026",
  logo: '<path d="M8 4h8v6H8z"/><path d="M4 14h16"/><path d="M8 20h8"/>',
  image: "src/assets/Back-end web development.jpg",
  url: "https://www.credly.com/earner/earned/share/256e8cef-0e49-40f7-aa56-fe8413f38769"
},
{
  id: "ibm-responsive",
  title: "Responsive Web Page Development",
  provider: "IBM SkillsBuild",
  type: "verify",
  description:
    "Focused on building responsive websites using modern CSS techniques, mobile-first design principles, adaptive layouts, cross-device compatibility, and performance optimization.",
  date: "2026",
  logo: '<path d="M5 4h14v12H5z"/><path d="M9 20h6"/><path d="M12 16v4"/>',
  image: "src/assets/responsive web page development.jpg",
  url: "https://www.credly.com/earner/earned/badge/d6323898-6dc4-4371-938f-619afde11f9f"
},
{
  id: "ibm-genai",
  title: "Generative AI Essentials: Using LLMs to Work with Data",
  provider: "IBM SkillsBuild",
  type: "verify",
  description:
    "Certification demonstrating practical knowledge of generative AI, large language models, prompt engineering, data analysis workflows, and AI-assisted productivity.",
  date: "2026",
  logo: '<path d="M12 2v20"/><path d="M2 12h20"/><path d="M5 5l14 14"/><path d="M19 5L5 19"/>',
  image: "src/assets/generative ai llms.jpg",
  url: "https://www.credly.com/earner/earned/badge/a448bd6d-9b03-4fac-80b9-cd6f88fe07d9"
},
{
  id: "ibm-granite",
  title: "Data Classification and Summarization Using IBM Granite",
  provider: "IBM SkillsBuild",
  type: "verify",
  description:
    "Demonstrates skills in AI-powered data classification, summarization techniques, IBM Granite models, prompt engineering, and intelligent information extraction.",
  date: "2026",
  logo: '<path d="M4 6h16v12H4z"/><path d="M8 10h8"/><path d="M8 14h5"/>',
  image: "src/assets/data classification granite.jpg",
  url: "https://www.credly.com/earner/earned/badge/3c7052a0-7e87-4132-abc0-f3f1e53dd5ba"
},
    {
      id: "ibm-dt",
      title: "Enterprise Design Thinking Practitioner",
      provider: "IBM",
      type: "verify",
      description:
        "Industry-recognized certification focused on human-centered design, innovation frameworks, customer-centric problem solving, ideation, and product development methodologies.",
      date: "2024",
      logo: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
      image:
        "src/assets/enterprise design thinking practitioner.jpg",
      url: "https://www.credly.com/earner/earned/badge/2d795fdb-8358-4e25-a331-d3a5e8e37d61",
    },
    {
      id: "uipath-auto",
      title: "UiPath Automation Implementation Methodology Fundamentals",
      provider: "UiPath",
      description:
        "Professional certification covering robotic process automation fundamentals, automation lifecycle management, workflow design, implementation methodologies, and enterprise automation practices.",
      date: "2024",
      logo: '<rect width="8" height="8" x="2" y="2" rx="2"/><rect width="8" height="8" x="14" y="2" rx="2"/><rect width="8" height="8" x="14" y="14" rx="2"/><path d="M6 10v4a2 2 0 0 0 2 2h6"/><path d="M18 10v4"/>',
      image:
        "src/assets/uipath.jpg",
      url: "src/assets/certificates/uipath .pdf",
    },
    {
      id: "be10x-ai",
      title: "AI Tools Workshop",
      provider: "be10x",
      description:
        "Hands-on certification focused on modern AI tools, productivity workflows, prompt engineering, AI-assisted content generation, and practical AI implementation strategies.",
      date: "2024",
      logo: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>',
      image:
        "src/assets/be10x ai tool workshop.jpg",
      url: "src/assets/certificates/Ai tool workshop.pdf",
    },
    {
      id: "apis-biz",
      title: "Startup Business Management Program",
      provider: "AP Innovation Society",
      description:
        "Entrepreneurship and business management certification covering startup ecosystems, innovation strategies, business planning, leadership fundamentals, and entrepreneurial thinking.",
      date: "2024",
      logo: '<rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
      image:
        "src/assets/startup business management program.jpg",
      url: "src/assets/certificates/Startup Business .pdf",
    },
    {
      id: "great-c",
      title: "C for Beginners",
      provider: "Great Learning",
      description:
        "Programming fundamentals certification covering C language basics, problem-solving techniques, control structures, functions, arrays, pointers, and foundational software development concepts.",
      date: "2024",
      logo: '<polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>',
      image:
        "src/assets/c for beginners.jpg",
      url: "src/assets/certificates/C for Begineers.pdf",
    },
  ];

  let selectedCertIndex = 1;

  function renderCertifications() {
    const railContainer = document.getElementById("certs-rail");
    const focusContainer = document.getElementById("certs-focus");
    if (!railContainer || !focusContainer) return;

    // Render Rail
    railContainer.innerHTML = certifications
      .map(
        (cert, index) => `
      <div class="cert-rail-item" data-index="${index}">
        <div class="cri-logo">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${cert.logo}</svg>
        </div>
        <div class="cri-content">
          <span class="cri-name">${cert.title}</span>
          <span class="cri-year">${cert.date}</span>
        </div>
      </div>
    `,
      )
      .join("");

    // Render Focus Stack
    focusContainer.innerHTML = `
      <div class="cert-hero-stack">
        ${certifications
          .map(
            (cert, index) => `
          <div class="cert-hero-card" data-index="${index}">
            <div class="chc-image-container">
              <img src="${cert.image}" alt="${cert.title}" class="chc-cert-img" loading="lazy" referrerpolicy="no-referrer" />
              <div class="chc-verified-badge">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Verified</span>
              </div>
              
              <div class="chc-bottom-title">${cert.title}</div>
              
              <div class="chc-overlay"></div>
              <div class="chc-reveal-content">
                <h3 class="chc-reveal-title">${cert.title}</h3>
                <p class="chc-reveal-desc">${cert.description}</p>
                <a class="chc-reveal-btn"
                href="${cert.url}"
                 target="_blank"
                 rel="noopener"
                 ${cert.type !== "verify" ? "download" : ""}>

                  ${cert.type === "verify"
                  ? "Verify Credentials"
                   : "Download Certificate (PDF)"}
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 2px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                </a>
              </div>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
    `;

    initCertSync();
  }

  function initCertSync() {
    const railItems = document.querySelectorAll(".cert-rail-item");
    const cards = document.querySelectorAll(".cert-hero-card");

    // We'll maintain an internal order for the circular rotation
    let currentOrder = Array.from({ length: railItems.length }, (_, i) => i);

    function updateRightSide(focusIndex) {
      cards.forEach((card, i) => {
        const isActive = i === focusIndex;
        if (isActive) {
          card.className = "cert-hero-card active";
        } else {
          card.className = "cert-hero-card next";
        }
      });
    }

    function updateCertStack(clickedIndex) {
      if (
        selectedCertIndex === clickedIndex &&
        cards[clickedIndex] &&
        cards[clickedIndex].classList.contains("active")
      )
        return;

      requestAnimationFrame(() => {
        // 1. Rotate currentOrder so that clickedIndex is at index 0
        const orderPos = currentOrder.indexOf(clickedIndex);
        if (orderPos !== -1) {
          const rotatedPart = currentOrder.splice(0, orderPos);
          currentOrder = [...currentOrder, ...rotatedPart];
        }

        selectedCertIndex = clickedIndex;

        // 2. Update Rail Stack based on currentOrder
        railItems.forEach((item, i) => {
          const indexInOrder = currentOrder.indexOf(i);

          item.classList.remove(
            "active",
            "stack-1",
            "stack-2",
            "stack-3",
            "stack-4",
            "hidden-back",
          );

          if (indexInOrder === 0) {
            item.classList.add("active");
          } else if (indexInOrder >= 1 && indexInOrder <= 4) {
            item.classList.add(`stack-${indexInOrder}`);
          } else {
            item.classList.add("hidden-back");
          }
        });

        // 3. Update Right Focus Stack (Preview)
        updateRightSide(clickedIndex);
      });
    }

    railItems.forEach((item) => {
      const index = parseInt(item.getAttribute("data-index"));
      item.addEventListener("click", () => {
        updateCertStack(index);
      });
    });

    // Initialize first item
    updateCertStack(selectedCertIndex);
  }

  // Contact Suggestion Chips
  const chips = document.querySelectorAll(".chip");
  const messageTextarea = document.getElementById("message");

  if (chips && messageTextarea) {
    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const text = chip.getAttribute("data-text");
        messageTextarea.value = text;
        messageTextarea.focus();

        // Visual feedback
        chips.forEach((c) => (c.style.borderColor = ""));
        chip.style.borderColor = "#3B82F6";
        chip.style.background = "rgba(59, 130, 246, 0.1)";
      });
    });
  }

  // Resume Card 3D Tilt & Spotlight Effect
  const resumeCard = document.querySelector(".resume-preview-card");
  const resumeWrapper = document.querySelector(".resume-card-wrapper");
  const avatarOrb = document.querySelector(".rp-avatar-circle");

  if (resumeCard && resumeWrapper) {
    let ticking = false;
    resumeWrapper.addEventListener("mousemove", (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = resumeWrapper.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = ((y - centerY) / centerY) * -6;
          const rotateY = ((x - centerX) / centerX) * 6;

          resumeCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.02)`;

          // Dynamic spotlight follow
          resumeCard.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.08), transparent 70%), linear-gradient(165deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))`;

          // Avatar orb parallax
          if (avatarOrb) {
            const oX = ((x - centerX) / centerX) * 12;
            const oY = ((y - centerY) / centerY) * 12;
            avatarOrb.style.transform = `translate(${oX}px, ${oY}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    });

    resumeWrapper.addEventListener("mouseleave", () => {
      resumeCard.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";
      resumeCard.style.background =
        "linear-gradient(165deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))";
      if (avatarOrb) {
        avatarOrb.style.transform = "translate(0, 0)";
      }
    });
  }

  // AI Architecture Logic
  const aiGenBtn = document.querySelector(".ai-gen-btn");
  const aiOutputArea = document.querySelector(".ai-output-area");
  if (aiGenBtn && aiOutputArea) {
    aiGenBtn.addEventListener("click", () => {
      aiGenBtn.classList.add("loading");
      aiGenBtn.disabled = true;
      aiGenBtn.textContent = "Analyzing System Architecture...";

      aiOutputArea.innerHTML =
        '<div class="ai-loading-skeleton"><span></span><span></span><span></span></div>';

      setTimeout(() => {
        aiGenBtn.classList.remove("loading");
        aiGenBtn.disabled = false;
        aiGenBtn.textContent = "Generate New Strategy";

        aiOutputArea.innerHTML = `
          <div class="ai-generated-strategy">
            <h4 class="ai-strategy-title" style="font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 16px;">Multi-Agent Orchestration Strategy</h4>
            <p class="ai-strategy-desc" style="font-size: 14px; color: rgba(255,255,255,0.7); line-height: 1.6; margin-bottom: 20px;">Based on the current architecture, we recommend implementing a Hierarchical Task Bridge (HTB) for asynchronous state resolution.</p>
            <ul class="ai-strategy-list" style="display: flex; flex-direction: column; gap: 12px; padding: 0; list-style: none;">
              <li style="display: flex; align-items: flex-start; gap: 12px; font-size: 13px; color: rgba(255,255,255,0.6);">
                <span style="color: #3B82F6; font-weight: bold;">•</span>
                <span>Deploy Vector-DB for long-term semantic context retention.</span>
              </li>
              <li style="display: flex; align-items: flex-start; gap: 12px; font-size: 13px; color: rgba(255,255,255,0.6);">
                <span style="color: #3B82F6; font-weight: bold;">•</span>
                <span>Integrate Real-time Telemetry for agent health monitoring.</span>
              </li>
              <li style="display: flex; align-items: flex-start; gap: 12px; font-size: 13px; color: rgba(255,255,255,0.6);">
                <span style="color: #3B82F6; font-weight: bold;">•</span>
                <span>Utilize Quantized LLM nodes for edge-computed task routing.</span>
              </li>
            </ul>
          </div>
        `;
        showToast("AI Implementation Strategy Generated! 🧠", "success");
      }, 2000);
    });
  }

  // Social Actions Toaster
  document.querySelectorAll('a[href*="github.com"], a[href*="linkedin.com"], a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      if (href.includes('github.com')) {
        if (window.showPremiumToast) window.showPremiumToast("Opening GitHub Profile", "open");
      } else if (href.includes('linkedin.com')) {
        if (window.showPremiumToast) window.showPremiumToast("Opening LinkedIn Profile", "open");
      } else if (href.startsWith('mailto:')) {
        if (window.showPremiumToast) window.showPremiumToast("Opening Email Client", "open");
      }
    });
  });

  renderCertifications();
});
