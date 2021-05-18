import {Page} from './Page';
import {Image} from './Image';

export type Book = {
  id?: string,
  pages: Page[],
  title?: string,
  author?: string,
  coverImage?: Image
}

