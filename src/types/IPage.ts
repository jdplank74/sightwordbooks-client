import {IImage} from './IImage';

export interface IPage {
  id: string,
  bookId: string,
  number: number,
  image: IImage,
  prose: string
}