const axios = require('axios').default;

export const tpAPICall = async(method: string, url: string, body: any) => {
	const response: Promise | null = await axios({
		method: method,
		url: url,
		headers: {
			"Content-Type": "application/json"
		},
		data: body
	})

	// There could likely be some error handling here if the Promise was to be resolved
	// before it was returned in the .then() and .catch() methods.

	return response;
};