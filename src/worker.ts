chrome.action.onClicked.addListener(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const active = tabs[0]

        if (active.id) {
            chrome.tabs.sendMessage(active.id, {name: 'UI'}).catch(() => {
                chrome.action.setBadgeText({
                    tabId: active.id,
                    text: 'Oops'
                }, () => {
                    chrome.action.setBadgeBackgroundColor({
                        tabId: active.id,
                        color: '#a83131'
                    }, () => {
                        chrome.action.setBadgeTextColor({
                            tabId: active.id,
                            color: '#f1f3f4'
                        })
                    })
                })

                console.log('An error has occured! Try to refresh the page to see if that works.')
            })
        }
    })
})

chrome.runtime.onMessage.addListener((message, sender, responce) => {
    if (message.name == 'ElmBtnClick') {
        if (sender.tab && sender.tab.id) {
            chrome.tabs.sendMessage(sender.tab.id, { name: 'ElmBtnInvoke', color: message.color })
            responce()
        }
    }

    if (message.name == 'SelectionCanceled') {
        if (sender.tab && sender.tab.id) {
            chrome.tabs.sendMessage(sender.tab.id, { name: 'CancelSelection' })
            responce()
        }
    }

    if (message.name == 'PassElemForView') {
        if (sender.tab && sender.tab.id) {
            chrome.tabs.sendMessage(sender.tab.id, { name: 'DataIncoming', data: message.data })
            responce()
        }
    }
})