
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateBookDto } from './dto/create-book.dto'
import { Book } from './entities/book.entity'

@Injectable()
export class BooksService {

  constructor(@InjectRepository(Book) private readonly bookRepository: Repository<Book>) {}

  getAll(): Promise<Book[]> {
    return this.bookRepository.find()
  }

  getById(id: string): Promise<Book> {
    return this.bookRepository.findOne(id)
  }

  create(BookDto: CreateBookDto) {
     this.bookRepository.push({
      ...BookDto,
      id: Date.now().toString()
    })
  }

  async remove(id: string): Promise<void> {
    await this.bookRepository.delete(id)
  }
}
