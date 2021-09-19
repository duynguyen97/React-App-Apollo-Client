import React, { Fragment, FunctionComponent, ReactNode } from "react";
import { Alert } from "react-bootstrap";
import QueryLoading from "./QueryLoading";

type FrameProps = {
  error?: string;
  queryLoading?: boolean;
  children?: ReactNode;
};

const Frame: FunctionComponent<FrameProps> = ({
  error,
  queryLoading = false,
  children,
}) => {
  return (
    <Fragment>
      <div className="container">
        <QueryLoading queryLoading={queryLoading}>
          {error && <Alert variant="danger">{error}</Alert>}
          <div>{children}</div>
        </QueryLoading>
      </div>
    </Fragment>
  );
};

export default Frame;
