import { useSelector } from "react-redux";

export default function Profile() {
  const currentUser = useSelector((state) => state.user?.currentUser);
  return (
    <div className="p-3 max-w-lg  mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4 ">
        <img
          src={currentUser.profilePicture}
          alt="profiePicture"
          className="h-24 w-24 cursor-pointer rounded-full object-cover mt-2 self-center "
        />
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3 "
          defaultValue={currentUser.username}
        />
        <input
          type="EMAIL"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3 "
          defaultValue={currentUser.email}
        />
        <input
          type="text"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3 "
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
        <div className="flex justify-between mt-5">
          <span className="text-red-700 cursor-pointer">Delete Account</span>
          <span className="text-red-700 cursor-pointer">Sign out</span>
        </div>
      </form>
    </div>
  );
}
