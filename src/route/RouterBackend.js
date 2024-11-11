import Dashboard from './../pages/backend/Dashboard';
import Banner from './../pages/backend/Banner';
import Brand from './../pages/backend/Brand';
import ProductList from '../pages/backend/ProductList';
import ProductSale from './../pages/backend/ProductSale';
import ProductStore from './../pages/backend/ProductStore';
import OrderList from '../pages/backend/OrderList';

import Topic from './../pages/backend/Topic';
import ShowTopic from './../components/backend/Topic/showTopic';
import EditTopic from './../components/backend/Topic/editTopic';
import TrashTopic from './../components/backend/Topic/trashTopic';

import Post from './../pages/backend/Post';
import ShowPost from './../components/backend/Post/showPost';
import CreatePost from './../components/backend/Post/createPost';

import Contact from './../pages/backend/Contact';
import Users from './../pages/backend/Users';
import Menu from './../pages/backend/Menu';

import CreateProduct from '../components/backend/ProductList/createProduct';
import TrashProduct from '../components/backend/ProductList/trashProduct';
import ShowProduct from '../components/backend/ProductList/showProduct';
import EditProduct from '../components/backend/ProductList/editProduct';

import CreateProductSale from '../components/backend/ProductSale/createProduct';
import TrashProductSale from '../components/backend/ProductSale/trashProduct';
import ShowProductSale from './../components/backend/ProductSale/showProduct';

import CreateProductStore from '../components/backend/ProductStore/createProduct';
import TrashProductStore from '../components/backend/ProductStore/trashProduct';
import ShowProductStore from './../components/backend/ProductStore/showProduct';

import Category from './../pages/backend/Category';
import TrashCategory from './../components/backend/Category/trashCategory';
import ShowCategory from './../components/backend/Category/showCategory';
import EditCategory from './../components/backend/Category/editCategory'

import TrashBanner from '../components/backend/Banner/trashBanner';
import ShowBanner from '../components/backend/Banner/showBanner';

import TrashBrand from './../components/backend/Brand/trashBrand';
import ShowBrand from './../components/backend/Brand/showBrand';
import EditBrand from './../components/backend/Brand/editBrand';

import TrashOrder from './../components/backend/OrderList/trashOrder';

import ShowMenu from './../components/backend/Menu/showMenu';
import ShowContact from '../components/backend/Contact/showContact';
import ShowOrder from '../components/backend/OrderList/showOrder';

import ShowUsers from '../components/backend/User/showUser';
import CreateUsers from '../components/backend/User/createUser';

import EditBanner from '../components/backend/Banner/editBanner';

const RouterBackend = [
    { path: "", element: <Dashboard /> }, 

    { path: "banner", element: <Banner /> },
    { path: "banner/trash",element: <TrashBanner />, },
    { path: "banner/show/:id",element: <ShowBanner />, },
    { path: "banner/store", element: <Banner /> },
    { path: "banner/edit/:id", element: <EditBanner /> },

    { path: "brand", element: <Brand /> },
    { path: "brand/trash", element: <TrashBrand /> },
    { path: "brand/show/:id",element: <ShowBrand />, },
    { path: "brand/store", element: <Brand /> },
    { path: "brand/edit/:id", element: <EditBrand /> },

    { path: "category", element: <Category /> },
    { path: "category/trash",element: <TrashCategory />, },
    { path: "category/show/:id",element: <ShowCategory />, },
    { path: "category/edit/:id",element: <EditCategory />, },

    { path: "product", element: <ProductList /> },
    { path: "product/create",element: <CreateProduct />, },
    { path: "product/trash",element: <TrashProduct />, },
    { path: "product/show/:id",element: <ShowProduct />, },
    { path: "product/edit/:id",element: <EditProduct />, },

    { path: "product_sale", element: <ProductSale /> },
    { path: "product_sale/create",element: <CreateProductSale />, },
    { path: "product_sale/trash",element: <TrashProductSale />, },
    { path: "product_sale/show/:id",element: <ShowProductSale />, },

    { path: "product_store", element: <ProductStore /> },
{ path: "product_store/create",element: <CreateProductStore />, },
    { path: "product_store/trash",element: <TrashProductStore />, },
    { path: "product_store/show/:id",element: <ShowProductStore />, },

    { path: "order", element: <OrderList /> },
    { path: "order/trash", element: <TrashOrder /> },
 { path: "order/show/:id", element: <ShowOrder /> },

    { path: "topic", element: <Topic /> },
    { path: "topic/show/:id",element: <ShowTopic /> },
    { path: "topic/store",element: <Topic /> },
    { path: "topic/edit/:id",element: <EditTopic /> },
    { path: "topic/trash", element: <TrashTopic /> },
    
    { path: "post", element: <Post /> },
    { path: "post/store",element: <CreatePost/> },
    { path: "post/edit/:id",element: <Post /> },
    { path: "post/trash", element: <Post /> },
    { path: "post/show/:id",element: <ShowPost /> },

    { path: "contact", element: <Contact /> },
    { path: "contact/show/:id",element: <ShowContact />, },

    { path: "users", element: <Users /> },
    { path: "users/show/:id", element: <ShowUsers /> },
    { path: "users/store", element: <CreateUsers /> },

    { path: "menu", element: <Menu /> },
    { path: "menu/show/:id",element: <ShowMenu />, },
];

export default RouterBackend;
