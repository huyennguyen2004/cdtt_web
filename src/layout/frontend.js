import React from 'react';
import { Outlet } from 'react-router-dom';
import NavMenu from './../components/frontend/common/NavMenu';
import Footer from './../components/frontend/home/Footer';

const LayoutFrontend = () => {
  return (
    <div>
      <header>
        <NavMenu /> 
      </header>
      <main>
        <Outlet /> 
      </main>
      <footer>
        <Footer /> 
      </footer>
    </div>
  );
};

export default LayoutFrontend;
