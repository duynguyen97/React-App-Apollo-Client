import React, { FunctionComponent } from 'react';

export type ReadMoreProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
const ReadMore:FunctionComponent<ReadMoreProps> = ({ onClick, children }) => {
  return (
    <button type="button" className="btn btn-secondary mx-auto" onClick={onClick}>
      {children}
    </button>
  );
};

export default ReadMore;