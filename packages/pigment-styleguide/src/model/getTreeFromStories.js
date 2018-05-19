import Story from "./Story";

const getTreeFromStories = stories => {
  let storiesTree = new Map();

  const addLeaf = (path, story, tree) => {
    if (path.length === 1) {
      if (tree.has(story.name)) {
        tree.set(story.name, {
          story,
          children: tree.get(story.name).children
        });
      } else {
        tree.set(story.name, { story, children: new Map() });
      }
    } else {
      const currentNode = path[0];
      if (!tree.has(currentNode)) {
        tree.set(currentNode, {
          story: Story(
            {
              id: Math.floor(Number.MAX_SAFE_INTEGER * Math.random()),
              children: []
            },
            currentNode,
            true
          ),
          children: new Map()
        });
      }
      addLeaf(path.slice(1), story, tree.get(currentNode).children);
    }
  };

  for (let story of stories.values()) {
    const name = story.fullname;
    const path = name.split("/");
    addLeaf(path, story, storiesTree);
  }

  return storiesTree;
};

export default getTreeFromStories;
