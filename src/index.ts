import "reflect-metadata";
import {createConnection} from "typeorm";
import {Book} from "./books/entities/book.entity";

createConnection().then(async connection => {

    console.log("Inserting a new book into the database...");
    const book = new Book();
    book.title = "Timber";
    book.date = "Saw";
    book.author = "some";
    book.description = "some";
    book.image = "some";
    await connection.manager.save(book);
    console.log("Saved a new book with id: " + book.id);

    console.log("Loading books from the database...");
    const books = await connection.manager.find(Book);
    console.log("Loaded books: ", books);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
