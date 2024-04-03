import { Injectable } from '@nestjs/common';
import { Todo } from './todo.interface';
import * as fs from 'fs';

@Injectable()
export class TodoService {
  private readonly databasePath = 'todos.json';

  async findAll(): Promise<Todo[]> {
    const todos = await this.readDatabase();
    return todos;
  }

  async create(todo: Todo): Promise<Todo> {
    const todos = await this.readDatabase();
    todo.id = Date.now().toString();
    todos.push(todo);
    await this.writeDatabase(todos);
    return todo;
  }

  async update(id: string, updatedTodo: Todo): Promise<Todo> {
    const todos = await this.readDatabase();
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
      todos[todoIndex] = { ...todos[todoIndex], ...updatedTodo };
      await this.writeDatabase(todos);
      return todos[todoIndex];
    }
    return null;
  }

  async delete(id: string): Promise<void> {
    let todos = await this.readDatabase();
    todos = todos.filter(todo => todo.id !== id);
    await this.writeDatabase(todos);
  }

  private async readDatabase(): Promise<Todo[]> {
    try {
      const data = fs.readFileSync(this.databasePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  private async writeDatabase(data: Todo[]): Promise<void> {
    fs.writeFileSync(this.databasePath, JSON.stringify(data, null, 2), 'utf8');
  }
}