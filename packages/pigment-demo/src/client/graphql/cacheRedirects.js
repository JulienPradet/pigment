import { toIdValue } from "apollo-utilities";

export default cache => ({
  Blog: {
    post: (_, args) => {
      return toIdValue(
        cache().config.dataIdFromObject({ __typename: "Post", id: args.id })
      );
    }
  }
});
