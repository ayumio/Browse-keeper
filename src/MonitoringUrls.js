/*global chrome*/

import React, { Component } from 'react'

class MonitoringUrls extends Component {

  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }

  componentDidMount(){
    const urlsWithTimeLimit = []
    const chromeLocal = chrome.storage.local
    chromeLocal.get(null, storage => {
      for (let url in storage) {
        if (storage[url].timeLimit){
          const limit = storage[url].timeLimit / 60000
          urlsWithTimeLimit.push({url: [url], timeLimit: limit})
        }
      }
      this.setState({list: urlsWithTimeLimit})
    })
  }

  render() {
    if (this.state.list.length) {
      return (
        <div>
          {
            this.state.list.map(obj =>
              <div className="url-area">
                <small>{obj.url}</small>
                <small>Time Limit: {obj.timeLimit} minutes</small>
              </div>
            )
          }
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default MonitoringUrls
