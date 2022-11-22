import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Content } from './containers/Content/Content';
import { ContentDetails } from './containers/ContentDetails/ContentDetails';
import { Search } from './components/Search/Search';

export const App = () => {
  return (
    <BrowserRouter>
    <header>
      <Search />
    </header>
      <main>
        <Routes>
            <Route path='/content' element={ <Content /> } />
            <Route path='/content/:contentId' element={ <ContentDetails /> } />
        </Routes> 
      </main>
    </BrowserRouter>
  )
}
