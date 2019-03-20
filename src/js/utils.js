
/* Utils
–––––––––––––––––––––––––––––––––––––––––––––––––– */

/**
 * Sort by numeric - compare func for array .sort()
 * @param   {Number}  First value for comparison
 * @param   {Number}  Second value for comparison
 * @returns {Array}   The sorted array (in place)
 */

const compareNumbers = (a, b) => a - b


/**
 * Randomise an array
 * @param   {Array}   The array to shuffle
 * @returns {Array}   The shuffled array (in place)
 */

const fisherYatesShuffle = (array) => {
  let j, x 
  for (let i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = array[i]
    array[i] = array[j]
    array[j] = x
  }
  return array
}


/**
 * Helper for adding/removing css classes
 * From https://vanillajstoolkit.com/helpers/animate/
 * @param  {Node}    Element to animate
 * @param  {String}  CSS class to apply
 * @param  {Boolean} If true, apply the hide class
 */

// From https://vanillajstoolkit.com/helpers/animate/
const animateCSSHelper = function (elem, animation, hide) {

  // If there's no element or animation, do nothing
  if (!elem || !animation) return

  elem.classList.remove('hide')
  elem.classList.add(animation)
  // Detect when the animation ends
  elem.addEventListener('animationend', function endAnimation (event) {
    elem.classList.remove(animation)
    if (hide) {
      elem.classList.add('hide')
    }
    elem.removeEventListener('animationend', endAnimation, false)
  }, false)
}


/**
 * Get random integer
 * @param   {Number}  Min range
 * @param   {Number}  Max range
 * @returns {Number}  Number between min and max range
 */

const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}


/**
 * Get random decimal
 * @param   {Number}  Min range
 * @param   {Number}  Max range
 * @returns {Number}  Decimal between min and max range
 */

const getRandomDecimal = (min, max) => {
    const num = (Math.random() * (max - min) + min).toFixed(2)
    return parseFloat(num)
}


const getNestedObject = (nestedObj, pathArr) => {
  return pathArr.reduce((obj, key) =>
    (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
}




// returns multiple arrays out of a single arr
function chunk(array, size) {
  return array.reduce((chunks, item, i) => {
    if (i % size === 0) {
      chunks.push([item]);
    } else {  
      chunks[chunks.length - 1].push(item);
    }
    return chunks;
  }, []);
}








