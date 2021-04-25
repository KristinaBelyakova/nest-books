
import { HttpException, HttpStatus, Injectable, Query } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateBookDto } from './dto/create-book.dto'
import { UpdateBookDto } from './dto/update-book.dto'
import { Book } from './entities/book.entity'

@Injectable()
export class BooksService {

  constructor(@InjectRepository(Book) private readonly bookRepository: Repository<Book>) { }

  async getAll(offset?: number, limit?: number) {
    const books = await this.bookRepository.find();
    // return books;

    const [count] = await this.bookRepository.findAndCount({
      skip: offset,
      take: limit
    });
    console.log(books);
    
    return {
      books,
      count
    }
  }

  async getById(id: string): Promise<Book> {
    return this.bookRepository.findOne(id)
  }

  async create(bookDto: CreateBookDto): Promise<Book> {
    const newBook = await this.bookRepository.create(bookDto)
    await this.bookRepository.save(newBook)
    return newBook;
  }

  async update(id: number, book: UpdateBookDto) {
    await this.bookRepository.update(id, book);
    const updatedBook = await this.bookRepository.findOne(id);
    if (updatedBook) {
      return updatedBook;
    }
    throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
  }

  async delete(id: string): Promise<void> {
    await this.bookRepository.delete(id)
  }
}
