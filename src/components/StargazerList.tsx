import React, { Fragment, FunctionComponent } from 'react';
import StargazerRow from './StargazerRow';

export type Node = {
  node: {
    login: string;
  };
};

export type StargazerListProps = {
  totalCount: number;
  edges: Node[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor?: string;
  };
};

const StargazerList: FunctionComponent<StargazerListProps> = (props) => {
  return (
    <Fragment>
      <div className="container">
        <h3>{`Total stargazers: ${props.totalCount}`}</h3>
        <div>
          {props.edges.map((repo, index) => (
            <StargazerRow {...repo} key={index} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default StargazerList;