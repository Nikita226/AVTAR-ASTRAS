import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from './Main/Main'
import Login from './Login/Login'
import SignUp from './SignUp/SignUp'
import CreateInstance from './CreateInstance/CreateInstance'
import AllInstances from './AllInstances/AllInstances'
import Instance from './Instance/Instance'

function App() {
  return (
    <div className="App">
       <Router>
        <Switch>
          <Route exact path="/" component={Main}></Route>
          <Route exact path="/login" component={Login}></Route>
          
          <Route exact path="/signup" component={SignUp}></Route>
          <Route exact path="/createInstance" component={CreateInstance}></Route>
          <Route exact path="/AllInstances" component={AllInstances}></Route>
          <Route exact path="/Instance/:id" component={Instance}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
