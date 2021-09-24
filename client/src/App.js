import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import RestaurantsPage from './pages/Restaurants';
import RestaurantPage from './pages/Restaurants/RestaurantPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import RestaurantCategoryPage from './pages/Restaurants/RestaurantCategoryPage';

function App() {
  return (
    <Router>
      <ToastContainer
        position='top-center'
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        transition={Slide}
      />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/restaurants' component={RestaurantsPage} />
        <Route exact path='/restaurants?search=' component={RestaurantsPage} />
        <Route
          exact
          path='/restaurants/:category'
          component={RestaurantCategoryPage}
        />
        <Route
          exact
          path='/restaurants/:category/:name&&:id'
          component={RestaurantPage}
        />
        <Route path='/register' component={RegisterPage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/profile' component={ProfilePage} />
        <Route path='/404' component={NotFoundPage} />
        <Redirect to='/404' />
      </Switch>
    </Router>
  );
}

export default App;
