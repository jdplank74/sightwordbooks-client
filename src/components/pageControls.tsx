import { FC } from 'react';

type PageControlProps  = {
  next: () => void;
  previous: () => void;
}

const PageControls: FC<PageControlProps> = ({next, previous}) => {
  return (
    <div>
      <button onClick={previous}>&lt;&lt;</button>
      <button onClick={next}>&gt;&gt;</button>
    </div>
  );
}

export default PageControls;