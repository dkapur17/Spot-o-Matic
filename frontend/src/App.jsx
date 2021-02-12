import { BrowserRouter, Switch, Route } from 'react-router-dom'

import 'bootstrap/dist/js/bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'jquery'
import 'popper.js'

import './App.css'
import Home from './components/Home'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
      </Switch>
    </BrowserRouter>
  )
};

export default App;