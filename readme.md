# Github OAuth Wrapper

Hi everyone! It's a simple wrapper to authenticate your app with github accounts. It'll open a new window asking to user his credentials and after authentication, you'll recive the token from the github.

## How to use
It's very very simple =P Just get your github *client ID* to user give authorization to your app and wich is the callback url to recive the token. Look that:

```javascript
window.addEventListener('DOMContentLoaded', () => {
  const $btn = document.querySelector('#btn-auth')
  const clientId = 'xxxxxxxxxxxxxxxxxxxxx' // <- your github client id
  const callbackURL = 'http://localhost/auth/callback' // <- url where you'll recive the token

  const oAuthWrapper = new window.GithubOAuthWrapper(clientId, callbackURL)

  $btn.addEventListener('click', () => {
    oAuthWrapper
      .execute()
      .then(response => console.log(`Access code: ${response.code}`))
      .catch(console.error)
  })
})
```

## How to contribute

Feel free to clone this repository and open a PR! Or open an issue for us \o/
Comments and suggestions are always welcome: D

## Authors

* **Marcos Vinicius** - *Initial work* - [vmarcosp](https://github.com/vmarcosp)
* **Marcel Zanluca** - *Initial work* - [marcellz](https://github.com/marcellz)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
