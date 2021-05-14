// import { Injectable } from "@nestjs/common";
// import { ElasticsearchService } from '@nestjs/elasticsearch';
// import BookCountResult  from './types/bookCountBody.interface'

// @Injectable()
// export default class BooksSearchService {
//   index = 'books'

//   constructor(
//     private readonly elasticsearchService: ElasticsearchService
//   ) { }

//   async count(query: string, fields: string[]) {
//     const { body } = await this.elasticsearchService.count<BookCountResult>({
//       index: this.index,
//       body: {
//         query: {
//           multi_match: {
//             query,
//             fields
//           }
//         }
//       }
//     })
//     return body.count;
//   }
// }
