// ==========================================
// SMOOTH SCROLLING
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offset = 80
      const targetPosition = target.offsetTop - offset
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================
const navbar = document.getElementById("navbar")
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  lastScroll = currentScroll
})

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
const mobileMenuBtn = document.getElementById("mobile-menu-btn")
const navMenu = document.getElementById("nav-menu")
const navLinks = document.querySelectorAll(".nav-link")

mobileMenuBtn.addEventListener("click", () => {
  mobileMenuBtn.classList.toggle("active")
  navMenu.classList.toggle("active")
})

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenuBtn.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("aos-animate")
    }
  })
}, observerOptions)

document.querySelectorAll("[data-aos]").forEach((element) => {
  observer.observe(element)
})

// ==========================================
// STAT COUNTER ANIMATION
// ==========================================
const animateCounter = (element, target) => {
  let current = 0
  const increment = target / 50
  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      element.textContent = target
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(current)
    }
  }, 30)
}

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
        entry.target.classList.add("counted")
        const target = Number.parseInt(entry.target.dataset.target)
        animateCounter(entry.target, target)
      }
    })
  },
  { threshold: 0.5 },
)

document.querySelectorAll(".stat-number").forEach((stat) => {
  statObserver.observe(stat)
})

// ==========================================
// SKILL PROGRESS BAR ANIMATION
// ==========================================
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active")
        const progressBar = entry.target.querySelector(".skill-progress-fill")
        if (progressBar) {
          const progress = progressBar.dataset.progress
          setTimeout(() => {
            progressBar.style.width = progress + "%"
          }, 200)
        }
      }
    })
  },
  { threshold: 0.3 },
)

document.querySelectorAll(".skill-card-modern").forEach((card) => {
  skillObserver.observe(card)
})

// ==========================================
// CONTACT FORM HANDLING
// ==========================================
const contactForm = document.getElementById("contactForm")
const formMessage = document.getElementById("formMessage")

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  const formData = new FormData(contactForm)
  const name = formData.get("name").trim()
  const email = formData.get("email").trim()
  const subject = formData.get("subject").trim()
  const message = formData.get("message").trim()

  // Validation
  if (!name || name.length < 2) {
    showFormMessage("Please enter a valid name (at least 2 characters)", "error")
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email || !emailRegex.test(email)) {
    showFormMessage("Please enter a valid email address", "error")
    return
  }

  if (!subject || subject.length < 3) {
    showFormMessage("Please enter a subject (at least 3 characters)", "error")
    return
  }

  if (!message || message.length < 10) {
    showFormMessage("Please enter a message (at least 10 characters)", "error")
    return
  }

  // Simulate form submission
  const submitBtn = contactForm.querySelector('button[type="submit"]')
  const originalBtnText = submitBtn.innerHTML
  submitBtn.innerHTML = "<span>Sending...</span>"
  submitBtn.disabled = true

  // Simulate API call
  setTimeout(() => {
    showFormMessage("Thank you for reaching out! I'll get back to you soon.", "success")
    contactForm.reset()
    submitBtn.innerHTML = originalBtnText
    submitBtn.disabled = false
  }, 1500)
})

function showFormMessage(text, type) {
  formMessage.textContent = text
  formMessage.className = `form-message ${type}`
  formMessage.style.display = "block"

  setTimeout(() => {
    formMessage.style.display = "none"
  }, 5000)
}

// ==========================================
// PARALLAX EFFECT
// ==========================================
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero-content")

  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`
    hero.style.opacity = 1 - scrolled * 0.0015
  }
})

// ==========================================
// CURSOR EFFECT (OPTIONAL)
// ==========================================
let mousePosX = 0
let mousePosY = 0

document.addEventListener("mousemove", (e) => {
  mousePosX = e.clientX
  mousePosY = e.clientY
})

// ==========================================
// PAGE LOAD ANIMATION
// ==========================================
window.addEventListener("load", () => {
  document.body.style.opacity = "0"
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease"
    document.body.style.opacity = "1"
  }, 100)
})

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================
let ticking = false

function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      // Scroll-based animations handled here
      ticking = false
    })
    ticking = true
  }
}

window.addEventListener("scroll", onScroll)

// Console message
console.log(
  "%c✨ Portfolio Loaded Successfully! ✨",
  "background: linear-gradient(90deg, #00d4ff 0%, #7c3aed 100%); color: white; padding: 12px 24px; font-size: 18px; font-weight: bold; border-radius: 8px;",
)
