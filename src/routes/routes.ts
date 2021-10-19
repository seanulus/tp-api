import express, { Request, Response, NextFunction, Router } from 'express';
import shortid from 'shortid';
import * as bodyParser from 'body-parser';
// import { tpAPICall } from '../helpers/tp-api-call';

export const router: Router = express.Router()

router.post('/request', async(req: Request, res: Response, next: NextFunction) => {
		
	try {
		// Generate a somewhat unique shortid to include in the callback url
		const documentId: string = shortid.generate()

		const { body } = req
		body.callback = `callback/${documentId}`
		
		const url: string = 'http://example.com/request';

		/* 
		This is where you would pass in your arguments for the API call to the third party API.
		I've added a helper method to cut down on repeated code in the case of multiple calls
		to this service. Assuming the call is successful, we would be able to log the result and
		return the appropriate response.

		There are likely some additional credentials that would need to be passed along with this
		request, such as Authorization header/s, or a token to verify that we are indeed allowed 
		to access their services. 	 
		*/
	
		// const result = await tpAPICall('POST', url, body)
		// console.log(result)

		/* 
		It was a bit unclear what was supposed to be sent back here. 
		The callback is needed later for the GET call 
		*/
		res.status(200).send(body.callback);

	} catch(err) {
		console.error(err)
	}	
	
})

router.post('/callback/:id', async(req: Request, res: Response, next: NextFunction) => {
	
	try {
		if(req.body == 'STARTED' && (typeof req.body == 'string')) {
			res.status(204).send()
		} else {
			res.status(500).send({ error: 'Something went wrong with this request.'})
		}
	} catch(err) {
		console.error(err);
	}
})

router.put('/callback/:id', async(req: Request, res: Response, next: NextFunction) => {
	try {

		res.status(204).send()
	}catch(err) {

	}
})

router.get('status/:id', async(req: Request, res: Response, next: NextFunction) => {

})