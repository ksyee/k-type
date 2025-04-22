import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="fixed left-0 top-0 p-16pxr">
      <ul>
        <li>
          <Link href="/">
            <h1 className="font-extralight text-white">
              K-<span className="font-semibold">TYPE</span>
            </h1>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
