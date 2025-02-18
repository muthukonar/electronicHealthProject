import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import Home from './pages/Home.tsx';
import NewPatientLogin from './pages/PatientLogin.tsx';
import DrLogin from './pages/Drlogin.tsx'
import PatientSignup from './pages/PatientSignup.tsx';
import DrSignUp from './pages/DrSignup.tsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      }, 
      {
        path: '/Drlogin',
        element: <DrLogin />
      },
      {
        path: '/patientlogin',
        element: <NewPatientLogin />
      },
      {
        path: '/signup',
        element: <DrSignUp/>
      },
      {
        path: '/patientsignup',
        element: <PatientSignup />
      } 
    ]
  }
])

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
