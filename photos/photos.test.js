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

test("inserts a new photo when correct values submitted", async function () {
    initDomFromFiles(`${__dirname}/photos.html`, `${__dirname}/photos.js`)
    const urlInput = domTesting.getByLabelText(document, "Photo URL")
    const captionInput = domTesting.getByLabelText(document, "Caption")
    const addPhotoButton = domTesting.getByRole(document, "button")
    const photoCardList = domTesting.getByRole(document, "list")
    const user = userEvent.setup()

    await user.type(urlInput, "https://picsum.photos/480")
    await user.type(captionInput, "A random photo")
    await user.click(addPhotoButton)

    expect(photoCardList).not.toBeEmptyDOMElement()
    const photoCards = domTesting.getAllByRole(photoCardList, "listitem")
    expect(photoCards).toHaveLength(1)
    const img = domTesting.getByRole(photoCards[0], "img")
    expect(img).toBeTruthy()
    expect(img).toHaveAttribute("src", "https://picsum.photos/480")
})

test("inserts multiple photo cards", async function () {
    initDomFromFiles(`${__dirname}/photos.html`, `${__dirname}/photos.js`)
    const urlInput = domTesting.getByLabelText(document, "Photo URL")
    const captionInput = domTesting.getByLabelText(document, "Caption")
    const addPhotoButton = domTesting.getByRole(document, "button")
    const photoCardList = domTesting.getByRole(document, "list")
    const user = userEvent.setup()

    await user.type(urlInput, "https://picsum.photos/480")
    await user.type(captionInput, "Caption #1")
    await user.click(addPhotoButton)

    await user.type(urlInput, "https://picsum.photos/360")
    await user.type(captionInput, "Caption #3")
    await user.click(addPhotoButton)

    expect(photoCardList).toMatchSnapshot()
})
