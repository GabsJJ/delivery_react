import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Cadastro from "./pages/Cadastro/Cadastro";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
