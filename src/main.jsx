import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import Store from './Redux/Store.js'



ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Provider store={Store}>
        <App />
        <Toaster />
    </Provider>
)
