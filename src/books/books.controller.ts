import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, Req, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaginationParams } from './../utils/paginationParams';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto'
import { UpdateBookDto } from './dto/update-book.dto'

@Controller('books')
@UseInterceptors(ClassSerializerInterceptor)
export class BooksController {

  constructor(private readonly booksService: BooksService) { }

  @Get()
  async getAll(
    // @Query('orderBy') sort: boolean,
    @Query() { offset, limit, startId }: PaginationParams
  ) {
    // if (sort) {
    //   return this.booksService.getAll()
    // }
    return this.booksService.getAll(offset, limit, startId)
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.booksService.getById(id)
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createOne(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto)
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateOne(@Body() updateBookDto: UpdateBookDto, @Param('id') id) {
    return this.booksService.update(id, updateBookDto)
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.booksService.delete(id)
  }
}
