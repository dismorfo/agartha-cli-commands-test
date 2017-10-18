'use strict'

const WhoDoILove = class {
  get command () {
    return 'whodoilove'
  }
  get alias () {
    return 'wdil'
  }
  get description () {
    return 'Who I love'
  }
  get options () {
    return []
  }
  get onInit () {
    return true
  }
  action () {
    const agartha = process.agartha
    try {
      agartha._.each([
        'Jennifer Ann Sawaya', 
        'Diala Alina Ortiz-Sawaya'
      ], (love) => {
        agartha.log(love, 'Alberto loves')
      })
    } catch (e) {
      agartha.exit(e)
    }
  }
}

module.exports = exports = WhoDoILove
