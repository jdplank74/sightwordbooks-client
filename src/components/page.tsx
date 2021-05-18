import {FC} from 'react';
import { IPage } from '../types/IPage';
import { IImage } from '../types/IImage';

type PageProps = {
  page: IPage;
}

const Page : FC<PageProps> = ({page}) => {
  const format = "jpg";
  return (
    <div className="pageDiv">
      <div className="bookPicture">
       {/* <img className="pageImage" src={`data:image/${format};base64,${page.image.imageBase64}`} />  */}
       <img className="pageImage" src={page.image.url} /> 
      </div>
      <div className="prose">{page.prose}</div>
      <div>{page.number}</div>
    </div>
  )
};

export default Page;