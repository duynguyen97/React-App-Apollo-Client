import { gql, useLazyQuery } from "@apollo/client";

const SEARCH_BY_QUERY = gql`
  query searchByQuery(
    $query: String!
    $type: SearchType!
    $first: Int
    $after: String
  ) {
    search(query: $query, type: $type, first: $first, after: $after) {
      repositoryCount
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          ... on Repository {
            name
            owner {
              ... on User {
                name
                login
              }
            }
            stargazers {
              totalCount
            }
          }
        }
        cursor
      }
    }
  }
`;

export type QueryVariables = {
  query: string;
  type: string;
  first?: number;
  after?: string;
};

export const useSearchByQuery = (): any => {
  const response = useLazyQuery(SEARCH_BY_QUERY);
  return response;
};
