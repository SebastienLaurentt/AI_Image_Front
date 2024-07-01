import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { Brush } from "lucide-react";
import { Button } from "./components/ui/button";
import CreatePost from "./page/CreatePost";
import Home from "./page/Home";

const App = () => (
  <BrowserRouter>
    <header className="max-w-7xl mx-auto w-full flex justify-between items-center bg-white  py-4 border-b border-b-[#e6ebf4]">
      <Link to="/" className="flex flex-row items-center gap-x-1">
        <Brush strokeWidth={3} />
        <span className="font-bold text-lg">PicassoAI</span>
      </Link>

      <Button asChild>
        <Link to="/create-post">Create</Link>
      </Button>
    </header>
    <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </main>
    <footer className="flex flex-col gap-y-2 items-center w-full bg-white sm:px-8 px-4 py-4 border-t border-b-[#e6ebf4]">
      <div className="text-xl uppercase font-bold flex flex-row items-center gap-x-1">
        <Brush strokeWidth={3} />
        <span>PicassoAI</span>
      </div>
      <p className="text-sm">© 2024 - All rights reserved.</p>
    </footer>
  </BrowserRouter>
);

export default App;
