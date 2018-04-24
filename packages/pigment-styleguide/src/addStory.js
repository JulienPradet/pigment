import Story from "./Story";

export let stories = new Map();

const addStory = (module, name) => {
  stories.set(module.id, Story(module, name));
};

export default addStory;
