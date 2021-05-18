import { useState } from 'react';
import {Book} from './Book';
import {Page} from './Page';

export type BookEditorState = {
  isEditing: boolean;
  pageNumber: number;
  bookToEdit: Book;
  step: string;
  enterPageMode: () => void;
  addPage: () => void;
  addPageToBook: (page: Page) => void;
  saveBook: (book: Book) => Book;
  enterEditMode: () => void;
  getCurrentPage: () => Page;
}

export const useBookEditorState = (book: Book | null) : BookEditorState => {
  if(!book)
  {
    book = {
      pages: new Array<Page>()
    }
  }

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [bookToEdit, setBookToEdit] = useState<Book>(book)
  const [step, setStep] = useState<string>("cover");
  
  const enterPageMode = () => {
    setStep("page");
    if(bookToEdit.pages.length === 0)
    {
      const page: Page = {
        number: 1
      };
      addPageToBook(page);
    }
  }
  
  const addPage = () => {
    // first get current page and save it off if 
    let pgNumber = 0;
    if(bookToEdit)
    {
      pgNumber = bookToEdit.pages.length + 1;
    }
    const page: Page = {
      number: pgNumber,
      bookId: bookToEdit.id,
    };
    addPageToBook(page);
  }

  const addPageToBook = (page: Page) => {
    if(bookToEdit && page.number)
      bookToEdit.pages[page.number-1] = page;
    setBookToEdit(bookToEdit);
    setPageNumber(page.number);
    return;
  };

  const saveBook = (book: Book) : Book => {
    console.log("Save book");
    return book;
  }

  const enterEditMode = () : void => {
      setIsEditing(true);
      const theBook: Book = {
        pages: new Array<Page>(),
      };
      setBookToEdit(theBook);
  };

  const getCurrentPage = () : Page => {
    return bookToEdit.pages[pageNumber-1];
  }

  const bookEditorState : BookEditorState = {isEditing, pageNumber, bookToEdit, step, saveBook, enterEditMode, addPageToBook, addPage, enterPageMode, getCurrentPage}
  return bookEditorState;
}
