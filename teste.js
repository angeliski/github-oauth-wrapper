const options = { nome: 'Marcos', age: 18 }
const keys = Object.keys(options)


const allParams = keys.reduce((params, key) => {
	if (params) params += '&'
	params += `${key}=${options[key]}`
	return params;
}, '')

console.log(allParams);