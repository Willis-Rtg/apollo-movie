import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://apollo-movie-server.herokuapp.com/",
  cache: new InMemoryCache(),
  resolvers: {
    Movie: {
      isLiked: () => false,
    },
    Suggestions: {
      isLiked: () => false,
    },
    Mutation: {
      toggleLike: (_, { id }, { cache }) => {
        cache.modify({
          id: cache.identify({ __typename: "Movie", id }),
          fields: { isLiked: (isLiked) => !isLiked },
        });
      },
    },
  },
});

export default client;
