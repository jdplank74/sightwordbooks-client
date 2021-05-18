import {IPage} from './IPage';
import {IImage} from './IImage';

export interface IBook {
  id?: string,
  pages: IPage[],
  title: string,
  author: string,
  coverImage: IImage
}

