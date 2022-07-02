import { useEffect, useState } from "preact/compat";
import browser from "webextension-polyfill";

export const useCommand = () => {
  const [mainCommand, setMainCommand] = useState<string>("");

  useEffect(() => {
    browser.commands.getAll().then((cmds: any[]) => {
      console.log({ cmds });
      if (cmds.length) {
        const mainCmd = cmds.find(
          (cmd) =>
            cmd.name === "_execute_browser_action" ||
            cmd.name === "_execute_action"
        );
        setMainCommand(mainCmd.shortcut);
      } else {
        browser.runtime.getPlatformInfo().then((platform) => {
          setMainCommand(platform.os === "mac" ? "Alt+Space" : "Ctrl+Space");
        });
      }
    });
  }, []);

  return { mainCommand };
};
