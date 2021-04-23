import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number

  @Column({default: 0})
  offset: number

  @Column()
  title: string

  @Column()
  date: string

  @Column()
  author: string

  @Column()
  description: string

  @Column()
  image: string
}
