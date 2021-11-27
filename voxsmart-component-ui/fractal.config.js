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

fractal.web.set('server.port', 4444);
fractal.web.set('server.watch', true);

/*
 * Require the Twig adapter
 */
const twigAdapter = require('@frctl/twig')();
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
