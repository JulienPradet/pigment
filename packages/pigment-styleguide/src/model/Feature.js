const Feature = (name, storyFn, story) => {
  return {
    get name() {
      return name;
    },
    get path() {
      const params = new URLSearchParams();
      params.append("story", story.id);
      params.append("feature", name);
      return `/_pigment/styleguide/feature?${params.toString()}`;
    },
    get iframePath() {
      const params = new URLSearchParams();
      params.append("story", story.id);
      params.append("feature", name);
      return `/_pigment/styleguide/iframe?${params.toString()}`;
    },
    render() {
      return storyFn();
    }
  };
};

export default Feature;
