import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto'
import { UpdateBookDto } from './dto/update-book.dto'

@Controller('books')
export class BooksController {

constructor(private readonly booksService: BooksService) {

}

@Get()
  getAll() {
    return this.booksService.getAll()
  }

  @Get(':id')
  getOne(@Param('id') id: string){
    return this.booksService.getById(id)
  }

  @Post()
  createOne(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto)
  }

  @Put(':id')
  updateOne(@Body() UpdateBookDto: UpdateBookDto, @Param('id') id: string) {
return 'Update ' + id
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string): string {
return 'Delete One ' + id
  }
}
