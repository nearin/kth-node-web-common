'use strict'

const Handlebars = require('handlebars')
const i18n = require('i18n')
/** @function breadcrumbs
 *
 * @param {array} pathList -- {url: '', label: ''}
 * @param {string} lang
 *
 * @return HTML as safe string (no need to escape)
 *
 * @example
 * {{breadcrumbs pathList lang}}
 */
module.exports = function (host, hostName, basePath) {
  Handlebars.registerHelper('breadcrumbs', function (pathList, lang) {
    if (!Array.isArray(pathList)) {
      throw new Error('[breadcrumbs] helper requires first parameter to be a list of path item objects')
    }

    var hostUrl = host ? host.replace('https://', '//').replace('http://', '//') : 'https://www.kth.se'

    // Render first part of breadcrumb html
    var outp = '<div class="breadcrumbs">'
    if (host && hostName) {
      outp += '    <a href="' + hostUrl + '">' + hostName + '</a>'
    } else {
      outp += '    <a href="' + hostUrl + '">KTH</a>'
    }

    if (basePath) {
      outp += '    <span class="separator">/</span>'
      outp += '    <a href="' + hostUrl + basePath + '">' + i18n.message('service_name', lang) + '</a>'
    }

    // Render breadcrumb entries passed in pathList
    outp += pathList.map((item) => {
      var tmp = '    <span class="separator">/</span>'
      if (item.url) {
        // Match protocol in url with protocol of page
        var tmpUrl = item.url.replace('https://', '//').replace('http://', '//')
        tmp += '    <a href="' + tmpUrl + '">' + item.label + '</a>'
      } else {
        tmp += '    <span class="breadcrumbLabel">' + item.label + '</span>'
      }
      return tmp
    }).join('\n')

    // Close breadcrumb html elements
    outp += '</div>'

    return new Handlebars.SafeString(outp)
  })
}
