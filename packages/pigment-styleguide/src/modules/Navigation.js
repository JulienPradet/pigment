import React from "react";
import Link from "../ui/Link";
import StoriesContext from "../StoriesContext";
import getTreeFromStories from "../model/getTreeFromStories";
import LinkTree from "../ui/LinkTree";
import Searchable from "../ui/Searchable";
import Togglable from "../ui/Togglable";

const StoryNav = ({ story, children }) => {
  const label = story.isGenerated ? (
    story.name
  ) : (
    <Link to={story.path}>{story.name}</Link>
  );

  return children.size > 0 ? (
    <Togglable>
      {(isOpened, toggle) => (
        <LinkTree.Node>
          <Togglable.Title
            onClick={toggle}
            toggleLabel={isOpened ? <span>▾</span> : <span>▸</span>}
          >
            {label}
          </Togglable.Title>
          {isOpened && <StoryTree tree={children} />}
        </LinkTree.Node>
      )}
    </Togglable>
  ) : (
    <LinkTree.Node>{label}</LinkTree.Node>
  );
};

const storyMatchSearch = (story, children, search) => {
  return search.test(story.fullname) || childrenMatchSearch(children, search);
};

const childrenMatchSearch = (children, search) => {
  return children.some(child =>
    storyMatchSearch(child.story, child.children, search)
  );
};

const StoryTree = ({ tree }) => {
  if (tree.size === 0) {
    return null;
  }

  return (
    <LinkTree.Root>
      {tree.toArray().map(({ story, children }) => {
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
