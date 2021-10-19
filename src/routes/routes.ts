import express, { Request, Response, NextFunction, Router } from 'express';
import shortid from 'shortid';
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
		return the appropriate string of "STARTED". 	 
		*/
	
		// const result = await tpAPICall('POST', url, body)
		// console.log(result)

		res.status(200).send('STARTED');

	} catch(err) {
		console.error(err)
	}	
	
})

router.post('/callback/:id', async(req: Request, res: Response, next: NextFunction) => {

})

router.put('/callback/:id', async(req: Request, res: Response, next: NextFunction) => {

})

router.get('status/:id', async(req: Request, res: Response, next: NextFunction) => {

})