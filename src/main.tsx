/**
 * Application Entry Point - Main React application bootstrap
 * Initializes the React application with necessary providers and configuration
 * Features:
 * - React 18 createRoot implementation
 * - Strict Mode enabled for:
 *   - Development safety checks
 *   - Double-render detection
 *   - Deprecated feature warnings
 * - Global styles import
 * - Router integration as root component
 * - Type-safe DOM element targeting
 * - Production-ready configuration
 * 
 * Note: This file serves as the entry point where React mounts
 * the application to the DOM and sets up the basic application structure
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Router } from './Router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
