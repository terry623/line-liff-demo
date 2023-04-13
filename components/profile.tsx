import styles from "../styles/Home.module.css";
import type { ProfileProps } from "../types";

const Profile = ({ profile }: { profile?: ProfileProps }) => {
  return (
    <div>
      <h4>Profile</h4>
      <div>userId: {profile?.userId}</div>
      <div>displayName: {profile?.displayName}</div>
      <div>statusMessage: {profile?.statusMessage}</div>
      {profile?.pictureUrl && (
        <img
          src={profile?.pictureUrl}
          alt="pictureUrl"
          className={styles.pictureUrl}
        />
      )}
    </div>
  );
};

export default Profile;
