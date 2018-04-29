const Story = (module, name) => {
  let dependsOn = new Set();
  let reliesOn = new Set();
  let features = new Map();

  return {
    get id() {
      return module.id;
    },
    get name() {
      return name.replace(/^.*\//, "");
    },
    get dependencies() {
      return module.children;
    },
    get dependsOn() {
      return dependsOn;
    },
    addDependsOn(story) {
      if (!dependsOn.has(story)) {
        dependsOn.add(story);
      }
    },
    get reliesOn() {
      return reliesOn;
    },
    addReliesOn(story) {
      if (!reliesOn.has(story)) {
        reliesOn.add(story);
      }
    },
    get features() {
      return features;
    },
    add(name, storyFn) {
      features.set(name, storyFn);
    }
  };
};

export default Story;
