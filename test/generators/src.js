var path = require('path')
var extend = require('extend')
var assert = require('yeoman-assert')
var helpers = require('yeoman-test')
var answers = require('../helpers/answers.json')

describe('mnm::src', function () {
  this.timeout(10000)

  require('../helpers/set-up-mockery')(before, after)

  describe('creationg of src with babel', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../../generators/src'))
        .inDir(path.join(__dirname, '.tmp'))
        .toPromise()
    })

    it('creates src/index.js', function () {
      assert.file('src/index.js')
    })

    it('modifies package.json scripts field', function () {
      assert.fileContent('package.json', '"lint": "standard"')
      assert.fileContent('package.json', '"clean": "rimraf dist/ && mkdirp dist/"')
      assert.fileContent('package.json', '"build": "babel src/ --out-file dist/index.js"')
      assert.fileContent('package.json', '"prebuild": "npm run clean -s && npm run lint -s"')
      assert.fileContent('package.json', '"build:watch": "babel src/ --out-file dist/index.js --watch"')
    })

    it('creates/modifies .gitignore', function () {
      assert.file('.gitignore') 
      assert.fileContent('.gitignore', 'node_modules')
      assert.fileContent('.gitignore', '/dist')
    })

    it('creates/modifies .travis.yml', function () {
      assert.file('.travis.yml')
      assert.fileContent('.travis.yml', 'script: \'npm run build\'')
    })
  })
})
