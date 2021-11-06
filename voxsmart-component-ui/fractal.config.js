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
 * Tell Fractal where to look for components.
 */
fractal.components.set('path', path.join(__dirname, 'components'));

/*
 * Tell Fractal where to look for documentation pages.
 */
fractal.docs.set('path', path.join(__dirname, 'docs'));

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
