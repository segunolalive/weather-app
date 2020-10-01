import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { FavouritesProvider } from 'Contexts/FavouritesContext'

import Home from 'pages/Home'
import City from 'pages/City'
import Layout from 'components/Layout'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <FavouritesProvider>
          <Switch>
            <Route path="/:city" component={City} />
            <Route path="/" component={Home} exact />
          </Switch>
        </FavouritesProvider>
      </Layout>
    </BrowserRouter>
  )
}

export default App
