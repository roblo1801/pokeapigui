import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col mt-3 items-center">
      <SignIn />
    </div>
  );
}
