import express, { Request, Response, NextFunction, Router } from 'express';
import uniqid from 'uniqid';
import * as bodyParser from 'body-parser';
import { ReqBodyPutCallback, ReqBodyGetCallback } from '../interfaces/reqBody';
// import { tpAPICall } from '../helpers/tp-api-call';

export const router: Router = express.Router()

router.post('/request', async(req: Request, res: Response, next: NextFunction) => {
		
	try {
		// Generate a somewhat unique shortid to include in the callback url
		const documentId: string = uniqid()

		const { body } = req;
		body.callback = `callback/${documentId}`;
		
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
		Either before or after the call to the third party API, an 
		entry should be created in the db, something along the lines
		of db.status.create() to be updated in the PUT call later.

		It was a bit unclear what was supposed to be sent back here. 
		Based on this line:
		-It will also create a unique identifer for this request we can later reference. 

		The id is being returned
		*/
		res.status(200).send(documentId);

	} catch(err) {
		res.status(500).send({ error: err })
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
		res.status(500).send({ error: err })
	}
})

router.put('/callback/:id', async(req: Request, res: Response, next: NextFunction) => {
	try {
		const body: ReqBodyPutCallback = req.body;

		let keys: string[] = [];
		const allowedKeys = ['status', 'detail'];
		let unionValue;
		const allowedVals = ['PROCESSED', 'COMPLETED', 'ERROR'];

		// Gather keys and check allowed union values
		Object.entries((body)).forEach((key, val) => {
			console.log("BODY", key)
			keys.push(key[0]);
			if(allowedVals.includes(key[1])) {
				unionValue = key[1];
			}
		})
		// Function to shallow compare arrays and check validity of included keys
		const equals = (a, b) =>
	  a.length === b.length &&
	  a.every((v, i) => v === b[i]);

		console.log(equals(keys, allowedKeys));
		console.log(unionValue)
		
		if(equals(keys, allowedKeys) && allowedVals.includes(unionValue)) {
			/*
			If the conditions are met, a call to the db should happen here to update the 
			referenced entry with the included req.params.id. Something along the lines of
			db.status.update({ where: { id: id } }, data: { update data fields here })
			Once completed, send the no-content response back.
			 */
			res.status(204).send()
		} else {
			// Send a bad request status back to the user id request is malformed
			res.status(400).send('Bad Request: Your request is malformed. Please check your input values.')
		}

	}catch(err) {
		res.status(500).send({ error: err })
	}
})

router.get('/status/:id', async(req: Request, res: Response, next: NextFunction) => {
	try {
		// Gather the id parameter from the request
		const idParam: string = req.params.id

		/*
		Here is where to call the stateful store/db to get the proper entry and return 
		the requested data. Something along the lines of db.status.findOne({ where: { id: idParam } })
		Once the value is returned, we can construct the response.
		 */
		
		const responseObject: ReqBodyGetCallback = {
			status: "COMPLETED",
			detail: "Your process has been completed.",
			body: "The body from before"
		}
		
		res.status(200).send(responseObject)
	} catch(err) {
		res.status(500).send({ error: err })
	}

})