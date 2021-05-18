import {FC, useState} from 'react';
import {useSightwordsQuery} from '../useRequest';
import {SIGHTWORDGROUPS} from '../graphql';
import {ISightword} from '../types/ISightword';
import {ISightwordGroup} from '../types/ISightwordGroup';
import './flashcard.css';
import './sightwordgroup.css';
import { groupCSS } from 'react-select/src/components/Group';
import Flashcard from './flashcard';
import { Button } from '@material-ui/core';
import {ArrowBack} from '@material-ui/icons/';
import {ArrowForward} from '@material-ui/icons/'
import { ToggleButton } from '@material-ui/lab';
import { ToggleButtonGroup } from '@material-ui/lab';
import {useTheme} from '@material-ui/core';
const Flashcards: FC = () => {
  const theme = useTheme(); 
  const {loading, error, data} = useSightwordsQuery(SIGHTWORDGROUPS);
  const [selectedGroups,setSelectedGroups] = useState<string[]>([]);
  const [sightwordList, setSightwordList] = useState<ISightword[]>([]);
  const [sightwordIndex, setSightwordIndex] = useState<number>(-1)
  let currentIndex: number = sightwordIndex;
  
  let listOfSightwords = sightwordList;

  const getClassName = (group: string) : string => {
    if(selectedGroups.find(g => g == group))
      return "selectedSightwordGroup";
    return "unselectedSightwordGroup";
  }
  
  const toggleSelectedGroup = (group: string) => {
    var groups = selectedGroups;
    // filter out if lengths are the same it was never there so add it
    const filteredGroups = groups.filter(g => g != group);
    if(groups.length == filteredGroups.length) {
      filteredGroups.push(group);
      addRemoveSightwords(group)
    }
    else {
      addRemoveSightwords(group, true)
    }
    
    setSelectedGroups(filteredGroups);
    if(sightwordList.length > 0)
      currentIndex = 0;
    else 
      currentIndex = -1;
    setSightwordIndex(currentIndex);
  }

  const handleTGChange = () => {
    console.log();
  }
  const toggleAll = (groups: string []) => {
    if(selectedGroups.length > 0) {
      setSelectedGroups([]);
      setSightwordList([]);
      return;
    }
    setSelectedGroups(groups);
    groups.forEach(g => {
      addRemoveSightwords(g)
    });
    if(listOfSightwords.length > 0)
      currentIndex = 0;
    else 
      currentIndex = -1;
    setSightwordIndex(currentIndex);
  }

  const gotoNext = () => {
    if(currentIndex < sightwordList.length)
    {
      currentIndex++;
      setSightwordIndex(currentIndex);
    }
      
  }

  const gotoPrevious = () => {
    if(currentIndex > 0) {
      currentIndex--;
      setSightwordIndex(currentIndex)
    }
  }

  if(loading)
    return <h1>loading</h1>;
  
  const allGroups: ISightwordGroup[] = data ? data : new Array<ISightwordGroup>();
  //const allGroupControl = <Button onClick={() => toggleAll(allGroups.map(g => g.name))}>All</Button>;
  //const groupControls: any[] = allGroups.map(g => <button className={getClassName(g.name)} onClick={() => toggleSelectedGroup(g.name)}>{g.name}</button>);
  const allGroupControl = <ToggleButton key={"All"} value={"All"} color="primary" onClick={() => toggleAll(allGroups.map(g => g.name))}>All</ToggleButton>;
  const groupControls: any[] = allGroups.map(g => <ToggleButton key={g.name} color="secondary" value={g.name} onClick={() => toggleSelectedGroup(g.name)}>{g.name}</ToggleButton>);

  const addRemoveSightwords = (groupName: string, shouldRemove: boolean = false) => {
    const group: ISightwordGroup | undefined = allGroups.find(grp => grp.name == groupName);
    if(group)
      group.sightwords.forEach(sw => {
        if(shouldRemove)
          listOfSightwords = listOfSightwords.filter(word => sw.word != word.word);
        else 
          listOfSightwords.push(sw);
      });

    setSightwordList(listOfSightwords);
  }


  let allControls: any[] = [allGroupControl].concat(groupControls);
  const currentSightword: ISightword | null = currentIndex >= 0 ? listOfSightwords[currentIndex] : null;

  const content = currentSightword == null ? <div style={{textAlign: 'center'}}>Select sightword groups to see flashcards</div>
    : <Flashcard word={currentSightword} gotoNext={gotoNext} gotoPrevious={gotoPrevious} />

  return (
    <div>
      <div className="fcControls">
        <ToggleButtonGroup color="theme.palette.secondary" value={selectedGroups} onChange={handleTGChange}>
          {allControls}
        </ToggleButtonGroup>
        
      </div>
      <div>
        {content}
      </div>
      <div className="fcControls">
      <ArrowBack onClick={gotoPrevious} />
      <ArrowForward onClick={gotoNext} />
      </div>
    </div>
  );
}

export default Flashcards;