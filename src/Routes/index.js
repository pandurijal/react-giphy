import MainPage from '../Pages/MainPage';
import FavPage from '../Pages/FavPage';

export const routes = [
  {
    path: '/',
    component: MainPage,
    exact: true
  },
  {
    path: '/fav',
    component: FavPage,
    exact: true
  }
];
