import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { logo } from './assets';
import { Home, CreatePost } from './pages';
const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 py-4 px-4 border-b border-b-[#205ed3] ">
        <Link to="/">
          <img src={logo} alt="AI logo" className="w-28 object-contain" />
        </Link>
        <Link
          to="/create-post"
          className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
        >
          IMAGINE
        </Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#b6c1ec] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
