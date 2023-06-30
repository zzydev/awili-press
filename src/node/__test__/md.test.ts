import { unified } from 'unified';
import { describe, test, expect } from 'vitest';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { rehypePluginPreWrapper } from '../../node/plugin-mdx/rehypePlugins/preWrapper';
import { rehypePluginCodeHighLight } from '../../node/plugin-mdx/rehypePlugins/codeHighLight';
import shiki from 'shiki';

describe('Markdown compile cases', async () => {
  // 初始化 processor
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .use(rehypePluginPreWrapper)
    .use(rehypePluginCodeHighLight, {
      highlighter: await shiki.getHighlighter({ theme: 'github-dark-dimmed' })
    });

  test('Compile title', async () => {
    const mdContent = '# 123';
    const result = processor.processSync(mdContent);
    expect(result.value).toMatchInlineSnapshot('"<h1>123</h1>"');
  });

  test('Compile code', async () => {
    const mdContent = 'I am using `Awili`';
    const result = processor.processSync(mdContent);
    expect(result.value).toMatchInlineSnapshot(
      '"<p>I am using <code>Awili</code></p>"'
    );
  });

  test('Compile code block', async () => {
    const mdContent = '```js\nconsole.log("awili");\n```';
    const result = processor.processSync(mdContent);
    expect(result.value).toMatchInlineSnapshot(`
      "<div class=\\"language-js\\"><span class=\\"lang\\">js</span><pre class=\\"shiki github-dark-dimmed\\" style=\\"background-color: #22272e\\" tabindex=\\"0\\"><code><span class=\\"line\\"><span style=\\"color: #ADBAC7\\">console.</span><span style=\\"color: #DCBDFB\\">log</span><span style=\\"color: #ADBAC7\\">(</span><span style=\\"color: #96D0FF\\">\\"awili\\"</span><span style=\\"color: #ADBAC7\\">);</span></span>
      <span class=\\"line\\"></span></code></pre></div>"
    `);
  });
});
