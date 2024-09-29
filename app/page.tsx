import Link from "next/link";
import Board from "@/components/kanban";
import React from "react";

function HomePage() {
  return (
    <main className="h-full w-screen p-5">
      <Board />
      
      <div className="mt-8">
        <Link href="/login" className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
          Login Page
        </Link>
      </div>
    </main>
  );
}

export default HomePage;
