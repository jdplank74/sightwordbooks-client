import {FC} from 'react';
import "./tabset.css"

type TabProps = {
  tabName: string;
  isActive: boolean;
  children: any;
}

const Tab : FC<TabProps> = ({tabName, isActive, children}) => {
  let allClasses: string[] = [];
  let isActiveClass: string;
  
  if(isActive)
    isActiveClass = "activeTabDiv";
  else 
    isActiveClass = "inactiveTabDiv";

  const classes: string = [...allClasses, isActiveClass].join(" ");
  console.log(classes);

  return(
    <div className={classes}>
      {children}
    </div>
  );  
}

export default Tab;