import { useEffect, useState } from "react";

export default function useHashRoute() {
  const [id, setId] = useState(() => window.location.hash.slice(1) || null);

  useEffect(() => {
    const onHashChange = () => setId(window.location.hash.slice(1) || null);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return id;
}
