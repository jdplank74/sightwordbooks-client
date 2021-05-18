import {FC, useState} from 'react';
import './tabset.css';

type TabSetProps = {
  tabs: string[];
  setActiveTab: (tabName: string) => void;
  isActiveTab: (tabName: string) => boolean;
}

const TabSet: FC<TabSetProps> = ({tabs, setActiveTab, isActiveTab}) => {
  const getTabs = (): any[] => {
    return tabs.map<JSX.Element>(t => createTab(t));
  };

  const createTab = (tabName: string) : JSX.Element => {
    const classes = ["tab"];
    if(isActiveTab(tabName))
      classes.push("activeTab");
    const classesStr = classes.join(" ");
    return <button className={classesStr} onClick={() => onTabClick(tabName)}>{tabName}</button>
  };

  const onTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div>
      {getTabs()}
    </div>
  );
}

export default TabSet;