import Create from "./pages/Create";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Update from "./pages/Update";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/create" element={<Create />}></Route>
        <Route path="/update/:id" element={<Update />}></Route>
        <Route path="/delete/:id" element={<Update />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
