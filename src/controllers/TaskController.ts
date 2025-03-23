import { Collection } from 'mongodb';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

interface Task{
    id: string
    text: string
    completed: boolean
}

export class TaskController {
  constructor(
        private taskCollection: Collection<Task>
  ) {}

  async addTask(req: Request, res: Response) {
    const { text } = req.body;
    console.log('task body:', { text });

    if (!text) {
      return res.status(400).send({ message: 'Missing text in task' });
    }

    const newTask: Task = {
      id: uuidv4(),
      text,
      completed: false
    };

    try {
      const result = await this.taskCollection.insertOne(newTask);
      console.log(`Task added with id: ${newTask.id} and type: ${typeof newTask.id}`);
      console.log('Insert result:', result);
      return res.status(200).send(newTask);
    } catch (err) {
      return res.status(500).send({ message: 'Internal Server Error' });
    }
  }
}
