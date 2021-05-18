import { FC } from 'react';

type BookCoverControlProps  = {
  start: () => void;
}

const BookCoverControls: FC<BookCoverControlProps> = ({start}) => {
  return (
    <div>
      <button onClick={start}>Read</button>
    </div>
  );
}

export default BookCoverControls;
