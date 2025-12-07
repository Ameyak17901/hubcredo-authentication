import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { SignInForm } from "@/components/forms/signInForm";
import { Link } from "react-router";

export const SignInPage = () => {
  return (
    <div className="flex w-full justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-xl text-center font-semibold">
          Sign In
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
        <CardFooter>
          <span>Don&apos;t have an account? To create click</span>
          <Link to="/sign-up" className="underline text-decoration">
            {" "}
            here
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};
