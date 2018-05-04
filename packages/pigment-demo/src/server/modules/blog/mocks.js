import casual from "casual";

casual.seed(20);

const posts = {};
const mockPost = id => {
  if (!posts[id]) {
    const title = casual.array_of_words(5);
    posts[id] = {
      id: id,
      path: title.join("-"),
      title: title.join(" "),
      content: casual.description
    };
  }

  return posts[id];
};

const mocks = {
  Query: () => ({
    blog: () => ({})
  }),
  Blog: () => {
    return {
      posts: (_, { from = 0, to = 10 }) => {
        return new Array(to - from)
          .fill(null)
          .map((_, index) => mockPost(index));
      },
      post: (_, { id }) => {
        return mockPost(id);
      }
    };
  }
};

export default mocks;
