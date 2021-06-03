import { url } from 'node:inspector';
import { FC, useState } from 'react';
import defaultCoverImage from '../defaultCoverImage.png';
import {Image} from '../types/Image';
import "./imageEditor.css";

type ImageEditorProps = {
  image?: Image;
  setImage: (name: string, imageData: string) => void;
}

const ImageEditor: FC<ImageEditorProps> = ({image, setImage}) => {
  const getImageSource = (image: Image) : string => {
    if(image.imageBase64)
      return `data:image/${image.format};base64,${image.imageBase64}`;
    if(image.url)
      return image.url;
    else
      return defaultCoverImage;
  }

  const imgSrc: string = image ? getImageSource(image) : defaultCoverImage;
  
  const fileReader: FileReader = new FileReader();
  let filePickerClass = "filePickerHidden";

  const handleFilePicked = (e: any) => 
  {
    var input = e.target;
    var reader = new FileReader();
    reader.onload = function(){
      var dataURL = reader.result;
      // remove this data:image/jpeg;base64,
      if(dataURL) {
        let regex = new RegExp('^data:image\/\\w+;base64,', 'i');
        var imageBase64 = dataURL.toString().replace(regex,"");
        setImage(input.files[0].name, imageBase64);
      }
    };

    if(input.files.length > 0)
      reader.readAsDataURL(input.files[0]);
  };

  const displayFilePicker = () => {
    filePickerClass = "filePickerVisible";
    document.getElementById("imagePicker")?.click();
  };

  return (
    <div>
      <img className="imageToEdit" src={imgSrc} onClick={displayFilePicker} /> 
      <input id="imagePicker" className={filePickerClass} type="file" onChange={ (e: any) => handleFilePicked(e)} />
    </div>
  );
};

export default ImageEditor;
