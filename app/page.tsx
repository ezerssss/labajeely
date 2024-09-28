// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">[laanding page]</h1>
      <p className="mt-4 text-gray-600">landing page...</p>

      
      <div className="mt-8">
        <Link href="/login" className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
          Login Page
        </Link>

      </div>
    </div>
  );
}
