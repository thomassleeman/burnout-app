import SignInWithGoogle from "./google/SignInWithGoogle";

export default function OAuthUI() {
  return (
    <div className="mt-10">
      <div className="flex">
        {/* <div className=" inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200" />
        </div> */}
        <div className=" flex justify-center text-sm font-medium leading-6">
          <span className=" text-slate-700">Or continue with...</span>
        </div>
      </div>

      {/* <div className="mt-6 grid grid-cols-2 gap-4"> */}
      <div className="mt-6 grid gap-4">
        <SignInWithGoogle />
      </div>
    </div>
  );
}
