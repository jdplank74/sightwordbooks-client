import {Image} from './Image';

export type Page = {
  bookId?: string,
  number: number,
  image?: Image,
  prose?: string
}