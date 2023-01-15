import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthPages, RequireAuth } from './containers';
import Content from './layouts/Content';

import Navbar from './layouts/Navbar';
import Feed from './pages/feed/Feed';
import CreatePost from './pages/post/CreatePost';
import PostDetail from './pages/post/PostDetail';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Logout from './pages/auth/Logout';
import Missing from './pages/missing/Missing';
import EditPost from './pages/post/EditPost';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Content>
        <Routes>
          {/* Public routes */}
          <Route element={<AuthPages />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
          <Route path='/logout' element={<Logout />} />
          <Route path='/post/:id' element={<PostDetail />} />

          {/* Protect these routes  */}
          <Route element={<RequireAuth />}>
            <Route path='/' element={<Feed />} />
            <Route path='/create' element={<CreatePost />} />
            <Route path='/post/:id/edit' element={<EditPost />} />
          </Route>    

          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Routes>
      </Content>
    </BrowserRouter>
  );
};

export default App;
