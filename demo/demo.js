window.addEventListener('DOMContentLoaded', () => {
  const $btn = document.querySelector('#btn-auth')
  const clientId = '29186b8e25b21408ef61'
  const urlCallback = 'http://localhost:3005/auth/callback'

  $btn.addEventListener('click', () => {
    const oAuthWrapper = new window.GithubOAuthWrapper(clientId, urlCallback)

    oAuthWrapper.execute()
      .then(response => console.log(`Access code: ${response.code}`))
      .catch(err => console.error(err))
  })
})
