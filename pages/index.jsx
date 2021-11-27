import Link from "next/link";
export default function Home() {
  return <div>
    <Link href='./movie'>
      <a>
        movie
      </a>
    </Link>
    <Link href='./tv'>
      <a>
        tv
      </a>
    </Link>
  </div>;
}
