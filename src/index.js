import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';
import App from './App';
import Login from './componentes/Login';
import Logout from './componentes/Logout';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Redirect, Route,Switch,Link} from 'react-router-dom';

function verificaAutenticacao(nextState, replace) {

    if (localStorage.getItem('auth-token') === null) {

        return <Redirect to={{pathname:'/'}}/>;
    } else {
        return <App/>
    }
}


ReactDOM.render(
    (<Router history>
        <div>
                <Switch>            
                    <Route exact path="/" component={Login}/>
                    {/* React Router V3 */}
                    {/* <Route path="/timeline" component={App} onEnter={verificaAutenticacao}/> */}
                    {/* React Router V4 */}
                    <Route path="/timeline" render={verificaAutenticacao} />
                    <Route path="/logout" component={Logout} />
                </Switch>            
        </div>
    </Router>)
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
