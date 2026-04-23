/**
 * @jest-environment jsdom
 */

const fs = require("fs")

require("@testing-library/jest-dom")
const domTesting = require("@testing-library/dom")
const userEvent = require("@testing-library/user-event").default

function initDomFromFiles(htmlPath, jsPath) {
    const html = fs.readFileSync(htmlPath, 'utf8')
    document.open()
    document.write(html)
    document.close()
    jest.isolateModules(function () {
        require(jsPath)
    })
}

test("counter incements when clicked", async function () {
    initDomFromFiles(`${__dirname}/counter.html`, `${__dirname}/counter.js`)
    const counter = domTesting.getByText(document, "0")
    const user = userEvent.setup()

    await user.click(counter)

    expect(counter).toHaveTextContent("1")
})

test("counter incements when clicked v2", async function () {
    initDomFromFiles(`${__dirname}/counter.html`, `${__dirname}/counter.js`)
    const counter = domTesting.getByRole(document, "button")
    const user = userEvent.setup()

    await user.click(counter)

    expect(counter).toHaveTextContent("1")
})
