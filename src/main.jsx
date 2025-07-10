import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Weather from './weather.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Weather/>
  </StrictMode>,
)
