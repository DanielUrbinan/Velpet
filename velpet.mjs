/* eslint-disable prefer-const */
import EmblaCarousel from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'

// history.scrollRestoration = 'manual'
window.scrollTo(0, 0)
/* -----------Elements------------ */
/* --------------------------DESKTOP---------------- */
const dog = document.querySelector('.dog')
const cat = document.querySelector('.cat')
const city = document.querySelector('.city')
const subdog = document.querySelector('.sub-dog')
const subcat = document.querySelector('.sub-cat')
const subcity = document.querySelector('.sub-city')
const mobile = window.matchMedia('(max-width: 650px)')

const menus = [subdog, subcat, subcity]

// eslint-disable-next-line camelcase
const menu_close = () => {
  menus.forEach((mn) => {
    mn.classList.remove('appears')
  })
}
const dropdown = (trigger, menu) => {
  const openMenu = () => {
    menu.classList.add('appears')
  }
  const closeMenu = () => {
    menu.classList.remove('appears')
  }
  const toggleMenu = () => {
    menus.forEach((mn) => {
      if (mn !== menu) {
        mn.classList.remove('appears')
      }
    })
    menu.classList.toggle('appears')
  }
  const setDropdownBehavior = () => {
    // Remove previous behavior
    trigger.removeEventListener('click', toggleMenu)
    trigger.removeEventListener('mouseenter', openMenu)
    trigger.removeEventListener('mouseleave', closeMenu)
    // Reset submenu
    menu.classList.remove('appears')
    if (mobile.matches) {
      trigger.addEventListener('click', toggleMenu)
    } else {
      trigger.addEventListener('mouseenter', openMenu)
      trigger.addEventListener('mouseleave', closeMenu)
    }
  }
  // Initial configuration
  setDropdownBehavior()
  // Reconfigure when crossing 650px
  mobile.addEventListener('change', setDropdownBehavior)
}

dropdown(dog, subdog)
dropdown(cat, subcat)
dropdown(city, subcity)

/* --------------------------MOBILE---------------- */

const menuBtn = document.querySelector('.button-menu')
const category = document.querySelector('.category')
const overlay = document.querySelector('.overlay')

menuBtn.addEventListener('click', () => {
  category.classList.toggle('menu-commute')
  overlay.classList.toggle('overlay-on')
  menu_close()
})

overlay.addEventListener('click', () => {
  category.classList.remove('menu-commute')
  overlay.classList.remove('overlay-on')
  menu_close()
})

mobile.addEventListener('change', (event) => {
  console.log(event.matches)
})

/* ---------------------SLIDER-------------------- */

const sliderViewport = document.querySelector('.slider-viewport')
const circles = document.querySelectorAll('.circles')

const autoplay = Autoplay({
  delay: 7000,
  stopOnInteraction: false
})
const embla = EmblaCarousel(
  sliderViewport,
  { loop: true },
  [autoplay]
)
const updateCircles = () => {
  const index = embla.selectedScrollSnap()
  circles.forEach((circles, i) => {
    if (i === index) {
      circles.classList.add('active')
    } else circles.classList.remove('active')
  })
}
circles.forEach((circle, i) => {
  circle.addEventListener('click', () => {
    embla.scrollTo(i)
  }
  )
})
updateCircles()

embla.on('select', updateCircles)

