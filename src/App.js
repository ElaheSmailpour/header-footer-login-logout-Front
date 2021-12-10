import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/header/Header"
import Home from "./pages/Home";
import Termin from "./pages/termin/Termin";
import "./app.scss"
import Footer from "./components/footer/Footer";
import Störnieren from "./pages/störnieren/Störnieren";
import MangeTermin from "./pages/admin/MangeTermin"
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Header/>
   
    <div className="app-content">
      <Switch>
      <Route path={"/login"} component={Login}></Route> 
      <Route path={"/signup"} component={Signup}></Route> 
     <Route path={"/termin"} component={Termin}></Route> 
     <Route path={"/mangeTermin"} component={MangeTermin}></Route> 
     <Route path={"/störnieren"} component={Störnieren}></Route> 
        <Route path={"/"} component={Home}></Route>
      </Switch>
    </div>
    </BrowserRouter>
    <Footer/>
     </div>

  );
}

export default App;
