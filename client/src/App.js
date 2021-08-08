import React, {useState, useEffect} from 'react'
import { BrowserRouter } from 'react-router-dom'
import MainRouter from './MainRouter'
import {listByUser} from './apis/cart'


import {AppContext} from './Context'
import auth from './auth/auth-helper'

function App() {
  const jwt = auth.isAuthenticated()
  const [isAuthenticated, userHasAuthenticated] = useState(auth.isAuthenticated());
  const [itemTotal, setItemTotal] = useState(0)

  useEffect(() => {
    if(auth.isAuthenticated())
      listByUser(auth.isAuthenticated().user._id, {t: jwt.token}).then((data) => {
        setItemTotal(data.length)
      })
  }, [])
  
  return (
    <div className="App">
      <BrowserRouter>
        <AppContext.Provider value={{ itemTotal, setItemTotal, isAuthenticated, userHasAuthenticated }}>
          <MainRouter/>
        </AppContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