/* -------------------------------------PRODUCTS------------------------------------- */
/* --------------List products------------------------ */
const base = import.meta.env.BASE_URL
const listProducts = [
  {
    name: 'Dog feed by Velpet',
    price: 17.30,
    image: `${base}Products/dog_feed2.png`,
    sizes: ['1.5 lbs', '3 lbs', '4.5 lbs']
  },
  {
    name: 'Cat feed by Velpet',
    price: 19.10,
    image: `${base}Products/cat_feed.jpg`,
    sizes: ['1.5 lbs', '3 lbs', '4.5 lbs']
  },
  {
    name: 'Automatic toy for cats',
    price: 14.50,
    image: `${base}Products/cat-toy.jpg`,
    sizes: ['babys', 'middle-child', 'adults']
  },
  {
    name: 'Barkies',
    price: 5.90,
    image: `${base}Products/dog-toy.jpg`,
    sizes: ['babys', 'middle-child', 'adults']
  },
  {
    name: 'Interactive ball for dogs',
    price: 19.10,
    image: `${base}Products/dog-toy2.jpg`,
    sizes: ['blue', 'gray']
  },
  {
    name: 'Slow-feeder bowl',
    price: 23.25,
    image: `${base}Products/dog-plate.jpg`,
    sizes: ['only dish', 'dish+carpet']
  },
  {
    name: 'Cat food bowl',
    price: 20.13,
    image: `${base}Products/cat-plate.jpg`,
    sizes: ['silver', 'black', 'white']
  },
  {
    name: 'Bed for dogs',
    price: 24.10,
    image: `${base}Products/dog-bed.webp`,
    sizes: ['babys', 'middle-child', 'adults']
  },
  {
    name: 'Bed for cats',
    price: 23.50,
    image: `${base}Products/cat-bed.webp`,
    sizes: ['babys', 'middle-child', 'adults']
  },
  {
    name: 'Clothe for cats',
    price: 8.20,
    image: `${base}Products/cat-clothes.webp`,
    sizes: ['babys', 'middle-child', 'adults']
  },
  {
    name: 'Clothe for dogs',
    price: 9.40,
    image: `${base}Products/dog-clothes.jpg`,
    sizes: ['babys', 'middle-child', 'adults']
  },
  {
    name: 'Cat litter',
    price: 16.60,
    image: `${base}Products/cat-litter.webp`,
    sizes: ['1 lbs', '2 lbs', '3 lbs']
  }
]
const productsContainer = document.querySelector('.products-list')
const addProducts = () => {
  listProducts.forEach((product) => {
    let sizesHTML = ''
    product.sizes.forEach((size) => {
      sizesHTML += `<button class="info">${size}</button>`
    })

    productsContainer.insertAdjacentHTML('beforeend',
`           <div class="product">
              <div class="product_img-container">
                <img class="product_img" src="${product.image}" />
              </div>
              <div class="product-information">
                <h3 class="product_name">${product.name}</h3>
                <p class="product_price">$${product.price.toFixed(2)}</p>
                <div class="product-amount">
                  ${sizesHTML}
                </div>
                <div class="product-quantity">
                  <button type="button" class="quantity-minus">-</button>
                  <span class="quantity-number">1</span>
                  <button type="button" class="quantity-plus">+</button>
                </div>
                <div class="warning-container">
                  <p class="warning">You must select a size</p>
                </div>
                <div class="submit">
                  <button type="button" class="button-submit">
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>`)
  })
}
addProducts()
/* -------------------List products ------------------- */
const quantityControls = document.querySelectorAll('.product-quantity')

quantityControls.forEach((control) => {
  const qminus = control.querySelector('.quantity-minus')
  const qplus = control.querySelector('.quantity-plus')
  const qnumber = control.querySelector('.quantity-number')

  let quantity = 1

  const updateQuantityButtons = () => {
    if (quantity === 1) {
      qminus.classList.add('soldOut')
    } else qminus.classList.remove('soldOut')

    if (quantity === 7) {
      qplus.classList.add('soldOut')
    } else qplus.classList.remove('soldOut')
  }
  updateQuantityButtons()

  qminus.addEventListener('click', () => {
    if (quantity > 1) {
      quantity--
      qnumber.textContent = quantity
      updateQuantityButtons()
    }
  })

  qplus.addEventListener('click', () => {
    if (quantity < 7) {
      quantity++
      qnumber.textContent = quantity
      updateQuantityButtons()
    }
  })
})

/* ----------------SHOPPING CAR--------------- */
/* -----CarDecoration--- */
const shoppingCar = document.querySelector('.shopping-car')
const shoppingElements = document.querySelector('.shopping_elements')
// eslint-disable-next-line no-unused-vars

