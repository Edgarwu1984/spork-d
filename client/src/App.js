import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RestaurantsPage from './pages/Restaurants';
import RestaurantPage from './pages/Restaurants/RestaurantPage';

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
        <Route path='/restaurants/:id' component={RestaurantPage} />
        <Route path='/login' component={LoginPage} />
      </Switch>
    </Router>
  );
}

export default App;
