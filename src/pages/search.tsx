import React, { Fragment, FunctionComponent, useState } from "react";
import Frame from "../components/Frame";
import Header from "../components/Header";
import ReadMore from "../components/ReadMore";
import RepoList from "../components/RepoList";
import { useSearchByQuery } from "../hooks/useSearchByQuery";

export enum SearchType {
  ISSUE = "ISSUE",
  REPOSITORY = "REPOSITORY",
  USER = "USER",
  DISCUSSION = "DISCUSSION",
}

const REPOS_LIMIT = 30;

const SearchPage: FunctionComponent = () => {
  const [search, { loading, error, data }] = useSearchByQuery();
  const [searchQuery, setSearchQuery] = useState("");

  const handleOnChangeSearchInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(e.target.value);
  };

  const handleOnSubmitSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await search({
      variables: {
        query: searchQuery,
        type: SearchType.REPOSITORY,
        first: REPOS_LIMIT,
      },
    });
  };

  const handleFetchMore = async () => {
    if (data && data.search.pageInfo.hasNextPage) {
      await search({
        variables: {
          query: searchQuery,
          type: SearchType.REPOSITORY,
          first: REPOS_LIMIT,
          after: data.search.pageInfo?.endCursor,
        },
      });
    }
  };

  return (
    <Fragment>
      <Header
        onChange={handleOnChangeSearchInput}
        onSubmitSearch={handleOnSubmitSearch}
      />
      <Frame queryLoading={loading} error={error}>
        {data && <RepoList {...data.search} />}
        {data && data.search.pageInfo.hasNextPage && (
          <div className="d-flex justify-content-center">
            <ReadMore onClick={handleFetchMore}>Load more...</ReadMore>
          </div>
        )}
      </Frame>
    </Fragment>
  );
};

export default SearchPage;
