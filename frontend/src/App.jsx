import { Switch, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import 'bootstrap/dist/js/bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'jquery'
import 'popper.js'

import './App.css'
import Home from './components/Home'
import New from './components/New'
import Continue from './components/Continue'
import NewSearch from './components/NewSearch'
import ShowCode from './components/ShowCode'

const App = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Switch location={location} key={location.pathname}>
        <Route path='/' exact component={Home} />
        <Route path='/new' exact component={New} />
        <Route path='/continue' exact component={Continue} />
        <Route path='/search/new' exact component={NewSearch} />
        {/* <Route path='/search/continue/:code' exact component={ContinueSearch} /> */}
        <Route path='/showLink/:code' exact component={ShowCode} />
      </Switch>
    </AnimatePresence>
  )
};

export default App;