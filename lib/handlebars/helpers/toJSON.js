'use strict'

const Handlebars = require('handlebars')

/** @function safe
 *
 * @param {string} inp -- the object to serialize to JSON
 *
 * @return web safe string
 *
 * @example
 * {{toJSON myObj}}
 */
Handlebars.registerHelper('toJSON', function (inp) {
  const outp = JSON.stringify(inp)
  return new Handlebars.SafeString(outp)
})
