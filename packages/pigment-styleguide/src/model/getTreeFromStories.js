import { Map } from "immutable";
import Story from "./Story";

const addLeaf = (path, story, tree, parentPath = []) => {
  if (path.length === 1) {
    tree = tree.set(story.name, {
      story,
      children: tree.has(story.name) ? tree.get(story.name).children : new Map()
    });
  } else {
    const currentNodeName = path[0];

    const currentNode = tree.has(currentNodeName)
      ? tree.get(currentNodeName)
      : {
          story: Story(
            {
              id: Math.floor(Number.MAX_SAFE_INTEGER * Math.random()),
              children: []
            },
            [...parentPath, currentNodeName].join("/"),
            true
          ),
          children: new Map()
        };

    return tree.set(currentNodeName, {
      story: currentNode.story,
      children: addLeaf(path.slice(1), story, currentNode.children, [
        ...parentPath,
        currentNodeName
      ])
    });
  }

  return tree;
};

const getTreeFromStories = stories => {
  return stories.reduce((tree, story) => {
    const name = story.fullname;
    const path = name.split("/");
    return addLeaf(path, story, tree);
  }, new Map());
};

export default getTreeFromStories;
