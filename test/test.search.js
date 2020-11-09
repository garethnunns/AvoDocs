const assert = require('assert')
const path = require('path')
const fs = require('fs')
const avoParse = require('../parse/avoParse')

describe("Search", () => {
  describe("Indexes exist", () => {
    avoParse.getVersions().forEach(version => {
      it(`${version.number}`, () => {
        assert(fs.existsSync(version.index),
          `[${version.lang}-${version.number}] Could not find index file: ${version.index}
          Try running build`)
      })
    })
  })


  describe("Titles", () => {
    avoParse.getVersions().forEach(version => {
      let indexFile = JSON.parse(fs.readFileSync(version.index))

      indexFile.forEach(index => {
        it(`${version.number} - ${index.filename} title`, () => {
          assert(index.title.trim(),
            `[${version.lang}-${version.number}] There doesn't seem to be a title for "${index.filename}" in the sidebar`)
        })
      })
    })
  })

  describe("Links", () => {
    avoParse.getVersions().forEach(version => {
      let indexFile = JSON.parse(fs.readFileSync(version.index))

      indexFile.forEach(index => {
        let filePath = path.join(version.dir, index.filename)
        it(`[${version.lang}-${version.number}] ${index.filename} link to ${filePath}`, () => {
          assert(fs.existsSync(filePath),
            `Could not find "${filePath}
            Linked to in "${version.number}" sidebar`)
        })
      })
    })
  })
})