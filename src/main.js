import { parseToUrlParams } from './helpers'

const URL_AUTHORIZE = 'https://github.com/login/oauth/authorize'

class GitHubAuthentication {

	constructor(authOptions) {
		this._authOptions = authOptions
		this._popup = null
		console
	}

	execute() {
		console.log(parseToUrlParams({ nome: 'teste', age: '18' }));
	}

	_createPopup() {

	}

	_createUrl() {

	}

}

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

module.exports = GitHubAuthentication;