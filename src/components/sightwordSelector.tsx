import {FC} from 'react';
import {ISightwordGroup} from '../types/ISightwordGroup';
import { useSightwordsQuery } from '../useRequest'
import { SIGHTWORDGROUPS } from '../graphql';
import SightwordGroup from './sightwordgroup';

type SightwordSelectorProps = {
}

const SightwordSelector : FC<SightwordSelectorProps> = () => {
  const {loading, error, data} = useSightwordsQuery(SIGHTWORDGROUPS);
  const sightwordGroups : ISightwordGroup[] = data ? data : new Array<ISightwordGroup>();

  if(loading) 
  return <div className="loading">...Loading</div>
  
  return (
    <div>
      {sightwordGroups.map(sg => <SightwordGroup key={sg.id} sightwordGroup={sg} />)}
    </div>
  );
}

export default SightwordSelector;