import { FC } from 'react';
import { IBook } from '../types/IBook';

type BookCoverProps = {
  book: IBook;
}

const BookCover: FC<BookCoverProps> = ({book}) => {
  const format: string = "jpg";
  return (
    <div className="bookCoverPage">
      <div>
        By {book.author}
      </div>
      <img alt={book.title} className="bookCoverImage" src={book.coverImage.url} /> 
    </div>
  );
};

export default BookCover;