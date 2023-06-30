import { unified } from 'unified';
import { describe, test, expect } from 'vitest';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { rehypePluginPreWrapper } from '../../node/plugin-mdx/rehypePlugins/preWrapper';

describe('Markdown compile cases', () => {
  // 初始化 processor
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .use(rehypePluginPreWrapper);

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
    // <div class="language-js">
    // <span class="lang"> js </span>
    // <pre><code>console.log("awili"); </code></pre>
    // </div>
    expect(result.value).toMatchInlineSnapshot(`
      "<div class=\\"language-js\\"><span class=\\"lang\\">js</span><pre><code class=\\"language-js\\">console.log(\\"awili\\");
      </code></pre></div>"
    `);
  });
});
