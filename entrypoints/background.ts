export default defineBackground(() => {
  browser.action.onClicked.addListener(() => {
    browser.windows.create({
      url: '/window.html',
      width: 800,
      height: 600,
      type: 'popup'
    })

    console.log('Hello background!', { id: browser.runtime.id });
  })
});
