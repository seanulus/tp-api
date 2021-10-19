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

	return response;
};