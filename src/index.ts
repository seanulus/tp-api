import express, { Request, Response, NextFunction, Express } from 'express';
import * as bodyParser from 'body-parser';
import { router } from './routes/routes';

// Instantiate the express server
const app: Express = express();
const port: number = 8000;

// Ensure we have the proper parsing for requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text({type:"*/*"}));

// Basic logging to check incoming requests
app.use((req: Request, res: Response, next: NextFunction) => {
	console.log("============= req.headers ===============");
  console.log(req.headers);
  console.log("============= req.body ===============");
  console.log(req.body);
  console.log("==============================");
  next();
});
// Add routes to the main application
app.use('/', router)
app.use('*', (req, res) => {
	res.status(404).send("Error 404: PAGE NOT FOUND")
})

// Start the server on port 8000
app.listen(port, () => console.log(`App is listening on port ${port}`));