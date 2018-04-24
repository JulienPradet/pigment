const hashHistory = {
  replaceState: ({ as }, _, to) => {
    window.history.replaceState(
      { as: as },
      null,
      window.location.pathname + "#" + to
    );
  },
  pushState: ({ as }, _, to) => {
    window.history.pushState({ as }, null, window.location.pathname + "#" + to);
  }
};

export default hashHistory;
