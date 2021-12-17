'use strict';

/*
* Require the path module
*/
const path = require('path');

/*
 * Require the Fractal module
 */
const fractal = module.exports = require('@frctl/fractal').create();

/*
 * Give your project a title.
 */
fractal.set('project.title', 'VoxSmart Component Library');

/*
 * Tell Fractal where to look for documentation pages.
 */
fractal.docs.set('path', path.join(__dirname, 'docs'));

/*
 * Tell Fractal where to look for components.
 */
fractal.components.set('path', path.join(__dirname, 'components'));

/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set('static.path', path.join(__dirname, 'public'));

fractal.web.set('builder.dest', path.join(__dirname, 'export'));

fractal.web.set('server.port', 3333);
fractal.web.set('server.watch', true);

/*
 * Require the Twig adapter
 */
const twigAdapter = require('@frctl/twig')({
  functions: {
    bem: function(base, element, modifiers, extras) {
      var modifier = '';
      var extra = '';
      if (element) {
        var base = base + '__' + element;
      }
      if (modifiers) {
        if (Array.isArray(modifiers)) {
          for (var modifier_item of modifiers.values()) {
            modifier += ' ' + base + '--' + modifier_item;
          }
        } else {
          modifier += ' ' + base + '--' + modifiers;
        }
      }
      if (extras) {
        if (Array.isArray(extras)) {
          for (var extra_item of extras.values()) {
            extra += ' ' + extra_item;
          }
        } else {
          extra += ' ' + extras;
        }
      }
      return base + modifier + extra;
    },
    attributes: function(attributes) {
      var attribute = '';
      if (attributes) {
        for (var key in attributes) {
          if (key != '_keys') {
            attribute += ' ' + key + '="' + attributes[key] + '"';
          }
        }
      }
      return attribute;
    }
  }
});
fractal.components.engine(twigAdapter);
fractal.components.set('ext', '.twig');

const mandelbrot = require('@frctl/mandelbrot');

/*
 * Theme
 */
fractal.web.theme(
  mandelbrot({
    skin: {
      name: 'default',
      accent: '#252525',
      complement: '#FFFFFF',
      links: '#1E90FF',
    },
    information: [
      {
        label: 'Version',
        value: require('./package.json').version,
      },
      {
        label: 'Built on',
        value: new Date(),
        type: 'time',
        format: (value) => {
          return value.toLocaleDateString('en');
        },
      },
    ],
    format: 'json',
    favicon: '/images/favicon.ico',
    styles: [
      'default',
      '/css/voxsmart-theme.css',
    ],
  })
);
