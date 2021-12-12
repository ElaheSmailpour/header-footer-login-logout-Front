import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import React from "react"
import Home from "./pages/Home";
import Footer from "./components/footer/Footer"
import "./app.scss"
import Header from "./components/header/Header";
import Signup from "./pages/signup/Signup"
import Login from "./pages/login/Login";
import Contact from "./pages/contact/Contact"
import  Admin from "./pages/admin/Admin"
function App() {

  return (
    <div className="App">
    <BrowserRouter>
    <Header/>
   
    <div className="app-content">
      <Switch>
      <PrivateRoute path={"/admin"} component={Admin}></PrivateRoute>
      <Route path={"/contact"} component={Contact}></Route>
      <Route path={"/login"} component={Login}></Route>
      <Route path={"/signup"} component={Signup}></Route>
        <Route path={"/"} component={Home}></Route>
      </Switch>
    </div>
    </BrowserRouter>
    <Footer/>
     </div>

  );
}

export default App;
const isAuth = () => !!localStorage.getItem("loginToken");
const PrivateRoute = ({component,path}) => {
    return <Route path={path} render={() => {
      // wenn token ist da , bestimmte component rendern
        if (isAuth())
            return React.createElement(component)
        else return <Redirect to={"/login"}/>
    }}/>
}

//für login username ist : reza und password ist : reza