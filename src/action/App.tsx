import { createRoot } from "react-dom/client";
import useUserSettings from "./hooks/useUserSettings";
import { KEYBOARD_BUTTONS, MouseButtons } from "../Types/UserSettings";
import {
  changeDownloadButton,
  changeKeyboardButtons,
  changeMouseButton,
} from "../shared/changeUserSettings";

export function App() {
  // Choose mouse buttons
  const [userSettings, setUserSettings] = useUserSettings();
  return (
    <>
      <fieldset>
        <legend>Mouse button: </legend>
        {Object.keys(MouseButtons).map((button) => (
          <label>
            <input
              type="checkbox"
              checked={userSettings?.inputSettings.mouseButton === button}
              onClick={() => {
                if (!userSettings) return;
                setUserSettings(
                  changeMouseButton(
                    userSettings,
                    button as keyof typeof MouseButtons
                  )
                );
              }}
            />
            {`${button}`}
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend>Keyboard buttons: </legend>
        {KEYBOARD_BUTTONS &&
          KEYBOARD_BUTTONS.map((keyboardButton) => (
            <label>
              <input
                type="checkbox"
                checked={userSettings?.inputSettings.keyboardButtons?.includes(
                  keyboardButton
                )}
                onClick={() => {
                  if (!userSettings) return;
                  if (
                    userSettings.inputSettings.keyboardButtons?.includes(
                      keyboardButton
                    )
                  ) {
                    setUserSettings(
                      changeKeyboardButtons(
                        userSettings,
                        userSettings.inputSettings.keyboardButtons.filter(
                          (button) => button !== keyboardButton
                        )
                      )
                    );
                  } else {
                    setUserSettings(
                      changeKeyboardButtons(userSettings, [
                        ...userSettings.inputSettings.keyboardButtons!,
                        keyboardButton,
                      ])
                    );
                  }
                }}
              />
              {` ${keyboardButton}`}
            </label>
          ))}
      </fieldset>
      <fieldset>
        <legend>Should download button show up?</legend>
        <label>
          Enabled:{" "}
          <input
            type="checkbox"
            checked={userSettings?.downloadButtonSettings.isEnabled}
            onClick={() => {
              if (!userSettings) return;
              setUserSettings(
                changeDownloadButton(
                  userSettings,
                  !userSettings?.downloadButtonSettings.isEnabled
                )
              );
            }}
          ></input>
        </label>
      </fieldset>
    </>
  );
}

const rootDOM = document.getElementById("root");
if (!rootDOM) console.error("No root element in the DOM");
const root = createRoot(rootDOM!);

root.render(<App />);
