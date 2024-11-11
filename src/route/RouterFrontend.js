import Home from './../pages/frontend/Home';
import Product from '../pages/frontend/Products';
import About from './../components/frontend/common/About'; 
import News from './../components/frontend/common/News'; 
import Contact from './../components/frontend/common/Contact'; 
import Favorite from './../components/frontend/common/Favorite'; 
import Login from './../components/frontend/common/Login'; 
import Cart from './../components/frontend/common/Cart';
import Privacy from './../components/frontend/common/Privacy'; 
import Purchase from './../components/frontend/common/Purchase'; 
import Refund from './../components/frontend/common/Refund';
import Promotions from './../components/frontend/home/Promotions'; 
import Category from './../components/frontend/common/Category'; 
import ProductDetail from './../components/frontend/home/ProductDetail';


const RouterFrontend = [
    { path: "/", element: <Home /> },
    { path: "/products", element: <Product /> },
    { path: "/product/show/:id", element: <ProductDetail /> },
    { path: "/about", element: <About /> },
    { path: "/news", element: <News /> },
    { path: "/contact", element: <Contact /> },
    { path: "/favorite", element: <Favorite /> },
    { path: "/login", element: <Login /> },
    { path: "/cart", element: <Cart /> },
    { path: "/privacy", element: <Privacy /> },
    { path: "/purchase", element: <Purchase /> },
    { path: "/refund", element: <Refund /> },
    { path: "/promotions", element: <Promotions /> },
    { path: "/category/:id", element: <Category /> },
];

export default RouterFrontend;
