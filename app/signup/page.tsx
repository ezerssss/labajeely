"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FormInput = ({ label, type, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <Input type={type} placeholder={placeholder} className="w-full mt-1 rounded-full" />
  </div>
);

export default function SignupPage() {
  const [page, setPage] = useState(1);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(URL.createObjectURL(file));
    }
  };

  const renderPageContent = () => {
    if (page === 1) {
      return (
        <>
          <FormInput label="Username" type="text" placeholder="Enter your username" />
          <FormInput label="Password" type="password" placeholder="Enter your password" />
        </>
      );
    } else {
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
                  className="rounded-full mx-auto"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mx-auto">
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
          <FormInput label="Laundry Shop Name" type="text" placeholder="Enter your shop name" />
          <FormInput label="Number of Machines" type="number" placeholder="Enter number of machines" />
        </>
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#A6D3EF] to-[#EFF5FF] p-4">
    <Card className="w-[1000px] h-[600px] overflow-hidden bg-white shadow-lg md:flex">
    <div className="relative w-2/5">
          <Image
            src="/images/log-in-bg-2.JPG" 
            alt="Illustration"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative p-4">
            <Image
              src="/images/name-logo.png"
              alt="Brand Logo"
              width={250}
              height={100}
              className="top-0 left-0"
            />
          </div>
        </div>
        <div className="w-3/5 p-8"> {/*flex flex-col justify-center */}
          <div className="mt-4">
            <Progress value={(page / 2) * 100} className="w-1/3 mx-auto" />
            <div className="mx-auto text-gray-600 text-center mt-2">{page} of 2</div>
          </div>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
            <CardDescription>
              {page === 1 ? "Create an account to get started." : "Complete your profile to continue."}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form className="space-y-4">{renderPageContent()}</form>
          </CardContent>

          <CardFooter className="flex flex-col items-center space-y-4 mt-4 w-full">
            <div className="w-full flex justify-between">
              {page === 2 && (
                <Button onClick={() => setPage(1)} className="bg-gray-500 hover:bg-gray-600 text-white">
                  Previous
                </Button>
              )}
              <Button
                onClick={() => (page === 1 ? setPage(2) : {})}
                className="ml-auto bg-[#173563] hover:bg-[#1E4C8A] text-white"
              >
                {page === 1 ? "Next" : "Sign Up"}
              </Button>
            </div>

            <div className="mt-4 text-sm text-gray-600 text-center w-full">
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
