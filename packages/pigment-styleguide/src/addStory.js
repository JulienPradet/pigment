import Story from "./Story";

export let stories = new Map();

const addStory = (module, name) => {
  const story = Story(module, name);
  stories.set(module.id, story);

  return {
    addStory: (name, storyFn) => {}
  };
};

export default addStory;
