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
* Form - Select2 Change Value
*/
var Select2Update = function() {
  // click event for smart search dropdown item
  document.addEventListener('click', function (event) {
    if (!event.target.matches('.select2-selection input')) return;
    var containerEl = getClosest(event.target, '.select2-container');
    var dropdownEl = containerEl.querySelector('.select2-dropdown');

    // toggle the dropdown
    if(dropdownEl.classList.contains('is-vishidden')) {
      dropdownEl.classList.remove('is-vishidden');
    } else {
      dropdownEl.classList.add('is-vishidden');
    }
  }, false);

  // click event for normal dropdown item
  document.addEventListener('click', function (event) {
    if (!event.target.matches('.select2-selection')) return;
    var dropdownEl = event.target.nextElementSibling;

    // toggle the dropdown
    if(dropdownEl.classList.contains('is-vishidden')) {
      dropdownEl.classList.remove('is-vishidden');
    } else {
      dropdownEl.classList.add('is-vishidden');
    }
  }, false);

  document.addEventListener('click', function (event) {
    if (!event.target.matches('.select2-results__option')) return;
    var selectEl = document.getElementById(event.target.getAttribute('aria-controls'));
    var containerEl = getClosest(event.target, '.select2-container');
    var dropdownEl = getClosest(event.target, '.select2-dropdown');
    var renderedSel = containerEl.querySelector('.select2-selection__rendered');

    // Remove active class from any siblings
    containerEl.querySelectorAll('.select2-results__option').forEach(function(el) {
      el.classList.remove('is-active');
    });

    // Add active class to selected element
    event.target.classList.add('is-active');

    // update the displayed selection
    if(containerEl.classList.contains('js-smart-search')) {
      renderedSel.querySelector('input').value = event.target.textContent;
    } else {
      renderedSel.textContent = event.target.textContent;
    }

    // update the value of the (visually hidden) select element
    selectEl.value = event.target.dataset.value;

    // hide the dropdown
    dropdownEl.classList.add('is-vishidden');
  }, false);
}
if (document.querySelector('.js-select2')) {
  Select2Update();
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

/**
* Get Closest - helper function
*/
var getClosest = function (elem, selector) {
  if (!Element.prototype.matches) {
    Element.prototype.matches =
    Element.prototype.matchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector ||
    Element.prototype.oMatchesSelector ||
    Element.prototype.webkitMatchesSelector ||
    function(s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
        i = matches.length;
      while (--i >= 0 && matches.item(i) !== this) {}
      return i > -1;
    };
  }
  for ( ; elem && elem !== document; elem = elem.parentNode ) {
    if ( elem.matches( selector ) ) return elem;
  }
  return null;
};