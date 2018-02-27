window.addEventListener('DOMContentLoaded', () => {
  const $btn = document.querySelector('#btn-auth')
  const clientId = 'your-client-id'
  const urlCallback = 'http://your-authorization-callback-url'

  $btn.addEventListener('click', () => {
    const oAuthWrapper = new window.GithubOAuthWrapper(clientId, urlCallback)

    oAuthWrapper.execute()
      .then(response => console.log(`Access code: ${response.code}`))
      .catch(err => console.error(err))
  })
})
