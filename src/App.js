import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom'
import { Home } from './pages/Home';
import { ExactPost } from './pages/ExactPost';
import Header from './components/Header';

export const App = () => {

  return (
    <div>
      <Header />
      <BrowserRouter>
          <Route path={'/'} exact component={Home}></Route>
          <Route path={'/post/:id'} exact component={ExactPost}/>
      </BrowserRouter>
    </div>
  );
}

