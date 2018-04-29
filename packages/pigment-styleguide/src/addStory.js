import Story from "./model/Story";
import Feature from "./model/Feature";

export let stories = new Map();

const addStory = (module, name) => {
  const story = Story(module, name);
  stories.set(module.id, story);

  return {
    add: (name, storyFn) => {
      return story.add(name, Feature(name, storyFn));
    }
  };
};

export default addStory;
