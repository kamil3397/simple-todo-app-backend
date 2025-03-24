import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import { TaskController } from './controllers/TaskController';

const run = async() => {
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());

  console.log('[Mongo] Connecting to MongoDB...');
  const mongoClient = await new MongoClient(process.env.MONGO_URL!).connect();
  console.log('[Mongo] Connected');

  const database = mongoClient.db();

  const taskController = new TaskController(database.collection('tasks'));

  app.post('/tasks/add', async(req, res) => await taskController.addTask(req, res));

  app.delete('/task/:id/delete', async(req, res) => await taskController.deleteTask(req, res));

  app.listen(process.env.PORT, () => { console.log('info', `Server running on port ${process.env.PORT}`); });

};
run();
