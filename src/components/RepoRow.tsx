import React, { Fragment, FunctionComponent } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { Node } from "./RepoList";

type RepoRowProps = {
  handleOpenModal: (props: Node) => void;
} & Node;

const RepoRow: FunctionComponent<RepoRowProps> = (props) => {
  const history = useHistory();

  return (
    <Fragment>
      <Card>
        <Card.Body>
          <Card.Title>
            <div className="d-flex justify-content-between">
              <Link to="#">{`${props.node.name}/${props.node.owner?.login}`}</Link>
              <Button
                variant="warning"
                onClick={() => {
                  props.handleOpenModal(props);
                }}
              >
                Load issue
              </Button>
            </div>
            <div className="d-flex justify-content-between">
              {!!props.node.stargazers?.totalCount && (
                <span>{`Stargazers: ${props.node.stargazers?.totalCount}`}</span>
              )}
              {!!props.node.stargazers?.totalCount && (
                <Button
                  variant="secondary"
                  onClick={() => {
                    history.push(
                      `/stargazers/${props.node.owner?.login}/${props.node.name}`
                    );
                  }}
                >
                  Load Stargazers
                </Button>
              )}
            </div>
          </Card.Title>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default RepoRow;
