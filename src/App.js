/*global chrome*/

import React, { Component } from 'react'
import MonitoringUrls from './MonitoringUrls'

const chromeLocal = chrome.storage.local

class App extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClear = this.handleClear.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    let url = event.target.url.value
    const hours = Number(event.target.hours.value)
    const minutes = Number(event.target.minutes.value)

    const timeLimit = hours * 3600000 + minutes * 60000

    const dotCom = url.indexOf('.com')
    if (dotCom > -1) {
      url = url.slice(0, dotCom + 4)

      chromeLocal.get(url, obj => {
        const urlObj = obj[url]
        if (!urlObj){
          chromeLocal.set({[url]: {timeLimit}})
        } else {
          chromeLocal.set({[url]: {...urlObj, timeLimit}})
        }
      })
    }
    document.getElementById('form').reset()
  }

  handleClear(event) {
    document.getElementById('form').reset()
  }

  render() {
    return (
      <div>
        <p className="lead-form">Let's Keep Track of Your Browsing History!</p>

        <form id="form" onSubmit={this.handleSubmit}>
          <div className="item">
            <label for="url" className="label">URL</label>
            <input className="inputs" id="url" type="url" placeholder="https://example.com" required />
          </div>

          <div className="item">
            <label  className="label">Time Limit</label>

            <input id="hours" type="number" placeholder="0" min="0" max="12" required />
            <label>
                <small>hours</small>
            </label>
            <input id="minutes" type="number" placeholder="00" step="15" min="00" max="45" required />
            <label>
                <small>minutes</small>
            </label>
          </div>

          <div className="btn-area" >
            <input type="submit" id="submitBtn" value="Add to List" />
            <input type="reset" id="clearBtn" value="Clear" onClick={this.handleClear} />
          </div>
          <MonitoringUrls />
        </form>
      </div>
    )
  }
}

export default App
