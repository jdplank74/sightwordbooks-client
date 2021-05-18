import {FC, useState, useRef} from 'react';
import {Image as MyImage} from '../types/Image';
import {Page} from '../types/Page';
import {Book} from '../types/Book';
import {Image} from '../types/Image';
import ImageEditor from './imageEditor';
import { BookEditorState } from '../types/BookEditorState';

type PageEditorProps = {
  page: Page;
}

const PageEditor : FC<PageEditorProps> = ({page}) => {
  let img: Image = page.image ? page.image : {}
  const [image, setImage] = useState<string>();
  
  let prose = page.prose;
  const [refresh,setRefresh] = useState<boolean>(false);
  const setSelectedImage = (name: string, imageData: string) =>
  {

    //const image: Image = {
    //  filename: name,
    //  imageBase64: imageData
    //};
    page.image = {
      filename: name,
      imageBase64: imageData
    };
    setImage(imageData);
  }
  
  const handleProseChange = (e: any) => {
     //setProse(e.target.value);
     prose = e.target.value;
  }

  const onSaveClicked = () => {
    page.prose = prose;
    page.image = img;
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
        <ImageEditor image={img} setImage={setSelectedImage} />     
      </div>
      <div>
        <input onChange={(e) => handleProseChange(e)} placeholder="Enter Prose" />
      </div>
      <div>
        <button onClick={onSaveClicked}>Save</button>
      </div>
    </div>
  );
};

export default PageEditor;