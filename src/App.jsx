import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Content from './layouts/Content';

import Navbar from './layouts/Navbar';
import Feed from './pages/feed/Feed';
import PostDetail from './pages/post/PostDetail';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Content>
        <Routes>
          <Route path='/' element={<Feed />} />
          <Route path='/post/:id' element={<PostDetail />} />
        </Routes>
      </Content>
    </BrowserRouter>
  );
};

export default App;
