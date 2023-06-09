import { App } from './app';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

export function render(pagePath: string) {
  return renderToString(
    <StaticRouter location={pagePath}>
      <App />
    </StaticRouter>
  );
}

export { routes } from 'awili:routes';
