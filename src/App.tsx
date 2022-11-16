import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navbar from './shared/Navbar/Navbar';
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

export const InitializeContext = createContext(null as any);

type Props = {};
const App = (props: Props) => {
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
        {isLoading ? <LoadingScreen /> : <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/volunteers" element={<Volunteers />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} >
            <Route index element={<Welcome />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ScrollButton />
        <Toaster />
      </div>
    </InitializeContext.Provider>
  );
}

export default App;
