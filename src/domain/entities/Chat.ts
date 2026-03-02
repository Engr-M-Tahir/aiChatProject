import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn
} from "typeorm";

@Entity()
export class Chat {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @Column("text")
  question: string;

  @Column("text")
  answer: string;

  @Column()
  tokens: number;

  @Column({ default: false })
  isFree: boolean;

  @Column({ type: "jsonb" })
  metadata: any;

  @CreateDateColumn()
  createdAt: Date;
}