window.addEventListener('DOMContentLoaded', () => {

  const $btn = document.querySelector('#github-btn-auth')

  $btn.addEventListener('click', () => {

    const githubOAuthWrapper = new GithubOAuthWrapper(
      '29186b8e25b21408ef61',
      'http://localhost:3005/auth/callback'
    )

    githubOAuthWrapper.execute()
      .then(response => {
        console.log(response)
      }).catch(err => {
        console.error(err)
      })

  })

})
