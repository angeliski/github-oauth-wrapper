import { stringify, parse } from 'qs'

const URL_AUTHORIZE = 'https://github.com/login/oauth/authorize'

class GitHubAuthentication {
  constructor (clientId, redirectUri, urlApiAuthentication) {
    this._clientId = clientId
    this._redirectUri = redirectUri
    this._urlApiAuthentication = urlApiAuthentication

    this._popup = null
  }

  execute () {
    return this
      ._openPopup()
      ._setFocusPopup()
      ._validateOAuthCallback()
      .then(response => {
        if (this._urlApiAuthentication) {
          return 'token....'
        }

        return response
      })
  }

  _openPopup () {
    const url = this._createUrl()
    const popupProperties = this._getPopupProperties()
    this._popup = window.open(url, 'Github Authentication', stringify(popupProperties, {
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
    if (this._popup.focus) {
      this._popup.focus()
    }

    return this
  }

  _validateOAuthCallback () {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        // TODO Tratar fechamento do popup
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
          // Log...
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

    return `${URL_AUTHORIZE}?${stringify(params)}`
  }
}

module.exports = GitHubAuthentication

/*
class GitHubAuth2 {
	constructor(clientId, callbackUrl) {
		this.githubUrl = 'https://github.com/login/oauth/authorize?'
		this.popup = null
		this.clientId = clientId
		this.callbackUrl = callbackUrl
	}
	init() {
		this.openPopup()
		this.polling()
	}
	openPopup() {
		const url = this.createUrl()

		const height = 500
		const width = 800
		const left = (window.screen.width / 2) - (width / 2)
		const top = (window.screen.height / 2) - (height / 2)
		this.popup = window.open(url, '', `width=${width}, height=${height}, left=${left}, top=${top}`)
	}
	createUrl() {
		return `${this.githubUrl}?response_type=code&client_id=${this.clientId}&redirectUri=${this.callbackUrl}&scope=user:email`
	}
	polling() {
		this.pollingInterval = setInterval(() => {
			try {
				const url = this.popup.location.href
				const currentPath = this.extractUri(url)
				if (currentPath === this.callbackUrl) {
					this.authenticateApi(url)
					this.popup.close()
					clearInterval(this.pollingInterval)
				}
			} catch (error) {
				//Ignorar o erro blocked frame
			}
		})
	}
	extractUri(url) {
		return url.split('?')[0]
	}
	extractCodeParam(url) {
		return url.split('?')[1].split('=')[1]
	}
	authenticateApi(url) {
		const code = this.extractCodeParam(url)
		axios.post('http://localhost:3001/auth/teste', {
			code
		}).then(response => {
			const $title = document.querySelector('.title')
			$title.innerHTML = `Token:${response.data.token}`
		}).catch(console.log)
	}
}
*/
