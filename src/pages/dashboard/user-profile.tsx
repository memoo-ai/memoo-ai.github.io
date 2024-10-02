import './user-profile.scss';
import Profile from './profile';
import ProjectCreator from './project-creator';

const UserProfile = () => {
  return (
    <div className="w-full bg-[#131522] mt-[70px] rounded-[20px] px-[22px] pt-[22px] pb-[70px] mb-[70px]">
      <Profile />
      <ProjectCreator />
    </div>
  );
};

export default UserProfile;
