import { FunctionComponent, Fragment } from "react";
import styled from "styled-components";

export type QueryLoadingProps = {
  queryLoading: boolean;
  className?: any;
};

const Loading = styled.div`
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  content: "";
  display: block;
  width: 40px;
  height: 40px;
  background-image: url("/img-loader.gif");
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1000;
  opacity: 0.4;
`;

const QueryLoading: FunctionComponent<QueryLoadingProps> = ({
  queryLoading,
  className,
  children,
}) => {
  if (queryLoading) return <Loading className={className} />;
  // queryLoading ? return (
  //   <Loading className={className} />
  // ) : (

  // )
  return <Fragment>{children}</Fragment>;
};

export default QueryLoading;
