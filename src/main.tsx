import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import SimpleTest from './SimpleTest.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* Uncomment dòng dưới và comment <App /> để test simple version */}
    {/* <SimpleTest /> */}
  </StrictMode>,
)
