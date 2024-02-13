import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  body: string;

  @Column({ type: "boolean", default: false })
  completed: boolean;

  @Column({ type: "timestamp", nullable: true })
  deleted: Date | null;
}
