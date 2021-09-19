import { Fragment, FunctionComponent } from "react";
import { Image } from "react-bootstrap";

type ProfileDetailProps = {
  userProfile: any;
};

const ProfileDetail: FunctionComponent<ProfileDetailProps> = ({
  userProfile,
}) => {
  return (
    <Fragment>
      <div className="d-flex flex-column align-items-center">
        <span>{userProfile.login}</span>
        <Image src={userProfile.avatarUrl} roundedCircle />
        <span>{userProfile.name}</span>
        <span>{userProfile.bio}</span>
      </div>
    </Fragment>
  );
};

export default ProfileDetail;
