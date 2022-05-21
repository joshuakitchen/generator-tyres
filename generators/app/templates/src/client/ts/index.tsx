import React from 'react'
import { createRoot } from 'react-dom/client'
import { Routes, Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

const root = createRoot(document.getElementById('react-container'))

const MyFirstPage = function MyFirstPage() {
  return <div>Hello world</div>
}

root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MyFirstPage />} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
)