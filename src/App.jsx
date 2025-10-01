import { Route, Routes } from "react-router-dom";
{/*import DocsPage from "@/pages/docs";*/}
import Main from "@/pages/main.jsx";
import Login from "./pages/login";


function App() {
  return (
    <Routes>
      <Route element={<Login/>} path="/" />
      <Route element={<Main />} path="/charts" />
    </Routes>
  );
}

export default App;
