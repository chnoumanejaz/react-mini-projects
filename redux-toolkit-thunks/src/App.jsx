import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import Form from './ui/Form';
import NavBar from './ui/NavBar';
import AllPosts from './pages/AllPosts';
import Update from './pages/Update';
import Home from './pages/Home';

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route exact path="/" element={<Home />} />
            <Route path="/create" element={<Form />} />
            <Route path="/all" element={<AllPosts />} />
            <Route path="/update/:userId" element={<Update />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
