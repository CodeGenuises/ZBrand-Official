// Sample product data (replace with actual data fetching logic)
const product = {
    id: "1",
    name: "Premium T-Shirt",
    price: 49.99,
    category: "tops",
    image: "/placeholder.svg",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Blue", "Red"],
  }
  
  // DOM elements
  const productImage = document.getElementById("productImage")
  const productName = document.getElementById("productName")
  const productCategory = document.getElementById("productCategory")
  const productPrice = document.getElementById("productPrice")
  const sizeOptions = document.getElementById("sizeOptions")
  const colorOptions = document.getElementById("colorOptions")
  const addToCartBtn = document.getElementById("addToCartBtn")
  
  // Populate product details
  productImage.src = product.image
  productImage.alt = product.name
  productName.textContent = product.name
  productCategory.textContent = product.category
  productPrice.textContent = `$${product.price.toFixed(2)}`
  
  // Create size options
  product.sizes.forEach((size) => {
    const button = document.createElement("button")
    button.textContent = size
    button.classList.add("option-btn")
    button.addEventListener("click", () => selectOption("size", size))
    sizeOptions.appendChild(button)
  })
  
  // Create color options
  product.colors.forEach((color) => {
    const button = document.createElement("button")
    button.textContent = color
    button.classList.add("option-btn")
    button.style.backgroundColor = color.toLowerCase()
    button.style.color = color.toLowerCase() === "white" ? "black" : "white"
    button.addEventListener("click", () => selectOption("color", color))
    colorOptions.appendChild(button)
  })
  
  // Selected options
  let selectedSize = ""
  let selectedColor = ""
  
  // Function to handle option selection
  function selectOption(type, value) {
    if (type === "size") {
      selectedSize = value
      updateOptionButtons(sizeOptions, value)
    } else if (type === "color") {
      selectedColor = value
      updateOptionButtons(colorOptions, value)
    }
  }
  
  // Function to update option button styles
  function updateOptionButtons(container, selectedValue) {
    container.querySelectorAll(".option-btn").forEach((btn) => {
      if (btn.textContent === selectedValue) {
        btn.classList.add("selected")
      } else {
        btn.classList.remove("selected")
      }
    })
  }
  
  // Add to cart functionality
  addToCartBtn.addEventListener("click", () => {
    if (selectedSize && selectedColor) {
      alert(`Added to cart: ${product.name} - Size: ${selectedSize}, Color: ${selectedColor}`)
      // Here you would typically update the cart state and possibly send data to a server
    } else {
      alert("Please select both size and color before adding to cart.")
    }
  })
  
  