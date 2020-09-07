import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from 'pages/Home'
import City from 'pages/City'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/city" component={City} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
