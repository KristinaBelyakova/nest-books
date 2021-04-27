import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  startDate: string

  @Column()
  author: string

  @Column()
  description: string

  @Column()
  image: string
}
