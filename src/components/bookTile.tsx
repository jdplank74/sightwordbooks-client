import {FC} from 'react';
import {IBook} from '../types/IBook';
import './book.css';

type BookProps = {
  book: IBook;
  setSelectedBook: (b: IBook) => void;
}

const BookTile: FC<BookProps> = ({book, setSelectedBook}) => {
  const handleClick = (book: IBook) => {
    setSelectedBook(book);
  }

  const format = "jpg";
    return (
    <div onClick={() => handleClick(book)} className="bookTile">
      <div>
        <div className="bookTileTop">
          <img alt={book.title} className="bookTileCoverImage" src={book.coverImage.url} /> 
        </div>
      </div>
      <div className="bookTileTitle">
      {book.title}
      </div>
      <div className="author">
      {book.author} 
      </div>
    </div>
  );
}

export default BookTile;