const changeShoppingCar = () => {
  shoppingCar.addEventListener('click', () => {
    shoppingElements.classList.add('appears')
  })
  document.addEventListener('click', (event) => {
    if (!shoppingElements.contains(event.target) && !shoppingCar.contains(event.target)) {
      shoppingElements.classList.remove('appears')
    }
  })
}

changeShoppingCar()

/* ---car-add----   */
const add = document.querySelectorAll('.button-submit')

const products = document.querySelectorAll('.product')

products.forEach((p) => {
  const size = p.querySelectorAll('.info')
  const warning = p.querySelector('.warning')
  size.forEach((info) => {
    info.addEventListener('click', () => {
      size.forEach((sizeButton) => {
        sizeButton.classList.remove('info-selector')
      })
      info.classList.add('info-selector')
      warning.classList.remove('warning-active')
    })
  })
})

const carNumber = document.querySelector('.car-number')
let cartCount = 0
add.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.stopPropagation()
    const productCard = button.closest('.product')
    const product = productCard.querySelector('.product_name')
    const price = productCard.querySelector('.product_price')
    const extinfo = productCard.querySelector('.info-selector')
    const warning = productCard.querySelector('.warning')
    const productName = product.textContent
    const productPrice = price.textContent
    const numericPrice = Number(productPrice.replace('$', ''))
    const img = productCard.querySelector('.product_img')
    const productImg = img.src
    console.log(productImg)
    const changecarNumber = () => {
      cartCount++
      carNumber.textContent = cartCount
    }
    const resetProduct = (productCard) => {
      const selectedSize = productCard.querySelector('.info-selector')
      if (selectedSize) {
        selectedSize.classList.remove('info-selector')
      }
    }
    const showCart = () => {
      shoppingElements.classList.add('appears')
      setTimeout(() => {
        shoppingElements.classList.remove('appears')
      }, 3000)
    }

    if (extinfo === null) {
      warning.classList.add('warning-active')
    } else {
      warning.classList.remove('warning-active')
      const productExtraInfo = extinfo.textContent
      shoppingElements.insertAdjacentHTML('beforeend', `<li class="shop-element">
                <img src="${productImg}" class="shop-img" />
                <div class="shop-info">
                  <h3 class="shop-name_product">${productName}</h3>
                  <div class="shop-price-info">
                  <p class="shop-price_product" data-price="${numericPrice}">${productPrice}</p>
                  <p class="shop-extraInfo">${productExtraInfo}</p>
                  </div>
                  <div class="product-quantity">
                    <button type="button" class="quantity-minus">-</button>
                    <span class="quantity-number">1</span>
                    <button type="button" class="quantity-plus">+</button>
                  </div>
                  <button
                    class="material-symbols-outlined profile-icons shop-delete"
                  >
                    Delete
                  </button>
              </li>`)
      changecarNumber()
      resetProduct(productCard)
      showCart()
    }
  }
  )
})

shoppingElements.addEventListener('click', (event) => {
  const control = event.target.closest('.product-quantity')
  const deleteControl = event.target.closest('.shop-element')
  const multiPrice = deleteControl.querySelector('.shop-price_product')
  const originalPrice = Number(multiPrice.dataset.price)
  if (control !== null) {
    const number = control.querySelector('.quantity-number')
    let numberIncreased = Number(number.textContent)
    if (event.target.classList.contains('quantity-plus') && numberIncreased < 7) {
      numberIncreased++
      number.textContent = numberIncreased
      multiPrice.textContent = `$${(originalPrice * numberIncreased).toFixed(2)}`
    } else if (event.target.classList.contains('quantity-minus') && numberIncreased > 1) {
      numberIncreased--
      number.textContent = numberIncreased
      multiPrice.textContent = `$${(originalPrice * numberIncreased).toFixed(2)}`
    }
  } else {
    // const deleteButton = deleteControl.querySelector('.shop-delete')
    if (event.target.classList.contains('shop-delete')) {
      deleteControl.remove()
      cartCount--
      carNumber.textContent = cartCount
    }
  }
}
)

/* -------------ABOUT ME ANIMATION PART------------- */
