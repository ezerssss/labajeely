"use client";

import { useState } from "react";
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
import { Progress } from "@/components/ui/progress";
import { Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

function FormStepOne() {
  return (
    <>
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
    </>
  );
}

function FormStepTwo({
  profilePhoto,
  handleProfileUpload,
}: {
  profilePhoto: string | null;
  handleProfileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <div className="text-center">
        <label htmlFor="profileUpload" className="cursor-pointer">
          {profilePhoto ? (
            <Image
              src={profilePhoto}
              alt="Profile Photo"
              width={100}
              height={100}
              className="mx-auto rounded-full"
            />
          ) : (
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gray-200">
              <Upload size={30} className="text-gray-500" />
            </div>
          )}
        </label>
        <input
          id="profileUpload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleProfileUpload}
        />
      </div>
      <FormInput
        label="Laundry Shop Name"
        type="text"
        placeholder="Enter your shop name"
      />
      <FormInput
        label="Number of Machines"
        type="number"
        placeholder="Enter number of machines"
      />
    </>
  );
}

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  function handleProfileUpload(e: React.ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhoto(URL.createObjectURL(file));
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#A6D3EF] to-[#EFF5FF] p-4">
      <Card className="h-[600px] w-[1000px] overflow-hidden bg-white shadow-lg md:flex">
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

        <div className="flex w-3/5 flex-col justify-center p-8">
          <div className="mt-4">
            <Progress value={(step / 2) * 100} className="mx-auto w-1/3" />
            <div className="mx-auto mt-2 text-center text-gray-600">
              {step} of 2
            </div>
          </div>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
            <CardDescription>
              {step === 1
                ? "Create an account to get started."
                : "Complete your profile to continue."}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-4">
              {step === 1 ? (
                <FormStepOne />
              ) : (
                <FormStepTwo
                  profilePhoto={profilePhoto}
                  handleProfileUpload={handleProfileUpload}
                />
              )}
            </form>
          </CardContent>

          <CardFooter className="mt-4 flex w-full flex-col items-center space-y-4">
            <div className="flex w-full justify-between">
              {step === 1 ? (
                <Button
                  onClick={() => setStep(2)}
                  className="ml-auto bg-[#173563] text-white hover:bg-[#1E4C8A]"
                >
                  Next
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => setStep(1)}
                    className="bg-gray-500 text-white hover:bg-gray-600"
                  >
                    Previous
                  </Button>
                  <Button className="ml-auto bg-[#173563] text-white hover:bg-[#1E4C8A]">
                    Sign Up
                  </Button>
                </>
              )}
            </div>

            <div className="mt-4 w-full text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Log In
              </Link>
            </div>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
