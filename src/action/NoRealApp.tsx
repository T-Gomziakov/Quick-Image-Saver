import { createRoot } from "react-dom/client";
import { useState } from "react";

const ButtonSelector = () => {
  const [selectedMouseButton, setSelectedMouseButton] = useState("left");
  const [selectedKeyboardButtons, setSelectedKeyboardButtons] = useState({
    alt: false,
    shift: false,
    ctrl: false,
  });

  const handleMouseButtonChange = (event) => {
    setSelectedMouseButton(event.target.value);
  };

  const handleKeyboardButtonChange = (event) => {
    const { name, checked } = event.target;
    setSelectedKeyboardButtons((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const getSelectedCombination = () => {
    const keyboardButtons = Object.entries(selectedKeyboardButtons)
      .filter(([_, isSelected]) => isSelected)
      .map(([button]) => button);

    const keyboardPart =
      keyboardButtons.length > 0 ? ` + ${keyboardButtons.join(" + ")}` : "";

    return `${selectedMouseButton} mouse button${keyboardPart}`;
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "500px",
      }}
    >
      <h2>Mouse and Keyboard Button Selector</h2>

      {/* Mouse Buttons Section */}
      <div style={{ marginBottom: "25px" }}>
        <label
          htmlFor="mouse-select"
          style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
        >
          Select Mouse Button:
        </label>
        <select
          id="mouse-select"
          value={selectedMouseButton}
          onChange={handleMouseButtonChange}
          style={{
            padding: "8px 12px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
            width: "200px",
          }}
        >
          <option value="left">Left Mouse Button</option>
          <option value="right">Right Mouse Button</option>
          <option value="middle">Middle Mouse Button</option>
        </select>
      </div>

      {/* Keyboard Buttons Section */}
      <div style={{ marginBottom: "25px" }}>
        <fieldset
          style={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "15px",
          }}
        >
          <legend style={{ fontWeight: "bold", padding: "0 8px" }}>
            Keyboard Modifiers:
          </legend>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {[
              { id: "alt", label: "Alt" },
              { id: "shift", label: "Shift" },
              { id: "ctrl", label: "Ctrl" },
            ].map(({ id, label }) => (
              <label
                key={id}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <input
                  type="checkbox"
                  id={id}
                  name={id}
                  checked={selectedKeyboardButtons[id]}
                  onChange={handleKeyboardButtonChange}
                  style={{ width: "16px", height: "16px" }}
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Selected Combination Display */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          backgroundColor: "#f8f9fa",
          borderRadius: "4px",
          border: "1px solid #dee2e6",
        }}
      >
        <h3 style={{ margin: "0 0 8px 0", fontSize: "16px" }}>
          Selected Combination:
        </h3>
        <output
          style={{ fontSize: "18px", fontWeight: "bold", color: "#495057" }}
        >
          {getSelectedCombination()}
        </output>
      </div>

      {/* Reset Button */}
      <button
        type="button"
        onClick={() => {
          setSelectedMouseButton("left");
          setSelectedKeyboardButtons({ alt: false, shift: false, ctrl: false });
        }}
        style={{
          padding: "10px 20px",
          backgroundColor: "#6c757d",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Reset to Default
      </button>
    </div>
  );
};

const rootDOM = document.getElementById("root");
if (!rootDOM) console.error("No root element in the DOM");
const root = createRoot(rootDOM!);

root.render(<ButtonSelector />);
