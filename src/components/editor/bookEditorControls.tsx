import {FC} from 'react';
import {Book} from '../../types/Book';
import {IBook} from '../../types/IBook';
import {BookEditorState, useBookEditorState} from '../../types/BookEditorState';
import "./bookEditorControls.css";
import {useBookMutation, useSetCoverImageMutation} from '../../useRequest';
import {CREATEBOOK, SETBOOKCOVERIMAGE} from '../../graphql';
type BookEditorControlsProps = {
  bookEditorState: BookEditorState;
}

const BookEditorControls : FC<BookEditorControlsProps> = ({bookEditorState: {bookToEdit, step, enterPageMode, addPage, isEditing, enterEditMode, pageNumber, setBookToEdit}}) => {  
  const newPageText = pageNumber >= bookToEdit.pages.length - 1 ? "Add Page" : "Insert Page";
  
  const [addBook, result] = useBookMutation(CREATEBOOK);
  const [setCoverImage, imageResult] = useSetCoverImageMutation(SETBOOKCOVERIMAGE)
  
  const onSubmitBook = () => {
    const book = {
      title: bookToEdit.title,
      author: bookToEdit.author 
    };
    addBook({ variables: { book: book}});
  }

  if(result.data)
  {
    bookToEdit.id = result.data.createBook.id;
    setBookToEdit(bookToEdit);
    if(bookToEdit.coverImage) {
      const coverImage = { 
        bookId: bookToEdit.id,
        filename: bookToEdit.coverImage.filename,
        imageBase64: bookToEdit.coverImage?.imageBase64
      }
      setCoverImage({ variables: {coverImage: coverImage}});

    }
  }

  if(imageResult.data)
  {
    if(bookToEdit.coverImage) {
      bookToEdit.coverImage.url = imageResult.data.setCoverImage.coverImage.url;
      bookToEdit.coverImage.format = imageResult.data.setCoverImage.coverImage.format;
    }
      
    setBookToEdit(bookToEdit);
  }

  const saveAndEditPages = () => {
    enterPageMode();
  }
  
  if(result.loading)
  {
    return (<h1>Saving!</h1>);
  }

  if(imageResult.loading)
  {
    return (<h1>Saving Image!</h1>);
  }

  if(!isEditing)
    return(<span onClick={enterEditMode}> + A New Book!</span>);
  else if(step == "cover")
  {
    return (
      <div>
        <button onClick={saveAndEditPages}>Next</button>
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