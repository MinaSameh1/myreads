import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { ErrorPage, Homepage, SearchPage } from './pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/search',
    element: <SearchPage />,
    errorElement: <ErrorPage />
  }
])

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
)
