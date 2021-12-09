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

  document.querySelectorAll('.js-input-focus').forEach(function(el) {
    if (el.value !== '') actions.activate(el);
    if (el.placeholder) el.setAttribute("data-placeholder", el.placeholder);
    el.addEventListener('focus', function() { actions.activate(this) });
    el.addEventListener('blur', function() { actions.deactivate(this) });
  })
}
InputFocus();

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

  document.querySelectorAll('.js-select-focus').forEach(function(el) {
    el.querySelectorAll('option').forEach(function(option) {
      if (option.hasAttribute('selected')) actions.activate(el);
    });
    el.addEventListener('load', function() { actions.activate(this) });
    el.addEventListener('change', function() { actions.activate(this) });
  })
}
SelectFocus();

/**
* Tabs
*/
document.querySelectorAll('.js-tab').forEach(el => {
  el.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelectorAll('.js-tab').forEach(function(el) {
      el.classList.remove('is-active');
    });
    el.classList.add('is-active');
  });
});
