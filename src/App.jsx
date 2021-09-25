import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ImageGallery from './components/ImageGallery/ImageGallery';
import Searchbar from './components/Searchbar/Searchbar';
import './App.css';

class App extends React.Component {
  state = {
    searchInput: '',
  };

  handleSearchbar = data => {
    this.setState({ searchInput: data });
  };

  render() {
    return (
      <div className="App">
        <Searchbar submit={this.handleSearchbar} />
        <ImageGallery searchQuery={this.state.searchInput} />
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
}

export default App;
