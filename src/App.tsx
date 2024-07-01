import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import logo from "./assets/logo.svg";
import { Button } from "./components/ui/button";
import CreatePost from "./page/CreatePost";
import Home from "./page/Home";

const App = () => (
  <BrowserRouter>
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <Link to="/">
        <img src={logo} alt="logo" className="w-28 object-contain" />
      </Link>

      <Button asChild>
        <Link
          to="/create-post"
        >
          Create
        </Link>
      </Button>
    </header>
    <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;
