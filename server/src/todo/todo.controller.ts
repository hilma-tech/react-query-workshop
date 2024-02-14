import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common";

import { CompletedDTO } from "./completed.dto";
import { TodoDTO } from "./todo.dto";
import { TodoService } from "./todo.service";

@Controller("todos")
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  get() {
    return this.todoService.readTodos();
  }

  @Get("health")
  getHealth() {
    return {
      ok: true,
    };
  }

  @Post()
  post(@Body() body: TodoDTO) {
    return this.todoService.createTodo(body.newTodo);
  }

  @Put(":id")
  putById(@Param("id", ParseIntPipe) id: number, @Body() body: CompletedDTO) {
    return this.todoService.updateTodo(id, body.completed);
  }

  @Delete(":id")
  deleteById(@Param("id", ParseIntPipe) id: number) {
    return this.todoService.deleteTodo(id);
  }
}
