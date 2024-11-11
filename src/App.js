import React from 'react';
import LayoutFrontend from './layout/frontend';
import LayoutBackend from './layout/backend';
import { useRoutes } from'react-router-dom';
import RouterFrontend from './route/RouterFrontend';
import RouterBackend from './route/RouterBackend';
import NotFound from './pages/NotFound';

function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <LayoutFrontend/>,
      children: RouterFrontend,
    },
    {
      path: "/admin/*",
      element: <LayoutBackend/>,
      children: RouterBackend,
    },
    { path: "*", element: <NotFound /> },
      ]);
  return element;
}
export default App;