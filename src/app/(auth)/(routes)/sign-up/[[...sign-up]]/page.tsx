import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return <SignUp path="/sign-up" signInUrl="/sign-in" />;
};

export default SignUpPage;
