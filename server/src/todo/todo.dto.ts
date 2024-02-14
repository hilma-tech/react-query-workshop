import { IsNotEmpty, IsString } from "class-validator";

export class TodoDTO {
  @IsString()
  @IsNotEmpty()
  newTodo: string;
}
