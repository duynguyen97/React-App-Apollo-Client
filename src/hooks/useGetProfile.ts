import { gql, useQuery } from "@apollo/client";

const GET_PROFILE = gql`
  query {
    viewer {
      login
      avatarUrl
      name
      bio
    }
  }
`;

export const useGetProfile = (): any => {
    const response = useQuery(GET_PROFILE);
    return response;
}
