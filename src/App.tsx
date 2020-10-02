import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { FavouritesProvider, NotesProvider } from 'Contexts'

import Home from 'pages/Home'
import City from 'pages/City'
import Layout from 'components/Layout'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <NotesProvider>
          <FavouritesProvider>
            <Switch>
              <Route path="/:city" component={City} />
              <Route path="/" component={Home} exact />
            </Switch>
          </FavouritesProvider>
        </NotesProvider>
      </Layout>
    </BrowserRouter>
  )
}

export default App
