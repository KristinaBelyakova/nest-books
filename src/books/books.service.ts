
import { HttpException, HttpStatus, Injectable, Query } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, MoreThan, Repository } from 'typeorm'
import { CreateBookDto } from './dto/create-book.dto'
import { UpdateBookDto } from './dto/update-book.dto'
import { Book } from './entities/book.entity'

@Injectable()
export class BooksService {

  constructor(@InjectRepository(Book) private readonly bookRepository: Repository<Book>) { }

  async getAll(offset?: number, limit?: number, startId?: number, options?: FindManyOptions<Book>) {
    const where: FindManyOptions<Book>['where'] = {};
    let separateCount = 0;

    if (startId) {
      where.id = MoreThan(startId);
      separateCount = await this.bookRepository.count();
    }

    const [books, count] = await this.bookRepository.findAndCount({
      where,
      order: {
        id: 'ASC',
        title: 'DESC',
        date: 'DESC',
        author: 'DESC',
        description: 'DESC',
        image: 'DESC'
      },
      skip: offset,
      take: limit,
      ...options
    });
    // console.log(count);

    return {
      books,
      count: startId ? separateCount : count
    }
  }

  async getById(id: number): Promise<Book> {
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

  async delete(id: number) {
    const deleteResponse = await this.bookRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }
  }
}
