import React from "react";
import Link from "@pigment/app/src/Link";
import StoriesContext from "../StoriesContext";
import Story from "../model/Story";

const getStoriesTreeFromFlatStories = stories => {
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

const NavNode = ({ story, children }) => {
  const childrenArray = [];
  for (let story of children.values()) {
    childrenArray.push(story);
  }

  return (
    <li key={story.id}>
      {story.isGenerated ? (
        story.name
      ) : (
        <Link to={story.path}>{story.name}</Link>
      )}
      <StoryTree tree={children} />
    </li>
  );
};

const StoryTree = ({ tree }) => {
  const array = [];
  for (var story of tree.values()) {
    array.push(story);
  }

  if (array.length === 0) {
    return null;
  }

  return (
    <ul>
      {array.map(({ story, children }) => {
        return <NavNode key={story.id} story={story} children={children} />;
      })}
    </ul>
  );
};

const Nav = ({ stories }) => {
  return (
    <StoriesContext.Consumer>
      {stories => {
        const storiesTree = getStoriesTreeFromFlatStories(stories);
        return <StoryTree tree={storiesTree} />;
      }}
    </StoriesContext.Consumer>
  );
};

export default Nav;
