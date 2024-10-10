"use client";

import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import clientAuth from "@/app/firebase/clientAuth";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface PropsInterface {
  children: React.ReactNode;
  delay?: boolean;
  admin?: boolean;
}

function ProtectedRouteWrapper(props: PropsInterface) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const path = usePathname();

  useEffect(() => {
    return onAuthStateChanged(clientAuth, async (user) => {
      if (props.delay) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setIsAuthenticated(!!user);
      setIsLoading(false);
    });
  }, [props.delay]);

  const content: JSX.Element = isAuthenticated ? (
    <>{props.children}</>
  ) : (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-[#A6D3EF] to-[#EFF5FF]">
      <Link href={`/login?backTo=${path}`}>
        <Button className="bg-[#173563] hover:bg-[#1E4C8A]">
          Login to access this page
        </Button>
      </Link>
    </div>
  );

  return isLoading ? (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-[#A6D3EF] to-[#EFF5FF]">
      <PuffLoader color="white" />
    </div>
  ) : (
    content
  );
}

export default ProtectedRouteWrapper;
