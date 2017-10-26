
export const parseToUrlParams = (options) => {
	const keys = Object.keys(options)

	const allParams = keys.reduce((params, key) => {
		if (params) params += '&'

		params += `${key}=${encodeURIComponent(options[key])}`

		return params;
	}, '')

	return allParams
}