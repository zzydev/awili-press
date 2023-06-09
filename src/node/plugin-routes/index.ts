import { Plugin } from 'vite';
import { RouteService } from './RouteService';
import { ComponentType } from 'react';
import { FrontMatter } from 'shared/types';

export interface PageModule {
  default: ComponentType;
  frontmatter?: FrontMatter;
  [key: string]: unknown;
}

export interface Route {
  path: string;
  element: React.ReactElement;
  filePath: string;
  preload: () => Promise<PageModule>;
}

// 本质: 把文件目录结构 -> 路由数据

interface PluginOptions {
  root: string;
  isSSR: boolean;
}

export const CONVENTIONAL_ROUTE_ID = 'awili:routes';

export function pluginRoutes(options: PluginOptions): Plugin {
  const routeService = new RouteService(options.root);

  return {
    name: 'awili:routes',
    async configResolved() {
      await routeService.init();
    },
    resolveId(id: string) {
      if (id === CONVENTIONAL_ROUTE_ID) {
        return '\0' + id;
      }
    },

    load(id: string) {
      if (id === '\0' + CONVENTIONAL_ROUTE_ID) {
        return routeService.generateRoutesCode(options.isSSR || false);
      }
    }
  };
}
