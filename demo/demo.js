window.addEventListener('DOMContentLoaded', () => {
  const clientId = '7ce460021a69ec7f56b7'
  const $btn = document.querySelector('#btn-auth')
  const urlCallback = 'http://localhost:8000'

  $btn.addEventListener('click', () => {
    const oAuthWrapper = new window.GithubOAuthWrapper(clientId, urlCallback)

    oAuthWrapper.execute()
      .then(response => console.log(`Access code: ${response.code}`))
      .catch(err => console.error(err))
  })
})
