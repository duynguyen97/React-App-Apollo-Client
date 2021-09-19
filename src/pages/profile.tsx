import { Fragment, FunctionComponent } from "react";
import Frame from "../components/Frame";
import ProfileDetail from "../components/ProfileDetail";
import { useGetProfile } from "../hooks/useGetProfile";

const ProfilePage: FunctionComponent = () => {
  const { loading, error, data } = useGetProfile();

  return (
    <Fragment>
      <Frame queryLoading={loading} error={error}>
        {!loading && <ProfileDetail userProfile={data.viewer} />}
      </Frame>
    </Fragment>
  );
};

export default ProfilePage;
