import { gql, useLazyQuery } from "@apollo/client";

const GET_STARGAZERS = gql`
  query getStargazers(
    $login: String!
    $first: Int
    $name: String!
    $after: String
  ) {
    user(login: $login) {
      repository(name: $name) {
        stargazers(first: $first, after: $after) {
          totalCount
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              login
            }
          }
        }
      }
    }
  }
`;

export type QueryVariables = {
  login: string;
  first?: number;
  name: string;
  after?: string;
};

export const useGetStargazers = (): any => {
  const response = useLazyQuery(GET_STARGAZERS);
  return response;
};
