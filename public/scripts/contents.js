// "content_scripts"で指定したcontents.jsは、"matches"で合致したURLで、実行されるJavaScript
// 通常では、JavaScriptでCSSやHTMLのDOMを操作することに使用する

/*global chrome*/

const chromeLocal = chrome.storage.local
const url = 'https://' + document.domain

chromeLocal.get(null, storage => {
  console.log('Current Storage ===>', storage)
})

let convertedDate
let timeLimit
chromeLocal.get(url, obj => {
  const urlObj = obj[url]
  convertedDate = Date.parse(urlObj.openedAt)
  if (urlObj.timeLimit) timeLimit = urlObj.timeLimit
})

const check = () => {
  const now = new Date()
  const totalTime = now - convertedDate
  if (timeLimit) {
    if (timeLimit - totalTime <= 630000 && timeLimit - totalTime >= 570000) {
      console.log(totalTime)
      alert('Remaining Time: 10 min')
    } else if (timeLimit - totalTime <= 330000 && timeLimit - totalTime >= 270000){
      console.log(totalTime)
      alert('Remaining Time: 5 min')
    } else if (totalTime >= timeLimit) {
      console.log(totalTime)
      alert('Exceeded the timeLimit: Take a break!')
    }
  } else if (totalTime >= 60000) {
    console.log(totalTime)
    alert('3 hours has passed... Take a break!')
  }
  console.log(totalTime)
}
setInterval(check, 30000)

