import express from 'express';
import { routes } from './routes';

import cors from 'cors';
import { resolve } from 'path';
import { bucket, storageRef } from './firebase/config';

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(resolve(__dirname, '..', 'uploads')));

app.use(routes);

app.listen(3333, () => console.log('Server is running 🔥'));
