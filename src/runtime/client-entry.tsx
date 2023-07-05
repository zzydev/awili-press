import { createRoot } from 'react-dom/client';
import { App, initPageData } from './app';
import { BrowserRouter } from 'react-router-dom';
import siteData from 'awili:site-data';
import { DataContext } from './hooks';

console.log(siteData);
async function renderInBrowser() {
  const containerEl = document.getElementById('root');
  if (!containerEl) {
    throw new Error('#root element not found');
  }
  // 渲染之前，初始化 PageData
  const pageData = await initPageData(location.pathname);
  createRoot(containerEl).render(
    <DataContext.Provider value={pageData}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DataContext.Provider>
  );
}

renderInBrowser();
