const Story = (module, name) => {
  let dependsOn = new Set();
  let reliesOn = new Set();

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
        console.log(this.name, "depends on", story.name);
      }
    },
    get reliesOn() {
      return reliesOn;
    },
    addReliesOn(story) {
      if (!reliesOn.has(story)) {
        reliesOn.add(story);
        console.log(this.name, "relies on", story.name);
      }
    }
  };
};

export default Story;
