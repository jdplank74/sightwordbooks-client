import {FC, useState} from 'react';
import Book from './book';
import BookTile from './bookTile'
import SightwordSelector from './sightwordSelector';
import {IBook} from '../types/IBook';
import {IBooks} from '../types/IBooks';

import './book.css';

type LibraryProps = {
  library: IBooks;
}
const Library: FC<LibraryProps> = ({library}) => {
  const [selectedBook, setSelectedBook] = useState<IBook>();

  if(selectedBook)
    return <Book book={selectedBook} />
  else
    return(
    <div>
      <SightwordSelector />
      <div className="library">
      {library.books.map((b: IBook) => <BookTile key={b.id} book={b} setSelectedBook={setSelectedBook} />)}
    </div>
    </div>
  );
};

export default Library;
