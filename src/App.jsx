import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ImageGallery from './components/ImageGallery/ImageGallery';
import Searchbar from './components/Searchbar/Searchbar';
import './App.css';

export default function App() {
  const [searchInput, setSearchInput] = useState('');

  return (
    <div className="App">
      <Searchbar submit={setSearchInput} />
      <ImageGallery searchQuery={searchInput} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
