import { helper } from '@ember/component/helper';

function calculateSpeed(reference) {
  const ratio = (document.body.offsetHeight / reference);
  const speed = (0.3 + ((1 - ratio)));
  return (document.body.offsetHeight >= reference ? 1 : speed);
}

// Animation Constants
// -------------------
export const STEP = 0.15;
const REFHEIGHT = 938;
const SPEED = calculateSpeed(REFHEIGHT);

/**
 * Lax animation: opacity 1 to 0.
 * @param offset
 * @return {string}
 */
function fadeInOut(offset) {
  return `(${offset}*vh) 1, (${offset + STEP}*vh) 0 | speed=${SPEED}`;
}

/**
 * Translate element from position to the left margin of the screen.
 * @param offset
 * @return {string}
 */
function translateLeftXOut(offset) {
  return `(${offset}*vh) 0, (${offset + STEP}*vh) -vw | speed=${SPEED}`
}

/**
 * Translate element from position to the right margin of the screen.
 * @param offset
 * @return {string}
 */
function translateRightXOut(offset) {
  return `(${offset}*vh) 0, (${offset + STEP}*vh) vw | speed=${SPEED}`
}

/**
 * Lax animation: opacity 0 to 1.
 * @param offset
 * @return {string}
 */
function fadeOutIn(offset) {
  return `(${offset}*vh) 0, (${offset + STEP}*vh) 1 | speed=${SPEED}`;
}

/**
 * Lax animation: opacity 0 to 1 to 0.4.
 * @param offset
 * @param outOffset
 * @return {string}
 */
function fadeOutInSemiout(offset, outOffset = null) {
  const out = outOffset ? `, (${outOffset}*vh) 0.4, (${outOffset + STEP}*vh) 0` : '';
  return `(${offset}*vh) 0,(${offset + STEP}*vh) 1, (${offset + (STEP * 1.5)}*vh) 1, (${offset + (STEP * 2)}*vh) 0.4 ${out}| speed=${SPEED}`;
}

/**
 * Lax animation: move element from y to Y.
 * @param offset
 * @param yFrom
 * @param yTo
 * @return {string}
 */
function translateYUp(offset, yFrom, yTo) {
  return `(${offset}*vh) ${yFrom}, (${offset + STEP}*vh) ${yTo} | speed=${SPEED}`;
}

/**
 * Lax animation: move element from origin to right and then to left.
 * @param offset
 * @return {string}
 */
function translateXRightLeft(offset) {
  return `(${offset}*vh) 0, (${offset + STEP}*vh) -150px, (${offset + STEP * 3}*vh) 300px | speed=${SPEED}`;
}

function scale(offset) {
  return `(${offset}*vh) 1, (${offset + 1.3 * STEP}*vh) 1.5, (${offset + 1.6 * STEP}*vh) 1 | speed=${SPEED}`
}

/**
 * Lax animator helper. Generates different predefined lax
 * presets for easy animation management.
 * @return {string}
 * @param {Object} args
 */
function laxAnimator(args) {
  let [animation, offset, param1, param2] = args;
  switch(animation) {
    case 'fadeInOut':
      return fadeInOut(offset * STEP);
    case 'translateLeftXOut':
      return translateLeftXOut(offset * STEP);
    case 'translateRightXOut':
      return translateRightXOut(offset * STEP);
    case 'fadeOutIn':
      return fadeOutIn(offset * STEP);
    case 'fadeOutInSemiout':
      return fadeOutInSemiout(offset * STEP, param1 * STEP);
    case 'translateYUp':
      return translateYUp(offset * STEP, param1, param2);
    case 'translateXRightLeft':
      return translateXRightLeft(offset * STEP);
    case 'scale':
      return scale(offset * STEP);
  }
}

export default helper(laxAnimator);
