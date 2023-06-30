import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Text, Root } from 'hast';
import { fromHtml } from 'hast-util-from-html';
import shiki from 'shiki';

interface Options {
  highlighter: shiki.Highlighter;
}

export const rehypePluginCodeHighLight: Plugin<[Options], Root> = ({
  highlighter
}) => {
  return (tree) => {
    // index 表示当前节点在父节点的索引
    visit(tree, 'element', (node, index, parent) => {
      if (
        node.tagName === 'pre' &&
        node.children[0]?.type === 'element' &&
        node.children[0].tagName === 'code'
      ) {
        // 接下来我们需要获取 "语法名称" 和 "代码内容"
        const codeNode = node.children[0];
        const codeContent = (codeNode.children[0] as Text).value;
        const codeClassName = codeNode.properties?.className?.toString() || '';

        const lang = codeClassName.split('-')[1];
        if (!lang) {
          return;
        }

        const highlightedCode = highlighter.codeToHtml(codeContent, { lang });
        // 将html转换为Ast
        // options 设置为 {fragment: true} 这样就不会在外层包裹 html、body 之类的标签
        const fragmentAst = fromHtml(highlightedCode, { fragment: true });
        parent.children.splice(index, 1, ...fragmentAst.children);
      }
    });
  };
};
