import {FC, useContext, useState} from 'react';
import {purpleGreenTheme} from '../myThemes';
import {redYellowTheme} from '../myThemes';
import {Theme} from '@material-ui/core';
type ThemeSelectProps = {
  theme: any[];
}
const ThemeSelect: FC<ThemeSelectProps> = ({theme: [getTheme, setTheme]}) => {
  const theme = getTheme;
  const [showButtons, setShowButtons] = useState<boolean>(false);
  
  const toggleShowButtons = () => {
    setShowButtons(!showButtons);
  }

  const onSetTheme = (selectedTheme: Theme, name: string) => {
    console.log(name);
    setTheme(selectedTheme);
    toggleShowButtons();
  }

  if(!showButtons)
    return(
      <button onClick={toggleShowButtons}>...</button>
    );
  else
    return (
      <span>
        <button onClick={() => onSetTheme(purpleGreenTheme, "purpleGreen")}>Purple/Green</button>
        <button onClick={() => onSetTheme(redYellowTheme, "redYellow")}>Red/Yellow</button>
      </span>
    );      
}

export default ThemeSelect;