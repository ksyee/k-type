import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="p-16pxr fixed left-0 top-0">
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
