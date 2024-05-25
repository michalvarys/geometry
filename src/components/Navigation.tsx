export function Navigation() {
  return (
    <nav
      id="navigation"
      className="flex flex-row space-x-4 justify-center items-center top-0 h-[50px] z-10 bg-black right-0 left-0"
    >
      <li>
        <a href="/trismegistus">Trismegistus</a>
      </li>
      <li>
        <a href="/flowers">Flowers</a>
      </li>
      <li>
        <a href="/magic-circle">Magic Circle</a>
      </li>
      <li>
        <a href="/torus">Torus</a>
      </li>
      <li>
        <a href="/cube-of-space">Cube of space</a>
      </li>
      <li>
        <a href="/zodiac">Zodiac</a>
      </li>
    </nav>
  );
}
