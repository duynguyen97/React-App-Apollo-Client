import React, { Fragment, FunctionComponent, useEffect } from "react";
import { useParams } from "react-router";
import Frame from "../components/Frame";
import ReadMore from "../components/ReadMore";
import StargazerList from "../components/StargazerList";
import { useGetStargazers } from "../hooks/useGetStargazers";

const STARGAZERS_LIMIT = 30;
export type QueryParams = {
  login: string;
  name: string;
};

const StargazersPage: FunctionComponent = (props) => {
  const { login, name } = useParams<QueryParams>();
  const [getStargazers, { loading, error, data }] = useGetStargazers();

  useEffect(() => {
    if (login && name)
      getStargazers({
        variables: {
          login,
          first: STARGAZERS_LIMIT,
          name,
        },
      });
  }, [login, name, getStargazers]);

  if (!login || !name) {
    return <Fragment></Fragment>;
  }

  const handleFetchMore = async () => {
    if (data && data.user.repository.stargazers.pageInfo.hasNextPage) {
      await getStargazers({
        variables: {
          login,
          first: STARGAZERS_LIMIT,
          name,
          after: data.user.repository.stargazers.pageInfo?.endCursor,
        },
      });
    }
  };

  return (
    <Fragment>
      {data && (
        <Frame queryLoading={loading} error={error}>
          {data && (
            <StargazerList
              {...data.user.repository.stargazers}
            />
          )}
          {data && data.user.repository.stargazers.pageInfo.hasNextPage && (
            <div className="d-flex justify-content-center">
              <ReadMore onClick={handleFetchMore}>
                Load more stargazers...
              </ReadMore>
            </div>
          )}
        </Frame>
      )}
    </Fragment>
  );
};

export default StargazersPage;
