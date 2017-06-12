'use strict'

const Handlebars = require('handlebars')
const i18n = require('kth-node-i18n')

/** @function contentedit
 *
 * @param {string} i18nLabel
 * @param {string} editUrl
 * @param {string} lang
 * @param {string} visibility (Optional)
 *
 * @return HTML as safe string (no need to escape)
 *
 * @example
 * {{contentedit 'content_edit_label' '/path/to/edit' sv' 'public'}}
 */
Handlebars.registerHelper('contentedit', function (i18nLabel, editUrl, lang, visibility) {
  if (!i18nLabel) {
    throw new Error('[contentedit] missing first param (i18nLabel): ' + i18nLabel)
  }

  if (!editUrl) {
    throw new Error('[contentedit] missing second param (editUrl): ' + i18nLabel)
  }

  if (!lang) {
    throw new Error('[contentedit] missing third param (lang): ' + i18nLabel)
  }

  if (visibility && typeof visibility !== 'string') {
    if (arguments.length === 4) {
      visibility = undefined
    } else {
      throw new Error('[contentedit] fourth param should be a string (visibility): ' + i18nLabel)
    }
  }

  const visibilityLabel = visibility ? i18n.message('field_label_showing_' + visibility, lang) : ''

  // Render first part of breadcrumb html
  var outp = '<div class="edit-button-and-info">'
  if (visibilityLabel) {
    outp += visibilityLabel + ' | '
  }
  outp += '  <a title="' + visibilityLabel + '" href="' + editUrl + '">'
  outp += i18n.message(i18nLabel, lang)
  // Using inline SVG because icon fonts have been dropped in Bootstrap. Using **currentColor** we can style the colour of the icon
  // to match the text color.
  outp += `    <span class="icon" aria-hidden="true" style="color: currentColor"> 
<svg width="1em" height="1em" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg" style="margin-bottom: -0.125em; fill: currentColor;">
  <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z"/>
</svg>`
  outp += '    </span>'
  outp += '  </a>'
  outp += '</div>'

  return new Handlebars.SafeString(outp)
})
