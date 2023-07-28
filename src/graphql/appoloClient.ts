import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

 const API_URL  = `https://gum-indexer-smartprofile-devnet-lafkve5tyq-uc.a.run.app/v1/graphql`

  /* create the API client */
export const apolloClient = new ApolloClient({
    uri: API_URL,
    cache: new InMemoryCache(),
    defaultOptions : {
      watchQuery : {
        fetchPolicy : "no-cache"
      },
      query : {
        fetchPolicy : "no-cache"
      }
    }
  })

 