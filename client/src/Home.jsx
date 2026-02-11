import { Outlet } from "react-router";

export default function Home() {
  return (
    <>
      <header>
        <h1>File Uploader</h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>2026 AnLaxina</p>
      </footer>
    </>
  );
}
