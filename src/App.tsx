import React, { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { FavouritesProvider } from 'Contexts/FavouritesContext'

import Home from 'pages/Home'
import City from 'pages/City'

function App() {

  return (
    <BrowserRouter>
      <FavouritesProvider>
        <Switch>
          <Route path="/:city" component={City} />
          <Route path="/" component={Home} exact />
        </Switch>
      </FavouritesProvider>
    </BrowserRouter>
  )
}

export default App
