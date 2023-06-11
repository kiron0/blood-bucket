import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import NotFound from './shared/NotFound/NotFound';
import Register from './pages/Authentication/Register';
import Login from './pages/Authentication/Login';
import Campaigns from './pages/Campaigns/Campaigns';
import Volunteers from './pages/Volunteers/Volunteers';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard/Dashboard';
import Welcome from './pages/Dashboard/Welcome/Welcome';
import ScrollButton from './components/ScrollButton/ScrollButton';
import ContactUs from './pages/ContactUs/ContactUs';
import Donors from './pages/Donors/Donors';
import Root from './Layouts/Root';
import Navbar from './shared/Navbar/Navbar';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Root />,
    },
    {
      path: '/donors',
      element:
        <>
          <Navbar />
          <Donors />
        </>
    },
    {
      path: '/campaigns',
      element:
        <>
          <Navbar />
          <Campaigns />
        </>,
    },
    {
      path: '/volunteers',
      element:
        <>
          <Navbar />
          <Volunteers />
        </>,
    },
    {
      path: '/contact-us',
      element:
        <>
          <Navbar />
          <ContactUs />
        </>,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
      children: [
        {
          path: '/dashboard',
          element: <Welcome />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />
    }
  ]
);

export const InitializeContext = createContext(null as any);

const App = () => {
  const [theme, setTheme] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);


  useEffect(() => {
    setTheme(JSON.parse(window.localStorage.getItem("theme") as any));
  }, []);

  const handleThemeChange = () => {
    setTheme(!theme as any);
    window.localStorage.setItem("theme", !theme as any);
  };

  return (
    <InitializeContext.Provider value={{ theme, handleThemeChange }}>
      <div data-theme={theme && "night"} className={theme ? '' : "bg-slate-50"}>
        {/* <Routes>
          <Route path="/dashboard" element={<Dashboard />} >
            <Route index element={<Welcome />} />
          </Route>
        </Routes> */}
        {
          isLoading ? (
            <LoadingScreen />
          ) :
            (
              <>
                <RouterProvider router={router} />
                <ScrollButton />
                <Toaster />
              </>
            )
        }
      </div>
    </InitializeContext.Provider>
  );
}

export default App;
