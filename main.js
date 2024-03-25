(function (e) {
    'function' != typeof e.matches &&
      (e.matches =
        e.msMatchesSelector ||
        e.mozMatchesSelector ||
        e.webkitMatchesSelector ||
        function (e) {
          for (
            var t = this,
              o = (t.document || t.ownerDocument).querySelectorAll(e),
              n = 0;
            o[n] && o[n] !== t;
  
          )
            ++n;
          return Boolean(o[n]);
        }),
      'function' != typeof e.closest &&
        (e.closest = function (e) {
          for (var t = this; t && 1 === t.nodeType; ) {
            if (t.matches(e)) return t;
            t = t.parentNode;
          }
          return null;
        });
  })(window.Element.prototype);
  
  document.addEventListener('DOMContentLoaded', function () {
    var modalButtons = document.querySelectorAll('.js-open-modal'),
      overlay = document.querySelector('.js-overlay-modal'),
      closeButtons = document.querySelectorAll('.js-modal-close');
  
    modalButtons.forEach(function (item) {
      item.addEventListener('click', function (e) {
        e.preventDefault();
  
        var modalId = this.getAttribute('data-modal'),
          modalElem = document.querySelector(
            '.modal[data-modal="' + modalId + '"]'
          );
  
        modalElem.classList.add('active');
        overlay.classList.add('active');
      });
    });
  
    closeButtons.forEach(function (item) {
      item.addEventListener('click', function (e) {
        var parentModal = this.closest('.modal');
  
        parentModal.classList.remove('active');
        overlay.classList.remove('active');
      });
    });
  
    document.body.addEventListener(
      'keyup',
      function (e) {
        var key = e.keyCode;
  
        if (key == 27) {
          document.querySelector('.modal.active').classList.remove('active');
          document.querySelector('.js-overlay-modal.active').classList.remove('active');
        }
      },
      false
    );
  
    overlay.addEventListener('click', function () {
      document.querySelector('.modal.active').classList.remove('active');
      this.classList.remove('active');
    });
  });
  
  (() => {
    const mobileMenu = document.querySelector('.js-menu-container');
    const openMenuBtn = document.querySelector('.js-open-menu');
    const closeMenuBtn = document.querySelector('.js-close-menu');
  
    const toggleMenu = () => {
      const isMenuOpen =
        openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
      openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
      mobileMenu.classList.toggle('is-open');
  
      const scrollLockMethod = !isMenuOpen
        ? 'disableBodyScroll'
        : 'enableBodyScroll';
      bodyScrollLock[scrollLockMethod](document.body);
    };
  
    openMenuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);
  
    window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
      if (!e.matches) return;
      mobileMenu.classList.remove('is-open');
      openMenuBtn.setAttribute('aria-expanded', false);
      bodyScrollLock.enableBodyScroll(document.body);
    });
  })();
  
  new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    effect: 'coverflow',
    slidesPerView: 'auto'
  });
  
  const goTopBtn = document.querySelector(".scroll-up");
  
  goTopBtn.addEventListener("click", goTop);
  window.addEventListener("scroll", trackScroll);
  
  function trackScroll() {
    const offset = window.scrollY;
    const coords = document.documentElement.clientHeight;
    if (offset > coords) {
        goTopBtn.classList.add("scroll-up-show");
    } else {
       goTopBtn.classList.remove("scroll-up-show"); 
    }
  };
  
  function goTop() {
    if (window.scrollY > 0) {
        window.scrollBy(0, -75);
        setTimeout(goTop, 0);
    }
  };
