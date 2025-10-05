import { createRoot } from "react-dom/client";
import useUserSettings from "./hooks/useUserSettings";
import {
  KEYBOARD_BUTTONS,
  MouseButtons,
  type KeyboardButtons,
} from "../Types/UserSettings";

export function App() {
  // Choose mouse buttons
  const [mouseButton, setMouseButton, keyboardButtons, setKeyboardButtons] =
    useUserSettings();
  return (
    <>
      <fieldset>
        <legend>Mouse button: </legend>
        {Object.keys(MouseButtons).map((button) => (
          <label>
            <input
              type="checkbox"
              checked={mouseButton === button}
              onClick={() => {
                setMouseButton(button as keyof typeof MouseButtons);
              }}
            />
            {`${button}`}
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend>Keyboard buttons: </legend>
        {KEYBOARD_BUTTONS &&
          KEYBOARD_BUTTONS?.map((keyboardButton) => (
            <label>
              <input
                type="checkbox"
                checked={keyboardButtons?.includes(keyboardButton)}
                onClick={() =>
                  keyboardButtons?.includes(keyboardButton)
                    ? setKeyboardButtons(
                        keyboardButtons!.filter(
                          (button) => button !== keyboardButton
                        )
                      )
                    : setKeyboardButtons([...keyboardButtons!, keyboardButton])
                }
              />{" "}
              {keyboardButton}
            </label>
          ))}
      </fieldset>
    </>
  );
}

const rootDOM = document.getElementById("root");
if (!rootDOM) console.error("No root element in the DOM");
const root = createRoot(rootDOM!);

root.render(<App />);
