import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/header/Header"
import Home from "./pages/Home";
import Termin from "./pages/termin/Termin";
import "./app.scss"
import Footer from "./components/footer/Footer";
import Störnieren from "./pages/störnieren/Störnieren";
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Header/>
   
    <div className="app-content">
      <Switch>
         
     <Route path={"/termin"} component={Termin}></Route> 
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
