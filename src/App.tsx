import AllSneakers from './pages/AllSneakers';
import SneakersDetails from './pages/SneakerDetails';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([
  { path: '/', element: <AllSneakers /> },
  { path: '/sneaker/:id', element: <SneakersDetails /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
