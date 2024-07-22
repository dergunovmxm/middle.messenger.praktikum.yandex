import { Block } from './block';

export const render = <T extends object>(query: string, block: Block<T>, insertBefore = false) => {
  const root = document.querySelector(query);
  if (insertBefore) {
    root?.insertBefore(block.getContent() as Node, root.firstChild);
  } else {
    root?.appendChild(block.getContent() as Node);
  }
  return root;
};
