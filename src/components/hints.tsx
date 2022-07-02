import { Icon } from "@iconify/react";
import { FunctionComponent } from "preact";
import { useCommand } from "./useCommand";
import { Shortcuts } from "./shortcuts";

const Hints: FunctionComponent = () => {
  const { mainCommand } = useCommand();

  return (
    <div>
      <div
        id="hint_modal"
        className="modal cursor-pointer"
        style={{
          "--tw-bg-opacity": "0.8",
        }}
      >
        <div className="modal-box relative">
          <a href="#" className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </a>
          <h3 className="font-bold text-xl flex items-center">
            <Icon icon="akar-icons:triangle-alert" className="mr-2" /> Hints
          </h3>
          <div className="divider"></div>
          <ul>
            <li class="flex justify-between items-center my-2">
              <p className="text-lg">Shortcut to open search popup:</p>{" "}
              <Shortcuts command={mainCommand} />{" "}
            </li>{" "}
            <div className="divider"></div>
            <li class="flex justify-between items-center my-2">
              <p>Search History </p> Type{" "}
              <kbd className="kbd kbd-md ml-2">#</kbd>
            </li>{" "}
            <li class="flex justify-between items-center my-2">
              <p>Search Bookmarks</p> Type{" "}
              <kbd className="kbd kbd-md ml-2">@</kbd>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Hints;
