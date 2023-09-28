import "./App.css";
import "./index.css";
import { BrowserRouter, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import SignupPage from "./components/SignupPage";
import Project from "./components/Project";
import CreateNewRequest from "./components/CreateNewRequest";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Route path="/" component={LoginPage} exact></Route>
        <Route path="/signup" component={SignupPage}></Route>
        <Route path="/home" component={HomePage}></Route>
        <Route path="/project/:id" component={Project}></Route>
        <Route
          path="/createNewRequest/:id"
          component={CreateNewRequest}
        ></Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
