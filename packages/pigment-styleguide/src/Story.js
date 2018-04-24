const Story = (module, name) => {
  return {
    get id() {
      return module.id;
    },
    get name() {
      return name;
    }
  };
};

export default Story;
