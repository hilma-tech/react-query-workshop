import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Repository } from "typeorm";

import { Todo } from "./todo.entity";

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepo: Repository<Todo>,
  ) {}

  async createTodo(body: string) {
    const todo = this.todoRepo.create({ body });
    const { id } = await this.todoRepo.save(todo);
    return id;
  }

  async readTodos() {
    return this.todoRepo.find({ where: { deleted: IsNull() } });
  }

  async updateTodo(id: number, completed: boolean) {
    await this.todoRepo.update({ id }, { completed });
  }

  async deleteTodo(id: number) {
    await this.todoRepo.update({ id }, { deleted: new Date() });
  }
}
