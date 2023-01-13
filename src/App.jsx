import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Content from './layouts/Content';

import Navbar from './layouts/Navbar';
import Feed from './pages/feed/Feed';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Content>
        <Routes>
          <Route path='/' element={<Feed />} />
        </Routes>
      </Content>
    </BrowserRouter>
  );
};

export default App;
