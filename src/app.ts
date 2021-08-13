import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { router } from './routes';
import express from 'express';

async function cnn() {
	await createConnection()
};
const app = express();
cnn();
app.use(express.json());
app.use(router);
export { app };