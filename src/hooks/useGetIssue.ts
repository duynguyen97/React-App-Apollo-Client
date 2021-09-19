import { gql, useLazyQuery } from "@apollo/client";

const GET_ISSUE = gql`
  query getIssue($login: String!, $first: Int, $name: String!, $after: String) {
    user(login: $login) {
      repository(name: $name) {
        issues(first: $first, after: $after) {
          totalCount
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              title
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

export const useGetIssue = (): any => {
  const response = useLazyQuery(GET_ISSUE);
  return response;
};
