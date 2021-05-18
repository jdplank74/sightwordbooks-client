import {FC} from 'react';
import {Book} from '../../types/Book';
import {BookEditorState, useBookEditorState} from '../../types/BookEditorState';
import "./bookEditorControls.css";

type BookEditorControlsProps = {
  bookEditorState: BookEditorState;
}

const BookEditorControls : FC<BookEditorControlsProps> = ({bookEditorState: {bookToEdit, step, saveBook, enterPageMode, addPage, isEditing, enterEditMode, pageNumber}}) => {  


  const newPageText = pageNumber >= bookToEdit.pages.length - 1 ? "Add Page" : "Insert Page";

  const onSubmitBook = () => {
    console.log("Save Clicked!");
  }

  const editPages = () => {
    enterPageMode();
  }
  
  if(!isEditing)
    return(<span onClick={enterEditMode}> + A New Book!</span>);
  else if(step == "cover")
  {
    return (
      <div>
        <button onClick={editPages}>Next</button>
      </div>
    );
  }
  else 
    return (
      <div className="bookEditorControlsDiv">
        <button onClick={onSubmitBook}>Save</button>
        <button onClick={addPage}>{newPageText}</button>
      </div>
    );

}

export default BookEditorControls;