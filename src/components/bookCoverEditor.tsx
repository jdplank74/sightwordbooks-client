import {FC, useState} from 'react';
import {Book} from '../types/Book';
import {Image} from '../types/Image';
import { BookEditorState } from '../types/BookEditorState';
import ImageEditor from './imageEditor';
type BookCoverEditorProps = {
  //book: Book;
  //setBook: (book: Book) => void;
  bookEditorState: BookEditorState;
}

const BookCoverEditor : FC<BookCoverEditorProps> = ({bookEditorState}) => {
  const [coverImagePath, setCoverImagePath] = useState<string>();
  //const [imageData, setImageData] = useState<string>();
  const [imageChanged, setImageChanged] = useState<boolean>(true);

  const img: Image = bookEditorState.bookToEdit.coverImage ? bookEditorState.bookToEdit.coverImage : {}
  
  const [image, setImage] = useState<Image>(img);

  const setSelectedImage = (name: string, imageData: string) =>
  {
    const image: Image = {
      filename: name,
      imageBase64: imageData
    };
    bookEditorState.bookToEdit.coverImage = image;
    setImage(image);
  }
  
  const getFilename = (filepath: string | undefined) => {
    if(filepath) {
      const lastSlashIndex = filepath.lastIndexOf("/")
      if(lastSlashIndex === filepath.length - 1)
        return "";
      
      return lastSlashIndex < 0 ? filepath : filepath.substring(lastSlashIndex+1);
    }
  };

  return (
    <div>
      <div>
        <input placeholder="Enter title" />
      </div>  
      <div>
        <input placeholder="Enter author" />
      </div>
      <div>
        <ImageEditor image={image} setImage={setSelectedImage}  />  
      </div>
    </div>
  );
};

export default BookCoverEditor;
