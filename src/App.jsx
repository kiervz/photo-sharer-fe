import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthPages, RequireAuth } from './containers';
import Content from './layouts/Content';


const Navbar = React.lazy(() => import('./layouts/Navbar'));
const Feed = React.lazy(() => import('./pages/feed/Feed'));
const CreatePost = React.lazy(() => import('./pages/post/CreatePost'));
const PostDetail = React.lazy(() => import('./pages/post/PostDetail'));
const Login = React.lazy(() => import('./pages/auth/Login'));
const Register = React.lazy(() => import('./pages/auth/Register'));
const Logout = React.lazy(() => import('./pages/auth/Logout'));
const Missing = React.lazy(() => import('./pages/missing/Missing'));
const EditPost = React.lazy(() => import('./pages/post/EditPost'));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Navbar />
        <Content>
          <Routes>
            {/* Public routes */}
            <Route element={<AuthPages />}>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Route>
            <Route path='/' element={<Feed />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/post/:id' element={<PostDetail />} />

            {/* Protect these routes  */}
            <Route element={<RequireAuth />}>
              <Route path='/create' element={<CreatePost />} />
              <Route path='/post/:id/edit' element={<EditPost />} />
            </Route>    

            {/* catch all */}
            <Route path="*" element={<Missing />} />
          </Routes>
        </Content>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
