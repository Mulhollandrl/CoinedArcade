import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createHashRouter, RouterProvider} from "react-router-dom";
import {Provider, useSelector} from 'react-redux';
import store from './store/store';
import { Api, ApiContext } from './utils/api.js';
import { ArcadePage } from './pages/arcadePage.jsx';
import { SignUpPage } from './pages/signUpPage.jsx';
import { LoginPage } from './pages/loginPage.jsx';
import { HomePage } from './pages/homePage.jsx';
import { ProfilePage } from './pages/profilePage.jsx';

const router = createHashRouter([
  {
    path: "",
    element:  <App />,
    children: [
      {
        path: "",
        element: <HomePage />
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/sign_up",
        element: <SignUpPage />
      },
      {
        path: "/arcade",
        element: <ArcadePage />
      },
      {
        path: "/profile",
        element: <ProfilePage />
      }
    ]
  }
])


const Main = () => {
  const authToken = useSelector(state => state.application.authToken)
  const apiRef = useRef(new Api(authToken));

  useEffect(() => {
    if(apiRef.current) {
      apiRef.current.authToken = authToken;
    }
  }, [authToken])

  return (
    <ApiContext.Provider value={apiRef.current}>
      <RouterProvider router={router} />
    </ApiContext.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Main />
  </Provider>
)
