import {FC} from 'react';
import {ISightwordGroup} from '../types/ISightwordGroup';
import {ISightword} from '../types/ISightword';
import Sightword from './sightword';
import './sightwordgroup.css';

type SightwordGroupProps = {
  sightwordGroup: ISightwordGroup;
}

const SightwordGroup : FC<SightwordGroupProps> = ({sightwordGroup: {name, sightwords}}) => {
  const swList = sightwords ? sightwords : new Array<ISightword>();
  return (
    <div>
      <span>{name}</span>
      {swList.map(sw => <Sightword key={sw.id} sightword={sw} />)}
    </div>  
  );
};

export default SightwordGroup;