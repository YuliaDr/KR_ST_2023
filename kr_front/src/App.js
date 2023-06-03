import {BrowserRouter, Route, Link, Routes, Router} from "react-router-dom";
import Publication from "./Publication";
import Publications from "./Publications";
import RegForm from "./RegForm";
import AuthForm from "./AuthForm";

function App() {
  return (
      <Routes>
        {/*<Route path="/start" element={<StartPage />} ></Route>*/}
        {/*<Route path="/itunes" element={<ITunesPage />}></Route>*/}
        <Route path="/" element={<Publications />}></Route>
        <Route path="/publication/:id" element={<Publication />}></Route>
        {/*<Route path="/user/:id" element={<User />}></Route>*/}
        <Route path="/auth" element={<AuthForm />}></Route>
        <Route path="/registration" element={<RegForm />}></Route>
      </Routes>
  );
}

export default App;