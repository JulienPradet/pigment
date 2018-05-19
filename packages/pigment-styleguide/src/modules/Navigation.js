import React from "react";
import Link from "@pigment/app/src/Link";
import StoriesContext from "../StoriesContext";
import getTreeFromStories from "../model/getTreeFromStories";
import LinkTree from "../ui/LinkTree";
import Searchable from "../ui/Searchable";

const StoryNav = ({ story, children }) => {
  const childrenArray = [];
  for (let story of children.values()) {
    childrenArray.push(story);
  }

  const label = story.isGenerated ? (
    story.name
  ) : (
    <Link to={story.path}>{story.name}</Link>
  );
  return (
    <LinkTree.Node key={story.id}>
      {label}
      <StoryTree tree={children} />
    </LinkTree.Node>
  );
};

const storyMatchSearch = (story, children, search) => {
  return search.test(story.fullname) || childrenMatchSearch(children, search);
};

const childrenMatchSearch = (children, search) => {
  for (let child of children.values()) {
    if (storyMatchSearch(child.story, child.children, search)) {
      return true;
    }
  }
  return false;
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
    <LinkTree.Root>
      {array.map(({ story, children }) => {
        return (
          <Searchable.Match
            key={story.id}
            match={search => storyMatchSearch(story, children, search)}
          >
            {matches =>
              matches && <StoryNav story={story} children={children} />
            }
          </Searchable.Match>
        );
      })}
    </LinkTree.Root>
  );
};

const Nav = ({ stories }) => {
  return (
    <StoriesContext.Consumer>
      {stories => {
        const storiesTree = getTreeFromStories(stories);
        return (
          <Searchable>
            <StoryTree tree={storiesTree} />
          </Searchable>
        );
      }}
    </StoriesContext.Consumer>
  );
};

export default Nav;
