export default function Navbar() {
  return (
    <div className="flex items-center justify-between">
      <a
        href="/"
        className="text-2xl font-semibold underline underline-offset-2"
      >
        Forma
      </a>
      <div>
        <a className={`mr-2 hover:underline`} href="/">
          Upload
        </a>
        <a className={`hover:underline`} href="/browse">
          Browse
        </a>
      </div>
    </div>
  );
}
