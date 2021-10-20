require('isomorphic-fetch');
const shortid = require('shortid');

describe('Test suite to ensure endpoints are functional', () => {
		
		let id = '';
		let status = ''
		let detail = ''
		let body = 'The body from before'


	it('should ensure that fetch is working', async() => {
		const result = await fetch('https://jsonplaceholder.typicode.com/posts/1')
	    .then(res => res.json())
	    .then((res) => {
	      return res;
	    });

	    expect(result.title).toBe('sunt aut facere repellat provident occaecati excepturi optio reprehenderit')
	    expect(result.id).toBe(1)
		
	});

	it('should hit the /request POST endpoint and return a string/id', async() => {
		const result = await fetch('http://localhost:8000/request', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				body: body
			})
		})
    .then(res => res.text())
    .then((res) => {
    	id = res;
      return res;
    });

    expect(typeof result).toBe('string')
    expect(shortid.isValid(id)).toBe(true)
		
	})

	it('should hit the /callback/:id POST endpoint and return a 204', async() => {
		const result = await fetch(`http://localhost:8000/callback/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'text/plain'
			},
			body: 'STARTED'
		})
    .then((res) => {
      return res;
    });

    expect(result.status).toBe(204)
    expect(result.statusText).toBe('No Content')
		
	})

	it('should hit the /callback/:id PUT endpoint with correct formatting and return a 204', async() => {
		const result = await fetch(`http://localhost:8000/callback/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				status: "PROCESSED",
				detail: "Your request is being processed."
			})
		})
    .then((res) => {
      return res;
    });

    expect(result.status).toBe(204)
    expect(result.statusText).toBe('No Content')
		
	})

	it('should hit the /callback/:id PUT endpoint with incorrect formatting and return a 400', async() => {
		const result = await fetch(`http://localhost:8000/callback/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				status: "IN PROGRESS",
				detail: "Your request is being processed."
			})
		})
    .then((res) => {
    	console.log(res)
      return res;
    });

    expect(result.status).toBe(400)
    expect(result.statusText).toBe('Bad Request')
		
	})

	it('should hit the /status/:id GET endpoint and return a status update', async() => {
		const result = await fetch(`http://localhost:8000/status/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
    .then((res) => {
      return res;
    });

    expect(result.status).toBe('COMPLETED')
    expect(result.detail).toBe('Your process has been completed.')
    expect(result.body).toBe('The body from before')
		
	})
})
