const path = require('path')

const index = require('../../website/node_modules/markdown-spellcheck/es5/index.js')
const reportGenerator = require('../../website/node_modules/markdown-spellcheck/es5/report-generator')

const spellings = require("./spelling.json")

module.exports = function(filePath, lang) {
  const dic = path.join(path.resolve(__dirname,'../'),spellings.lang[lang].dic)

  console.log(dic)

  //set options for spelling check
  const options = {
    ignoreAcronyms: true,
    ignoreNumbers: true,
    suggestions: false,
    dictionary: {
      language: lang,
      file: dic
    }
  }

  // get all errors by checking file
  const foundErrors = index['default'].spellFile(filePath, options)

  let errors = []

  foundErrors.errors.forEach(error => {
    if(!spellings.global.includes(error.word)
      && !spellings.lang[lang].words.caseSensitive.includes(error.word)
      && !spellings.lang[lang].words.caseInsensitive.includes(error.word.toLowerCase()))
      errors.push(error.word)
  })

  return errors
}