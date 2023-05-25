import { useRoutes } from 'react-router-dom';
import { routes } from 'awili:routes';

// const routes = [
//   {
//     path: '/guide',
//     element: <Index />
//   },
//   {
//     path: '/guide/a',
//     element: <A />
//   },
//   {
//     path: '/b',
//     element: <B />
//   }
// ];

export const Content = () => {
  const routeElement = useRoutes(routes);
  return routeElement;
};
