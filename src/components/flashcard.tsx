import { getApolloContext } from '@apollo/client';
import {FC} from 'react';
import {ISightword} from '../types/ISightword';
import './flashcard.css';

type FlashcardProps = {
  word: ISightword;
  gotoNext: () => void;
  gotoPrevious: () => void;
}

const Flashcard: FC<FlashcardProps> = ({word, gotoNext, gotoPrevious}) => {
  return (
    <div>
      <div className="flashcardSpacer"></div>
      <div className="flashcard">
        <h1>{word.word}</h1>
      </div>
      <div className="flashcardSpacer"></div>
    </div>
  );
}

export default Flashcard;
