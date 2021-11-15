import React from 'react';
import Header from './components/header/header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Books } from './pages/books';
import { BookDetails } from './pages/book-details';
import ErrorHandler from './components/error-handler/error-handler';

function App() {
  return(
<ErrorHandler>
<Router>
  <Header />
  <Routes>
    <Route path="/" element={<Books />} />
    <Route path="book-details/:bookid" element={<BookDetails />} /> 
  </Routes>
</Router>
</ErrorHandler>
  )
}

export default App;
