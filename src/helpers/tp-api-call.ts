const axios = require('axios').default;

export const tpAPICall = async(method: string, url: string, body: any) => {
	// Would likely change from <any> here to something type safe depending on the situation
	const response: Promise<any> = await axios({
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