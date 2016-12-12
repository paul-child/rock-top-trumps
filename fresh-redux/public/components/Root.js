import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

// import App from './App'
import Main from './Main'
import Home from './Home'
import Users from './Users'
import Posts from './Posts'
import Albums from './Albums'
import Todos from './Todos'
import Comments from './Comments'
import Photos from './Photos'

const Root = ({ store, history }) => (
   <Provider store={store}>
      <Router history={history}>
         <Route path='/' component={Main}>
            <IndexRoute component={Home}></IndexRoute>
            <Route path='/users' component={Users}></Route>
            <Route path='/posts' component={Posts}></Route>
            <Route path='/albums' component={Albums}></Route>
            <Route path='/todos' component={Todos}></Route>
            <Route path='/comments' component={Comments}></Route>
            <Route path='/photos' component={Photos}></Route>
         </Route>
      </Router>
   </Provider>
)

Root.propTypes = {
   store: PropTypes.object.isRequired
}

export default Root;
