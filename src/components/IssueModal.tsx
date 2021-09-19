import React, { Fragment, FunctionComponent, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useGetIssue } from "../hooks/useGetIssue";
import { QueryParams } from "../pages/stargazers";
import Frame from "./Frame";
import ReadMore from "./ReadMore";

type IssueModalProps = {
  show: boolean;
  handleClose: () => void;
} & QueryParams;

type Node = {
  node: {
    title: string;
  };
};

export type IssueListProps = {
  totalCount: number;
  edges: Node[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor?: string;
  };
};
const ISSUE_LIMIT = 30;

const IssueModal: FunctionComponent<IssueModalProps> = ({
  show,
  handleClose,
  login,
  name,
}) => {
  const [getIssue, { loading, error, data }] = useGetIssue();

  useEffect(() => {
    if (show && login && name) {
      getIssue({
        variables: {
          login,
          first: ISSUE_LIMIT,
          name,
        },
      });
    }
  }, [show, login, name, getIssue]);

  const handleFetchMore = async () => {
    if (data && data.user.repository.issues.pageInfo.hasNextPage) {
      await getIssue({
        variables: {
          login,
          first: ISSUE_LIMIT,
          name,
          after: data.user.repository.issues.pageInfo?.endCursor,
        },
      });
    }
  };

  return (
    <Fragment>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Issues</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Frame queryLoading={loading} error={error}>
            {data && !!data.user.repository.issues.totalCount && (
              <h3>{`Total issue: ${data.user.repository.issues.totalCount}`}</h3>
            )}
            {data &&
              data.user.repository.issues.edges.map(
                (i: Node, index: number) => <p key={index}>{i.node.title}</p>
              )}
            {data && data.user.repository.issues.pageInfo.hasNextPage && (
              <ReadMore onClick={handleFetchMore}>Load issue...</ReadMore>
            )}
          </Frame>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default IssueModal;
