/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 

/* Particles init — runs after DOM ready */
(function () {
  /* Canvas fillStyle cannot read CSS custom properties, so resolve the theme tokens to
     concrete hex values at runtime (via a probe element the browser fully computes,
     including color-mix()) and feed those to particles.js. Editing the seeds in main.css
     re-themes the particles on next load.

     The bytes are read back off a 1x1 canvas rather than scraped out of the computed
     string. Only a plain colour still serialises as "rgb(r, g, b)" with 0-255 integers;
     a color-mix() comes back in whatever space it was mixed in - ours as
     "color(srgb 0.501176 0.665882 0.774118)", upstream's as "oklch(0.71 0.06 241.34)" -
     and rounding those numbers as if they were 0-255 gave #010101 and #0100f1
     respectively. That painted a third of the particles near-black on a navy hero.
     Assigning to fillStyle makes the browser convert any colour space for us. */
  function resolveHex(varName, fallback) {
    try {
      var probe = document.createElement('span');
      probe.style.cssText = 'color:var(' + varName + ',' + fallback + ');position:absolute;visibility:hidden';
      document.body.appendChild(probe);
      var computed = getComputedStyle(probe).color;
      probe.parentNode.removeChild(probe);
      if (!computed) return fallback;

      var cv = document.createElement('canvas');
      cv.width = 1;
      cv.height = 1;
      var ctx = cv.getContext('2d');
      ctx.fillStyle = '#000';
      ctx.fillStyle = computed;
      ctx.fillRect(0, 0, 1, 1);
      var d = ctx.getImageData(0, 0, 1, 1).data;
      return '#' + [d[0], d[1], d[2]].map(function (n) {
        return ('0' + n.toString(16)).slice(-2);
      }).join('');
    } catch (e) {
      return fallback;
    }
  }

  /* Set once the canvas is actually up. Without it the unconditional retry below runs a
     second particlesJS() over the same div, which leaves the first instance's canvas
     detached while its requestAnimationFrame loop keeps drawing into it - a second
     particle system's worth of work on every home page view, painting nothing. */
  var started = false;

  function init() {
    if (started) return;
    if (typeof window.particlesJS === 'undefined') return;
    var el = document.getElementById('hero-particles');
    if (!el) return;
    started = true;

    var dotColors = [
      resolveHex('--white', '#ffffff'),
      resolveHex('--accent-light', '#f9a04b'),
      resolveHex('--on-dark-pill', '#5cd1ff'),
    ];
    var linkColor = resolveHex('--primary-light', '#9fb6cc');

    window.particlesJS('hero-particles', {
      particles: {
        number: { value: 64, density: { enable: true, value_area: 900 } },
        color: { value: dotColors },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 2.6, random: true },
        line_linked: { enable: true, distance: 150, color: linkColor, opacity: 0.18, width: 1 },
        move: { enable: true, speed: 1.1, direction: 'none', out_mode: 'out' },
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'grab' }, resize: true },
        modes: { grab: { distance: 160, line_linked: { opacity: 0.35 } } },
      },
      retina_detect: true,
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  /* Retry once after a short delay in case particles.js loads after this script */
  setTimeout(init, 400);
})();
