import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pt-navbar mx-auto container px-5">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">
        <p className="text-blue-600">Return Home</p>
      </Link>
    </div>
  );
}