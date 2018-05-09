const Story = (module, name, isGenerated = false) => {
  let dependsOn = new Set();
  let reliesOn = new Set();
  let features = new Map();

  return {
    get id() {
      return module.id.toString();
    },
    get isGenerated() {
      return isGenerated;
    },
    get name() {
      return name.replace(/^.*\//, "");
    },
    get fullname() {
      return name;
    },
    get path() {
      const params = new URLSearchParams();
      params.append("story", module.id.toString());
      return `/_pigment/styleguide/story?${params.toString()}`;
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
