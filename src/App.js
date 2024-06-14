import { Routes, Route } from 'react-router-dom';
import Search from "./components/Search";
import User from "./components/User";

function App() {
  return (
    <main>
      <div className="container">
      <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/user/:username" element={<User />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
