import {FC, useState, useContext} from 'react';
import { JsxElement, nodeModuleNameResolver } from 'typescript';
import {Book} from '../types/Book';
import {IBook} from '../types/IBook';
import {Page} from '../types/Page';
import {IPage} from '../types/IPage';
import BookCoverEditor from './bookCoverEditor';
import PageEditor from './pageEditor';
import BookEditorControls from './editor/bookEditorControls';
import ThemeContext from '../themeContext';
import { isContext } from 'node:vm';
import {useBookEditorState, BookEditorState} from '../types/BookEditorState';

type BookEditorProps = {
  book: Book | null;
}

const BookEditor: FC<BookEditorProps> = ({book}) => {
  const theme: string = useContext(ThemeContext);

  const bookEditorState = useBookEditorState(book);
    
  const getContent = () : any => {
    let retContent: any = undefined;
    if(!bookEditorState.isEditing)
      retContent = <h1>Create a New Book!</h1>
    else if(bookEditorState.step === "cover") 
      retContent = <BookCoverEditor bookEditorState={bookEditorState} />;
    else if(bookEditorState.step === "page")
      retContent = <PageEditor page={bookEditorState.getCurrentPage()} />;
    return retContent;
  }

  let content: any = getContent();
  
  return (
    <div>
      <div>
        Create a book
      </div>
      <div>
      {content}
      </div>
      <div>
        <BookEditorControls bookEditorState={bookEditorState} />
      </div>
   </div>
  );
}

export default BookEditor;