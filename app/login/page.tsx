import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import Image from "next/image";

function FormInput({
  label,
  type,
  placeholder,
}: {
  label: string;
  type: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <Input
        type={type}
        placeholder={placeholder}
        className="mt-1 w-full rounded-full"
      />
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#A6D3EF] to-[#EFF5FF] p-4">
      <Card className="w-full max-w-4xl overflow-hidden bg-white shadow-lg md:flex">
        <div className="relative w-2/5">
          <Image
            src="/images/login/log-in-bg-2.JPG"
            alt="Illustration"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="relative p-4">
            <Image
              src="/images/logo/name-logo.png"
              alt="Brand Logo"
              width={250}
              height={100}
              className="left-0 top-0"
            />
          </div>
        </div>
        <div className="w-3/5 p-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
          </CardHeader>

          <CardContent>
            <form className="space-y-4">
              <FormInput
                label="Username"
                type="text"
                placeholder="Enter your username"
              />
              <FormInput
                label="Password"
                type="password"
                placeholder="Enter your password"
              />
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                  <Checkbox id="rememberMe" />
                  <label
                    htmlFor="rememberMe"
                    className="ml-1 text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-500 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col items-center space-y-4">
            <Button className="w-full bg-[#173563] hover:bg-[#1E4C8A]">
              Login
            </Button>
            <div className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </div>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
