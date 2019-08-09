import React from 'react';
import { useRoutes } from 'hookrouter';
import LoginPage from './pages/login.page';
import HomePage from './pages/home.page';
import RegisterPage from './pages/register.page';
import AdminHomePage from './pages/admin-home.page';
import AddVacationPage from './pages/admin-add-vacation.page';
import EditVacationPage from './pages/admin-edit-vacation.page';

const routes = {
    '/': () => <HomePage />,
    '/login': () => <LoginPage />,
    '/register': () => <RegisterPage />,
    '/admin': () => <AdminHomePage />,
    '/admin/new-vacation': () => <AddVacationPage />,
    '/admin/vacation/:id': ({id}) => <EditVacationPage id={id} />
    // '/products': () => <ProductOverview />,
    // '/products/:id': ({id}) => <ProductDetails id={id} />
};
	
const App = () => {
    const routeResult = useRoutes(routes);
    
    return routeResult ||  <div>Page Not Found</div>;
}

export default App;