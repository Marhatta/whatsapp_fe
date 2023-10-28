import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
// Pages
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  console.log({ user });
  return (
    <div className="dark">
      <Router>
        <Routes>
          login
          <Route
            exact
            path="/"
            element={token ? <Home /> : <Navigate to={"/"} />}
          />
          <Route
            exact
            path="/login"
            element={!token ? <Login /> : <Navigate to="/" />}
          />
          <Route
            exact
            path="/register"
            element={!token ? <Register /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
