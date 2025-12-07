import { SignUpForm } from "@/components/forms/signUpForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Link } from "react-router";

export const SignUpPage = () => {
  return (
    <div className="flex w-full justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-xl text-center font-semibold">
          Sign Up
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
        <CardFooter>
          Already have an account? Please
          <Link to="/sign-in">Sign in</Link>
        </CardFooter>
      </Card>
    </div>
  );
};
