export default defineBackground(() => {
  browser.action.onClicked.addListener(() => {
    browser.windows.create({
      url: browser.runtime.getURL('/popup.html'),
      width: 800,
      height: 600,
      type: 'popup'
    })
  })
});
