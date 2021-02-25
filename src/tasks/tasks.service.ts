import { Injectable } from '@nestjs/common';
import { Task } from './task.model';
import { TaskStatus } from './task-status.enum';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getTasks(filterDto: GetTasksFilterDto,): Task[] {
        let tasks = this.tasks;
        const { status, search } = filterDto;
        if (status) {
            tasks = tasks.filter(task => task.status === status)
        }

        if (search) {
            tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search))
        }
        return tasks;
    }

    getTaskById(
        id: string,
    ): Task {
        return this.tasks.find(task => task.id === id);
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task);
        return task;
    }

    deleteTask(
        id: string,
    ) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    updateTaskStatus(
        id: string,
        status: TaskStatus,
    ): Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}
