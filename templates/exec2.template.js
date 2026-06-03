function text(root, selector) {
   const el = selector ? root.querySelector(selector) : root

   return el?.textContent?.trim() ?? ''
}

function attr(root, selector, attr) {
  const el = selector ? root.querySelector(selector) : root

  return el?.getAttribute(attr) ?? ''
}

function price(value) {
  const cleaned = value.replace(/[^\d.,-]/g, "");
  const normalized = cleaned.replace(/,/g, "");

  const result = Number(normalized);

  return Number.isNaN(result)
    ? null
    : result;
}

function absoluteUrl(baseUrl) {
  return new URL(window.location.href, baseUrl).href
}

function query(selector) {
  return document.querySelector(selector)
}

function queryAll(selector) {
  return document.querySelectorAll(selector)
}

const field = (name) => cfg.fields.find((f) => f.name === name)

const fieldById = (id) => cfg.fields.find((f) => f.id === id)

return scrape(cfg)
