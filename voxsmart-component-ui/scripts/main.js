/**
* Form - Input Focus
*/
var InputFocus = function() {
  var actions = {
    activate: function(el) {
      el.parentNode.classList.add('is-active');
      if (el.getAttribute("data-hint")) {
        el.placeholder = el.getAttribute("data-hint");
      } else {
        el.placeholder = '';
      }
    },
    deactivate: function(el) {
      if (el.value === '') el.parentNode.classList.remove('is-active');
      if (el.getAttribute("data-placeholder")) el.placeholder = el.getAttribute("data-placeholder");
    }
  };

  document.querySelectorAll('.js-input-focus').forEach(el => {
    if (el.value !== '') actions.activate(el);
    if (el.placeholder) el.setAttribute("data-placeholder", el.placeholder);
    el.addEventListener('focus', function() { actions.activate(this) });
    el.addEventListener('blur', function() { actions.deactivate(this) });
  });
}
if (document.querySelector('.js-input-focus')) {
  InputFocus();
}

/**
* Form - Select Focus
*/
var SelectFocus = function() {
  var actions = {
    activate: function(el) {
      el.parentNode.classList.add('is-active');
    },
    deactivate: function(el) {
      if (el.value === '') el.parentNode.classList.remove('is-active');
    }
  };

  document.querySelectorAll('.js-select-focus').forEach(el => {
    el.querySelectorAll('option').forEach(option => {
      if (option.hasAttribute('selected')) actions.activate(el);
    });
    el.addEventListener('load', function() { actions.activate(this) });
    el.addEventListener('change', function() { actions.activate(this) });
  });
}
if (document.querySelector('.js-select-focus')) {
  SelectFocus();
}

/**
* Tabs
*/
if (document.querySelector('.js-tab')) {
  document.querySelectorAll('.js-tab').forEach(el => {
    el.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelectorAll('.js-tab').forEach(function(el) {
        el.classList.remove('is-active');
      });
      el.classList.add('is-active');
    });
  });
}

/**
 * toggleClasses()
 *
 * @description
 * toggle specific classes based on data-attr of clicked element
 *
 * @requires
 * 'js-toggle' class and a data-attr with the element to be
 * toggled's class name both applied to the clicked element
 *
 * @example
 * <span class="js-toggle" data-toggled="toggled-class">Toggler</span>
 * <div class="toggled-class">This element's class will be toggled</div>
 *
 * @param {Element} element - element to toggle.
 */
function toggleClasses(element) {
  const togglePrefix = element.dataset.prefix || 'this';
  let toggled = null;

  // If the element you need toggled is relative to the toggle, add the
  // .js-this class to the parent element and "this" to the data-toggled attr.
  if (element.dataset.toggled == "this") {
    toggled = [...element.closest('.js-this')];
  }
  else {
    toggled = [...document.querySelectorAll(element.dataset.toggled)];
  }
  if (element.getAttribute('aria-expanded') == 'true') {
    element.setAttribute('aria-expanded', 'true');
  }
  else {
    element.setAttribute('aria-expanded', 'false');
  }
  element.classList.toggle(togglePrefix + '-is-active');

  if (toggled && toggled.length) {
    toggled.forEach((el) => {
      el.classList.toggle(togglePrefix + '-is-active');
    })
  }

  // Remove a class on another element, if needed.
  if (element.dataset.removeClass) {
    document.querySelector('.' + element.dataset.removeClass).classList.remove(element.dataset.removeClass);
  }
}

function setUtilities(parentEl) {
  // Toggle class
  [...parentEl.querySelectorAll('.js-toggle:not(.js-toggle--initialized)')].forEach((el) => {
    el.classList.add('js-toggle--initialized');
    el.addEventListener('click', (e) => {
      if (!el.classList.contains('js-not-stop')) {
        e.preventDefault();
        e.stopPropagation();
      }
      toggleClasses(el);
    });
  });

  // Toggle parent class
  [...parentEl.querySelectorAll('.js-toggle-parent:not(.js-toggle-parent--initialized)')].forEach((el) => {
    el.classList.add('js-toggle-parent--initialized');
    el.addEventListener('click', (e) => {
      if (!el.classList.contains('js-not-stop')) {
        e.preventDefault();
      }
      el.classList.toggle('this-is-active');
      el.parentElement.classList.toggle('this-is-active');
    });
  });
}

setUtilities(document);
