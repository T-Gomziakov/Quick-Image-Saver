import downloadFromUrl from "../utils/downloadFromUrl";
import { type UserSettings } from "../../Types/UserSettings";

export default function listenToHovers(UserSettings: UserSettings): () => void {
  // Respect user settings
  if (!UserSettings.downloadButtonSettings.isEnabled) return () => {};
  // Create the button element so that we don't have to re-render it every time we move the mouse on the image
  const btn = document.createElement("button");
  btn.innerText = "Download";
  btn.style.position = "absolute";
  btn.style.height = "3rem";

  btn.onclick = () => {
    const link = (hoveredElement as HTMLImageElement).src;
    if (link) downloadFromUrl(link);
  };

  // Track what element we are currently hovering over
  let currentMousePosition = { x: 0, y: 0 };
  let hoveredElement: HTMLImageElement | undefined = undefined;
  let hasMouseMoved = false;

  function updateHoveredElement() {
    hoveredElement = document
      .elementsFromPoint(currentMousePosition.x, currentMousePosition.y)
      .find((element: Element) => element instanceof HTMLImageElement);
  }

  function alignButton() {
    if (!hoveredElement) return;
    const { left: heLeft, bottom: heBottom } =
      hoveredElement.getBoundingClientRect();
    // Make sure the button is visible at the bottom of the image; or bottom of screen if the image bottom is not visible
    const bottom =
      heBottom > window.innerHeight
        ? window.innerHeight + window.scrollY - btn.offsetHeight
        : heBottom + window.scrollY - btn.offsetHeight;
    const left = heLeft > 0 ? heLeft : window.scrollX;
    btn.style.top = `${bottom}px`;
    btn.style.left = `${left}px`;
  }

  function handleMouseOver(event?: MouseEvent) {
    if (event) {
      currentMousePosition = { x: event.x, y: event.y };
      hasMouseMoved = true;
    }
    updateHoveredElement();
    if (!hasMouseMoved) return;
    if (hoveredElement) {
      document.body.appendChild(btn);
      alignButton();
    } else if (document.body.contains(btn)) {
      document.body.removeChild(btn);
    }
  }

  // Unfortunately, have to give this function a name so we can remove the event later
  function handleScroll() {
    handleMouseOver();
  }

  document.addEventListener("mousemove", handleMouseOver);
  document.addEventListener("scroll", handleScroll);

  return () => {
    document.removeEventListener("mousemove", handleMouseOver);
    document.removeEventListener("scroll", handleScroll);
  };
}
