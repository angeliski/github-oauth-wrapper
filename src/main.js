import { stringify as querify, parse } from 'qs'

const URL_AUTHORIZE = 'https://github.com/login/oauth/authorize'

class GithubOAuthWrapper {

  constructor (clientId, redirectUri) {
    this._clientId = clientId
    this._redirectUri = redirectUri
    this._popup = null
  }

  execute () {
    return this
      ._openPopup()
      ._setFocusPopup()
      ._validateOAuthCallback()
  }

  _openPopup () {
    const url = this._createUrl()
    const popupProperties = this._getPopupProperties()

    this._popup = window.open(url, 'Github Authentication', querify(popupProperties, {
      delimiter: ', '
    }))

    return this
  }

  _getPopupProperties () {
    const screen = window.screen
    const width = 500
    const height = 800
    const popupProperties = {
      width,
      height,
      top: (screen.width / 2) - (width / 2),
      left: (screen.height / 2) - (height / 2)
    }

    return popupProperties
  }

  _setFocusPopup () {
    if (this._popup.focus)
      this._popup.focus()

    return this
  }

  _validateOAuthCallback () {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        try {
          const splittedUrl = this._popup.location.href.split('?')
          const currentHost = splittedUrl[0]
          const params = splittedUrl[1]

          if (currentHost === this._redirectUri) {
            this._popup.close()
            clearInterval(interval)
            resolve(parse(params))
          }
        } catch (error) {
          console.log(error)
        }
      }, 250)
    })
  }

  _createUrl () {
    const params = {
      'response_type': 'code',
      'client_id': this._clientId,
      'redirect_uri': this._redirectUri,
      'scope': 'user:email'
    }

    return `${URL_AUTHORIZE}?${querify(params)}`
  }
}

module.exports = GithubOAuthWrapper
