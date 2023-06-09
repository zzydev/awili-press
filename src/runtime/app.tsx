import { Layout } from '../theme-default';
import { routes } from 'awili:routes';
import { matchRoutes } from 'react-router-dom';
import { PageData } from 'shared/types';
import siteData from 'awili:site-data';
import { Route } from 'node/plugin-routes';

export function App() {
  return <Layout />;
}

export async function initPageData(routePath: string): Promise<PageData> {
  // 获取路由组件编译后的模块内容
  const matched = matchRoutes(routes, routePath);

  if (matched) {
    // Preload route component
    const route = (await matched[0].route) as Route;
    const moduleInfo = await route.preload();
    console.log(moduleInfo);
    return {
      pageType: 'doc',
      siteData,
      frontmatter: moduleInfo.frontmatter,
      pagePath: routePath
    };
  }
  return {
    pageType: '404',
    siteData,
    pagePath: routePath,
    frontmatter: {}
  };
}
