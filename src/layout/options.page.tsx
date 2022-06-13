import Navbar from "./navbar";
import { OptionsForm } from "../components/options-form";
import { useEffect, useState } from "preact/compat";
import ImportForm from "../components/import-form";

const OptionsPage = () => {
  const [hash, setHash] = useState("");

  useEffect(() => {
    if (window.location) setHash(window.location.hash);

    window.addEventListener("hashchange", () => {
      setHash(window.location.hash);
    });
  }, []);

  let ComponentToRender;

  switch (hash) {
    case "#import":
      ComponentToRender = ImportForm;
      break;
    default:
      ComponentToRender = OptionsForm;
  }

  return (
    <div className="w-full md:w-5/6 lg:w-[66%] mx-auto mt-2">
      <Navbar />
      <ComponentToRender />
    </div>
  );
};

export default OptionsPage;
