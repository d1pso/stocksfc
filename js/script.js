const accordions = document.querySelectorAll('.accordion');
const popUpButtons = document.querySelectorAll('[data-pop-up-open]');
const popUpClose = document.querySelectorAll('[data-pop-up-close]');
const allPopUps = document.querySelectorAll('[data-pop-up]');
const animItems = document.querySelectorAll('._anim-item')

// ACCORDION
accordions.forEach(function (item) {
      item.addEventListener('click', function () {
            let content = this.querySelector('.accordion__content');
            let icon = this.querySelector('.accordion__icon')

            content.classList.toggle('accordion__content--active')
            icon.classList.toggle('accordion__icon--active')
            if (content.classList.contains('accordion__content--active')) {
                  content.style.maxHeight = content.scrollHeight + 'px'
            } else {
                  content.style.maxHeight = null
            }
      })
})

// POP-UP
popUpButtons.forEach(function(item) {
      item.addEventListener('click', function() {
            const popUpId = this.dataset.popUpOpen
            const popUp = document.querySelector('#' + popUpId);
            
            popUp.classList.add('pop-up__overlay--active');

            popUp.querySelector('.pop-up__card').addEventListener('click', function(e) {
                  e.stopPropagation();
            })

            document.body.classList.add('no-scroll');
      })
})

popUpClose.forEach(function(item) {
      item.addEventListener('click', function() {
            const popUp = this.closest('.pop-up__overlay');

            popUp.classList.remove('pop-up__overlay--active');
            document.body.classList.remove('no-scroll');
      })
})

allPopUps.forEach(function(item) {
      item.addEventListener('click', function() {
            this.classList.remove('pop-up__overlay--active');
            document.body.classList.remove('no-scroll');
      })
})

// ANIMONSCROLL

if (animItems.length > 0) {
      window.addEventListener('scroll', animOnScroll);
      function animOnScroll() {
            for (let i = 0; i < animItems.length; i++) {
                  const animItem = animItems[i];
                  const animItemHeight = animItem.offsetHeight;
                  const animItemOffset = offset(animItem).top;
                  const animItemIndex = 4;

                  let animItemPoint = window.innerHeight - animItemHeight / animItemIndex;

                  if (animItemHeight > window.innerHeight) {
                        animItemPoint = window.innerHeight - window.innerHeight / animItemIndex
                  }

                  if ((window.scrollY > animItemOffset - animItemPoint) && window.scrollY < (animItemOffset + animItemHeight)) {
                        animItem.classList.add('_active');
                  } else {
                        if (!animItem.classList.contains('_anim-no-hide')) {
                              animItem.classList.remove('_active')
                        }
                  }


            }
      }
      function offset(el) {
            const rect = el.getBoundingClientRect();
                  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
      }
      setTimeout(() => {
            animOnScroll()
      }, 300)
}