import './style.css'

const slideBtns = document.querySelectorAll('[data-slideBtn]')
const slideContainer = document.querySelector('[data-slideContainer]')
const slidePrev = document.querySelector('#prev')
const slideNext = document.querySelector('#next')
const slides = [...document.querySelectorAll('[data-slide]')]

let currentIndex = 0
let isMoving = false

//buttom handle function
function handleSlidebtnClick(e) {
  if (isMoving) return
  isMoving = true
  e.currentTarget.id === 'prev' ? currentIndex-- : currentIndex++
  slideContainer.dispatchEvent(new Event('sliderMove'))
}

const removeDisabledAttribute = (els) =>
  els.forEach((el) => el.removeAttribute('disabled'))

const enableDisableAttribute = (els) =>
  els.forEach((el) => el.setAttribute('disabled', 'true'))
//event listeners
slideBtns.forEach((btn) => btn.addEventListener('click', handleSlidebtnClick))

//
slideContainer.addEventListener('sliderMove', () => {
  //1.Translate container
  slideContainer.style.transform =
    'translateX( ' + -currentIndex * slides[0].clientWidth + 'px)'

  //2 remove disabled
  removeDisabledAttribute(slideBtns)
  //3 renavle disabled
  currentIndex === 0 && enableDisableAttribute([slideBtns[0]])
  //
})
//Transition end Event
slideContainer.addEventListener('transitionend', () => (isMoving = false))
//disable img drag
document
  .querySelectorAll('[data-slide] img')
  .forEach((img) => (img.ondragstart = () => false))

//Intersection observer
const slideObserver = new IntersectionObserver(
  (slide) => {
    if(slide[0].isIntersecting){
      enableDisableAttribute([slideBtns[1]])
    }
  },
  { threshold: 0.75 },
)
slideObserver.observe(slides[slides.length - 1])
