import Story from "./Story";
import Feature from "./Feature";

let stories = new Map();

const addStory = (module, name) => {
  const story = Story(module, name);
  stories.set(module.id, story);

  return {
    add: (name, storyFn) => {
      return story.add(name, Feature(name, storyFn, story));
    }
  };
};

export default stories;
export { addStory };
