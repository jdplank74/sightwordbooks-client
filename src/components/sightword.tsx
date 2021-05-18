import {FC} from 'react';
import {ISightword} from '../types/ISightword';
import './sightwordgroup.css';

type SightwordProps = {
  sightword: ISightword;
}

const Sightword : FC<SightwordProps> = ({sightword}) => {
  const onClick = (word: string) => {
    console.log(word);
  }
  return (
    <button className="sightword" onClick={() => onClick(sightword.word)}>{sightword.word}</button>
  )
}

export default Sightword;