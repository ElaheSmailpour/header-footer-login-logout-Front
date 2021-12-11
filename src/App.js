import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Home from "./pages/Home";
import Footer from "./components/footer/Footer"
import "./app.scss"
import Header from "./components/header/Header";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Header/>
   
    <div className="app-content">
      <Switch>
     
        <Route path={"/"} component={Home}></Route>
      </Switch>
    </div>
    </BrowserRouter>
    <Footer/>
     </div>

  );
}

export default App;
