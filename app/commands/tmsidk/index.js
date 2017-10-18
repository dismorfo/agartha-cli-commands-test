'use strict'

const TellMeSomethingIDontKnow = class {
  get command () {
    return 'tmsidk'
  }
  get alias () {
    return ''
  }
  get description () {
    return 'Stream podcast "Tell Me Something I Don\'t Know"'
  }
  get options () {
    return []
  }
  get onInit () {
    return false
  }
  action () {
    const agartha = process.agartha
    try {
      const feed = 'http://rss.art19.com/tell-me-something-i-don-t-know'
      agartha.request(feed, (error, response, body) => {
        if (response.statusCode) {
          agartha.read.xml(body, function (err, result) {
            const lame = require('lame')
            const Speaker = require('audio-speaker/stream')
            const decoder = new lame.Decoder()          
            const data = result.rss.channel[0].item[0]
            const url = data.enclosure[0].$.url
            agartha.request(url).pipe(decoder).on('format', function (format) {
              agartha.log('Episode ' + data['itunes:episode'] + ' - ' + data.title, 'Now playing')
              this.pipe(new Speaker(format))
            })
          })
        }
      })      
    } catch (e) {
      agartha.exit(e)
    }
  }
}

module.exports = exports = TellMeSomethingIDontKnow
