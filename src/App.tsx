import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
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
import axios from 'axios';
import { BASE_API } from './config';
import Profile from './pages/Dashboard/Profile/Profile';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './auth/Firebase/Firebase.config';
import RequireAuth from './auth/RequireAuth/RequireAuth';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import Setting from './pages/Dashboard/Setting/Setting';

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
      element: <ProtectedRoutes>
        <Login />
      </ProtectedRoutes>,
    },
    {
      path: '/register',
      element: <ProtectedRoutes>
        <Register />
      </ProtectedRoutes>,
    },
    {
      path: '/dashboard',
      element: <RequireAuth>
        <Dashboard />
      </RequireAuth>,
      children: [
        {
          path: '/dashboard',
          element: <Welcome />,
        },
        {
          path: '/dashboard/profile',
          element: <Profile />,
        },
        {
          path: '/dashboard/setting',
          element: <Setting />,
        }
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
  const [user] = useAuthState(auth);
  const [theme, setTheme] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    if (user) {
      router.navigate('/');
    }
  }, [user]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  const { data, refetch, isLoading } = useQuery(["appName"], async () => {
    const res = await axios.get(`${BASE_API}/app/appName`);
    return res?.data;
  });

  const appName = data?.appName;

  useEffect(() => {
    setTheme(JSON.parse(window.localStorage.getItem("theme") as any));
  }, []);

  const handleThemeChange = () => {
    setTheme(!theme as any);
    window.localStorage.setItem("theme", !theme as any);
  };

  return (
    <InitializeContext.Provider value={{ appName, theme, handleThemeChange, refetch }}>
      <div data-theme={theme && "night"} className={theme ? '' : "bg-slate-50"}>
        {
          loading || isLoading ? (
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
