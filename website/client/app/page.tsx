import Link from "next/link";
import clientPromise from "../lib/mongodb";
import Search from "../components/Search";

export default async function Page() {
  return (
    <div>
      <Search></Search>
    </div>
  );
}
