// Animated Background
const canvas = document.getElementById("animatedBackground")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const atoms = []
const atomCount = 15 // Increased from 5 to 15
const connectionDistance = 150

class Atom {
  constructor() {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.radius = Math.random() * 2 + 1
    this.speedX = (Math.random() - 0.5) * 2 // Adjusted speed range
    this.speedY = (Math.random() - 0.5) * 2 // Adjusted speed range
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)" // Updated fillStyle
    ctx.fill()
  }
}

function init() {
  for (let i = 0; i < atomCount; i++) {
    atoms.push(new Atom())
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  atoms.forEach((atom) => {
    atom.update()
    atom.draw()
  })

  // Draw connections
  ctx.strokeStyle = "rgba(255, 255, 255, 0.3)" // Updated strokeStyle
  for (let i = 0; i < atoms.length; i++) {
    for (let j = i + 1; j < atoms.length; j++) {
      const dx = atoms[i].x - atoms[j].x
      const dy = atoms[i].y - atoms[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < connectionDistance) {
        ctx.beginPath()
        ctx.moveTo(atoms[i].x, atoms[i].y)
        ctx.lineTo(atoms[j].x, atoms[j].y)
        ctx.stroke()
      }
    }
  }

  requestAnimationFrame(animate)
}

init()
animate()

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const navLinks = document.querySelector(".nav-links")

mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show")
})

// Add this to ensure the menu closes when a link is clicked
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show")
  })
})

// Product Grid
const products = [
  { id: "1", name: "Premium T-Shirt", price: 49.99, category: "tops", image: "/placeholder.svg" },
  { id: "2", name: "Designer Jeans", price: 129.99, category: "bottoms", image: "/placeholder.svg" },
  { id: "3", name: "Luxury Hoodie", price: 89.99, category: "tops", image: "/placeholder.svg" },
  { id: "4", name: "Leather Biker Jacket", price: 299.99, category: "outerwear", image: "/placeholder.svg" },
  { id: "5", name: "Elegant Evening Dress", price: 179.99, category: "dresses", image: "/placeholder.svg" },
  { id: "6", name: "Tailored Trousers", price: 109.99, category: "bottoms", image: "/placeholder.svg" },
  { id: "7", name: "Cashmere Sweater", price: 159.99, category: "tops", image: "/placeholder.svg" },
  { id: "8", name: "Silk Blouse", price: 89.99, category: "tops", image: "/placeholder.svg" },
]

const productsContainer = document.querySelector(".products-container")
const filterButtons = document.querySelectorAll(".filter-btn")

function renderProducts(products) {
  productsContainer.innerHTML = ""
  products.forEach((product) => {
    const productCard = document.createElement("div")
    productCard.classList.add("product-card", "fade-in")
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-category">${product.category}</p>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <a href="/product/${product.id}" class="check-details-btn">Check Details</a>
      </div>
    `
    productsContainer.appendChild(productCard)
  })
  fadeInOnScroll()
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter")
    filterButtons.forEach((btn) => btn.classList.remove("active"))
    button.classList.add("active")

    // Scroll the clicked button into view
    button.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })

    if (filter === "all") {
      renderProducts(products)
    } else {
      const filteredProducts = products.filter((product) => product.category === filter)
      renderProducts(filteredProducts)
    }
  })
})

// Initial render
renderProducts(products)

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    })
  })
})

// Newsletter form submission
const newsletterForm = document.getElementById("newsletterForm")
newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const email = e.target.querySelector('input[type="email"]').value
  // Here you would typically send the email to your server
  console.log(`Subscribed with email: ${email}`)
  alert("Thank you for subscribing!")
  e.target.reset()
})

// Fade-in animation for elements
function fadeInOnScroll() {
  const fadeElements = document.querySelectorAll(".fade-in")
  fadeElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const elementBottom = element.getBoundingClientRect().bottom
    if (elementTop < window.innerHeight && elementBottom > 0) {
      element.classList.add("visible")
    }
  })
}

// Initial fade-in for elements above the fold
document.addEventListener("DOMContentLoaded", () => {
  fadeInOnScroll()
})

// Fade-in effect on scroll
window.addEventListener("scroll", fadeInOnScroll)

// Fade-in animation for elements
// const fadeInElements = document.querySelectorAll(".fade-in")

// const fadeInObserver = new IntersectionObserver(
//   (entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         entry.target.classList.add("visible")
//         fadeInObserver.unobserve(entry.target)
//       }
//     })
//   },
//   {
//     threshold: 0.1,
//   },
// )

// fadeInElements.forEach((element) => {
//   fadeInObserver.observe(element)
// })

