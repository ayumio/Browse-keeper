// background.jsは、拡張機能が有効だと常に読み込まれているjs
// イベントに対するControler的な役割にすると良さそう
// アドレスバーの右側の拡張機能のアイコンをクリックした際のイベント

/*global chrome*/

const chromeLocal = chrome.storage.local

chrome.tabs.onUpdated.addListener( (tabId, info, tab) => {
  let url = tab.url
  if (url.indexOf('http') === 0){
    const dotCom = url.indexOf('.com')
    if (dotCom > -1) {
      url = url.slice(0, dotCom + 4)
    }
    chromeLocal.get(url, obj => {
      const openedAt = Date()
      const urlObj = obj[url]
      if (!urlObj){
        chromeLocal.set({[url]: {openedAt}})
      } else if (!(urlObj.hasOwnProperty('openedAt'))) {
        chromeLocal.set({[url]: {...urlObj, openedAt}})
      }
    })
  }
})

// const activeUrls = {}
// chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
//   let url = tab.url
//   const dotCom = url.indexOf('.com')
//   if (dotCom > -1) {
//     url = url.slice(0, dotCom + 4)
//   }
//   activeUrls[tabId] = url
// })

// chrome.tabs.onRemoved.addListener(tabId => {
//   chromeLocal.get(null, storage => {
//     console.log('before remove', storage)
//   })
//   // const url = activeUrls[tabId]
//   // chromeLocal.remove(url)
//   chromeLocal.clear()
//   chromeLocal.get(null, storage => {
//     console.log('after remove', storage)
//   })
// })
