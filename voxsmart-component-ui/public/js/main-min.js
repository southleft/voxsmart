var InputFocus=function(){var t=function(t){t.parentNode.classList.add("is-active"),t.getAttribute("data-hint")?t.placeholder=t.getAttribute("data-hint"):t.placeholder=""},e=function(t){""===t.value&&t.parentNode.classList.remove("is-active"),t.getAttribute("data-placeholder")&&(t.placeholder=t.getAttribute("data-placeholder"))};document.querySelectorAll(".js-input-focus").forEach(function(c){""!==c.value&&t(c),c.placeholder&&c.setAttribute("data-placeholder",c.placeholder),c.addEventListener("focus",function(){t(this)}),c.addEventListener("blur",function(){e(this)})})};InputFocus();var SelectFocus=function(){var t=function(t){t.parentNode.classList.add("is-active")};document.querySelectorAll(".js-select-focus").forEach(function(e){e.querySelectorAll("option").forEach(function(c){c.hasAttribute("selected")&&t(e)}),e.addEventListener("load",function(){t(this)}),e.addEventListener("change",function(){t(this)})})};SelectFocus();