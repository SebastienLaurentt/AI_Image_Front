import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { Button } from "./components/ui/button";
import CreatePost from "./page/CreatePost";
import Home from "./page/Home";
import { Brush } from "lucide-react";

const App = () => (
  <BrowserRouter>
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <div className="flex flex-row items-center gap-x-2">
        <Brush  strokeWidth={3} />
        <span className="font-bold text-lg">PicassoAI</span>
      </div>

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
    <footer className="w-full bg-white sm:px-8 px-4 py-4 border-t border-b-[#e6ebf4]">
      <p className="text-center text-[#666e75] text-sm">
        © 2024 PicassoAI -  All rights reserved.
      </p>
    </footer>
  </BrowserRouter>
);

export default App;
