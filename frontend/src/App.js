import './App.css';
import Login from './component/login/login'
import SignUp from './component/signup/signup'
import 'semantic-ui-css/semantic.min.css'
import HomePage from './component/homepage/index'
import CreatePost from './component/createPosts/index'


import { Switch , Route } from 'react-router-dom'

let styles = {
  backgroundColor : '#f0f4f8',
  margin : '0px',
  padding : '0px',
  width : '80%',
  margin : 'auto'
}

function App() {
  return (

    <div className="app" >
      <Switch>
          <Route exact path="/sign-up"  component={SignUp} />         
          <Route path="/" exact component={Login} />
          <Route path="/home-page" exact component={HomePage} />
          <Route path="/create-post" exact component={CreatePost} />
      </Switch>
    </div>
  );
}

export default App;
