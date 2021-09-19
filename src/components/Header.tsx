import { Fragment, FunctionComponent } from "react";
import { Link } from "react-router-dom";

export type HeaderProps = {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onSubmitSearch?: (e: React.FormEvent<HTMLFormElement>) => void;
};

const Header: FunctionComponent<HeaderProps> = ({
  onChange,
  onSubmitSearch,
}) => {
  return (
    <Fragment>
      <header className="p-3 bg-dark text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-between">
            <form
              className="d-flex col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
              onSubmit={onSubmitSearch}
            >
              <input
                type="input"
                className="form-control form-control-dark mr-2"
                placeholder="Search..."
                aria-label="Search"
                onChange={onChange}
              />
              <button type="submit" className="btn btn-warning">
                Submit
              </button>
            </form>
            <Link to="/profile" className="text-white">Profile</Link>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
