import { useLayoutEffect, useRef } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "area[href]",
  "button",
  "input:not([type='hidden'])",
  "select",
  "textarea",
  "summary",
  "[tabindex]",
  "[contenteditable]:not([contenteditable='false'])",
].join(",");

function focusableElements(dialog) {
  const view = dialog.ownerDocument.defaultView;
  return Array.from(dialog.querySelectorAll(FOCUSABLE_SELECTOR))
    .filter((element) => {
      const editable = element.isContentEditable && !element.hasAttribute("tabindex");
      if ((!editable && element.tabIndex < 0) || element.matches(":disabled")) return false;
      if (element.closest("[hidden], [inert], [aria-hidden='true']")) return false;
      const style = view.getComputedStyle(element);
      return style.visibility !== "hidden" && style.visibility !== "collapse" && element.getClientRects().length > 0;
    })
    .sort((a, b) => (a.tabIndex > 0 ? a.tabIndex : Infinity) - (b.tabIndex > 0 ? b.tabIndex : Infinity));
}

function inertBackground(dialog) {
  const previous = new Map();
  const boundary = dialog.closest(".site") || dialog.ownerDocument.body;
  let branch = dialog;

  // Keep the entire overlay branch active, including a drawer's backdrop layer.
  while (branch && branch !== boundary) {
    const parent = branch.parentElement;
    if (!parent) break;
    for (const sibling of parent.children) {
      if (sibling === branch) continue;
      previous.set(sibling, sibling.getAttribute("inert"));
      sibling.setAttribute("inert", "");
    }
    branch = parent;
  }

  return () => {
    for (const [element, value] of previous) {
      if (value === null) element.removeAttribute("inert");
      else element.setAttribute("inert", value);
    }
  };
}

export function useDialogAccessibility(open, onClose, dialogRef) {
  const closeRef = useRef(onClose);

  useLayoutEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;

    const document = dialog.ownerDocument;
    const previousFocus = document.activeElement;
    const previousTabIndex = dialog.getAttribute("tabindex");
    if (previousTabIndex === null) dialog.setAttribute("tabindex", "-1");
    const restoreBackground = inertBackground(dialog);
    const focusable = focusableElements(dialog);
    const closeControl = focusable.find((element) => element.matches(".close-button, [data-dialog-close], button[aria-label^='Close']"));
    (closeControl || focusable[0] || dialog).focus({ preventScroll: true });

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        closeRef.current?.();
        return;
      }
      if (event.key !== "Tab") return;

      // Re-query each time because color selection can change roving tab stops.
      const controls = focusableElements(dialog);
      const first = controls[0];
      const last = controls[controls.length - 1];
      const active = document.activeElement;
      if (!first) {
        event.preventDefault();
        dialog.focus({ preventScroll: true });
      } else if (!controls.includes(active)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus({ preventScroll: true });
      } else if ((event.shiftKey && active === first) || (!event.shiftKey && active === last)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus({ preventScroll: true });
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      restoreBackground();
      if (previousTabIndex === null) dialog.removeAttribute("tabindex");
      if (previousFocus?.isConnected) previousFocus.focus?.({ preventScroll: true });
    };
  }, [open, dialogRef]);
}
