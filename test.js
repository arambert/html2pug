import test from 'ava'
import html2pug from './src'

const html = `<!doctype html>
<html lang="en">
  <head>
    <title>Hello World!</title>
  </head>
  <body>
    <div id="content">
      <h1 class="accents">â, é, ï, õ, ù</h1>
    </header>
  </body>
</html>`

const pug = `doctype html
html(lang='en')
  head
    title Hello World!
  body
    #content
      h1.accents â, é, ï, õ, ù`

test('Pug', t => {
  const generated = html2pug(html)
  t.is(generated, pug)
})

test('Fragment', t => {
  const generated = html2pug('<h1>Hello World!</h1>', { fragment: true })
  t.falsy(generated.startsWith('html'))
})

test('Tabs', t => {
  const generated = html2pug('<div><span>Tabs!</span></div>', {
    fragment: true,
    tabs: true
  })

  const expected = 'div\n\tspan Tabs!'
  t.is(generated, expected)
})

test('Single quotes in attributes', t => {
  const generated = html2pug(
    `<i aria-label="Tests with single quotes don't fail"></i>`,
    {
      fragment: true
    }
  )

  const expected = `i(aria-label="Tests with single quotes don't fail")`
  t.is(generated, expected)
})

test('Empty attributes', t => {
  const generated = html2pug(`<span translate #templatevar>Test</span>`, {
    fragment: true
  })

  const expected = `span(translate #templatevar) Test`
  t.is(generated, expected)
})

test('Class with angular interpolation', t => {
  const generated = html2pug(
    `<span class="thing-{{ someAngular }}-id">Test</span>`,
    {
      fragment: true
    }
  )

  const expected = `span(class='thing-{{ someAngular }}-id') Test`
  t.is(generated, expected)
})

test('Id with angular interpolation', t => {
  const generated = html2pug(
    `<span id="thing-{{ someAngular }}-id">Test</span>`,
    {
      fragment: true
    }
  )

  const expected = `span(id='thing-{{ someAngular }}-id') Test`
  t.is(generated, expected)
})

test('Multiple attributes', t => {
  const generated = html2pug(`<span attr1 attr2="ok">Test</span>`, {
    fragment: true
  })

  const expected = `span(attr1 attr2='ok') Test`
  t.is(generated, expected)
})
