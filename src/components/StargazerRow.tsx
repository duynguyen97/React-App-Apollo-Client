import React, { Fragment, FunctionComponent } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Node } from "./StargazerList";

const StargazerRow: FunctionComponent<Node> = (props) => {
  return (
    <Fragment>
      <Card>
        <Card.Body>
          <Card.Title>
            <Link to="#">{`${props.node.login}`}</Link>
          </Card.Title>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default StargazerRow;
