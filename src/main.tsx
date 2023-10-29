import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from "@material-tailwind/react";
import App from './App.tsx'
import './index.css'
import store from './redux/configStore';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthProvider';
import { ToastContainer } from 'react-toastify';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </ThemeProvider>
    </Provider>
  </AuthProvider>

)
