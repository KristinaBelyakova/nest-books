import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { PaginationParams } from 'src/utils/paginationParams';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto'
import { UpdateBookDto } from './dto/update-book.dto'

@Controller('books')
@UseInterceptors(ClassSerializerInterceptor)
export class BooksController {

  constructor(private readonly booksService: BooksService) { }

  @Get()
  async getAll(
    @Query('orderBy') search: string,
    @Query() { offset, limit }: PaginationParams
  ) {
    if (search) {
      return 'ok'
      // return this.booksService.searchForBooks(search, offset, limit);
    }
    return this.booksService.getAll(offset, limit)
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.booksService.getById(id)
  }

  @Post()
  createOne(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto)
  }

  @Put(':id')
  updateOne(@Body() updateBookDto: UpdateBookDto, @Param('id') id) {
    return this.booksService.update(id, updateBookDto)
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.booksService.delete(id)
  }
}
