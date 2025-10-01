import { Route, Routes } from "react-router-dom";
{/*import DocsPage from "@/pages/docs";*/}
import Main from "@/pages/main.jsx";


function App() {
  return (
    <Routes>
      <Route element={<Main/>} path="/" />
      {/*<Route element={<DocsPage />} path="/docs" />*/}
    </Routes>
  );
}

export default App;
