const Feature = (name, storyFn) => {
  return {
    get name() {
      return name;
    },
    render() {
      return storyFn();
    }
  };
};

export default Feature;
