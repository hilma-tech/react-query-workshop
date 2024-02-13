import { IsBoolean } from "class-validator";

export class CompletedDTO {
  @IsBoolean()
  completed: boolean;
}
