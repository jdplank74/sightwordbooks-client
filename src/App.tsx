import React, { useState, createContext, useContext } from 'react';
import Tab from './components/tab'
import TabSet from './components/tabset'
import Library from './components/library';
import Flashcards from './components/flashcards';
import { BOOKS } from './graphql';
import {useBooksQuery} from './useRequest';
import {IBook} from './types/IBook';
import {Book} from './types/Book';
import BookEditor from './components/bookEditor';
import ThemeContext from './themeContext';
import ThemeSelect from './components/themeSelect';
import './theme.css';
import {Button} from '@material-ui/core';
import {ThemeProvider, Theme} from '@material-ui/core';
import {purpleGreenTheme} from './myThemes';

function App() {
  const [theme,setTheme] = useState<Theme>(purpleGreenTheme);
  const [book, setBook] = useState<Book | null>(null);
  const {loading, error, data} = useBooksQuery(BOOKS);
  let library = data ? data : {books: new Array<IBook>()};
  
  const tabs: string[] = ['Library', 'Search', 'Flash Cards', 'Create'];
  const [activeTab, setActiveTab] = useState<string>("Library");
  
  function setVisibleTab(tabName: string) : void {
    setActiveTab(tabName);
  }

  const isActiveTab = (tabName: string): boolean => {
    if(activeTab === tabName)
      return true;
    return false;
  }


  return (
    <ThemeProvider theme={theme}>
      <div>
        <ThemeSelect theme={[theme, setTheme]} />
        <span>Sightword Books</span>
        <TabSet tabs={tabs} isActiveTab={isActiveTab} setActiveTab={setVisibleTab} />
        <Tab tabName={"Library"} isActive={isActiveTab("Library")} >
          <Library library={library}  />
        </Tab>
        <Tab tabName={"Search"} isActive={isActiveTab("Search")} >
          <span>Search!</span>
        </Tab>
        <Tab tabName={"Create"} isActive={isActiveTab("Create")} >
          <BookEditor book={book} />
        </Tab>
        <Tab tabName={"Flash Cards"} isActive={isActiveTab("Flash Cards")} >
          <Flashcards />
        </Tab>
        <Button color="secondary">Test Theme</Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
