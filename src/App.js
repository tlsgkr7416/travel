import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './components/login/login';
import Membership from './components/membership/membership';
import Navbar from './components/navbar/navbar';
import MainItem from './components/mainItem/mainItem';
import MyInformation from './components/myInformation/myInformation';
import Picture from './components/picture/picture';
import Menu from './components/menu/menu'; 
import MainReply from './components/mainReply/mainReply'
import Home from './components/home/home';
import Mypage from './components/mypage/mypage'


function App() {
  
  return (
    <div className="App">
       <Switch>
         <Route path='/membership' component={Membership} />
         <Route path='/login' component={Login} />
         <Route path='/picture' component={Picture} />
         <Route exact path='/' component={Home} />
         <Route path='/mypage' component={Mypage} /> 
       </Switch>
    </div>
  );
}

export default App;
