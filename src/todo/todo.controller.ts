import { Controller, Get, Post, Body, Delete, Param, Put, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.interface';
import { AuthMiddleware } from 'src/auth/auth.middleware';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Post()
  @UseGuards(AuthMiddleware)
  create(@Body() todo: Todo): Promise<Todo> {
    return this.todoService.create(todo);
  }

  @Put(':id')
  @UseGuards(AuthMiddleware)
  update(@Param('id') id: string, @Body() todo: Todo): Promise<Todo> {
    return this.todoService.update(id, todo);
  }

  @Delete(':id')
  @UseGuards(AuthMiddleware)
  delete(@Param('id') id: string): Promise<void> {
    return this.todoService.delete(id);
  }
}