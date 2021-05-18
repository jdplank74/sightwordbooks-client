import {FC, useState} from 'react';
import { getTokenSourceMapRange } from 'typescript';
import {IBook} from '../types/IBook';
import {IPage} from '../types/IPage';
import './book.css';
import {usePagesQuery} from '../useRequest';
import {BOOKS, PAGE_BY_ID} from '../graphql';
import Page from './page';
import BookCover from './bookCover';
import PageControls from './pageControls';
import BookCoverControls from './bookCoverControls';

type BookProps = {
  book: IBook;
}
const Book: FC<BookProps> = ({book}) => {
  const format: string = "jpg";
  const [currentPage, setCurrentPage] = useState<IPage | undefined>();
  
  const id = currentPage ? currentPage.id : "";
  const {loading, error, data} = usePagesQuery(PAGE_BY_ID, id);
  
  const nextPage = () => {
    let gotoPageNumber: number = 1;
    if(!currentPage) {
      gotoPage(1);
      return;
    }
      
    if(currentPage.number < book.pages.length)
      gotoPageNumber = currentPage.number + 1;
    else
      gotoPageNumber = currentPage.number;

    gotoPage(gotoPageNumber);
  }

  const previousPage = () => {
    let gotoPageNumber: number = 1;
    if(currentPage && currentPage.number > 1) 
      gotoPageNumber = currentPage.number - 1;
    
    gotoPage(gotoPageNumber);
  }

  const gotoPage = (pageNumber: number) => {
    setCurrentPage(book.pages[pageNumber-1]);
  }

  const getImageToShow = (theBook: IBook) : string  => {
    if(currentPage == null)
      return theBook.coverImage.imageBase64;

    return currentPage.image.imageBase64;
  }

  const startBook = () => {
    gotoPage(1);
  };

  if(loading) 
    return <div className="loading">...Loading</div>
  
  const getContent = ({loading, error, data}: any) => {
    if(currentPage)
      return (<Page page={data} />);
    else 
      return (<BookCover book={book} />);
  };

  const getControls = () => {
    if(currentPage)
      return <PageControls next={nextPage} previous={previousPage} />
    else 
      return <BookCoverControls start={startBook} />
  }
  
  const content = getContent({loading, error, data});
  const controls = getControls();

  return(
    <div>
      <div className="bookTitle">
        {book.title}
      </div>
      <div className="bookContent">
        {content}        
      </div>
      <div className="bookControls">
        {controls}
      </div>
    </div>
  );
};

export default Book;