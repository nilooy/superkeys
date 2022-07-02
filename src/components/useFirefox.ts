import { useEffect, useState } from "preact/compat";
import { checkFirefoxBrowser } from "../utils";

export const useFirefox = () => {
  const [isFirefox, setIsFirefox] = useState<boolean | string>("unknown");

  useEffect(() => {
    checkFirefoxBrowser().then((isIt: boolean) => setIsFirefox(isIt));
  }, []);

  return { isFirefox };
};
