import React, { Fragment, FunctionComponent, useState } from "react";
import IssueModal from "./IssueModal";
import RepoRow from "./RepoRow";

export type Node = {
  node: {
    name: string;
    owner: {
      login: string;
    };
    stargazers: {
      totalCount: number;
    };
  };
};

export type RepoListProps = {
  repositoryCount: number;
  edges: Node[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor?: string;
  };
};

const RepoList: FunctionComponent<RepoListProps> = (props) => {
  const [isShow, setShow] = useState(false);
  const initRepo: Node = {
    node: {
      name: "",
      owner: {
        login: "",
      },
      stargazers: {
        totalCount: 0,
      },
    },
  };
  const [selectedRepo, setSelectRepo] = useState(initRepo);

  const handleOpenModal = (repo: Node) => {
    setShow(true);
    setSelectRepo(repo);
  };

  const handleCloseModal = () => {
    setShow(false);
  };

  return (
    <Fragment>
      <div>
        <div>{`Total repos: ${props.repositoryCount}`}</div>
        <div>{`Loaded repos: ${props.edges.length}`}</div>
        <div>
          {props.edges.map((repo, index) => (
            <RepoRow
              {...repo}
              key={index}
              handleOpenModal={() => {
                handleOpenModal(repo);
              }}
            />
          ))}
        </div>
      </div>
      <IssueModal
        show={isShow}
        handleClose={handleCloseModal}
        login={selectedRepo.node.owner.login}
        name={selectedRepo.node.name}
      />
    </Fragment>
  );
};

export default RepoList;
