const JSDOM = require("jsdom").JSDOM

const dom = new JSDOM("<!DOCTYPE html><p id='hello'>Hello world!</p>")

console.log(dom.serialize())

// window
// document

const p = dom.window.document.getElementById("hello")
console.log("== p:", p)
