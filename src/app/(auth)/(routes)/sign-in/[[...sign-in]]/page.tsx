import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return <SignIn path="/sign-in" signUpUrl="/sign-up" />;
};

export default SignInPage;
