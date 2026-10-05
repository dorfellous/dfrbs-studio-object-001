import { useId, useRef } from "react";
import { ArrowRight, Minus, Plus, X } from "@phosphor-icons/react";
import { asset, OBJECTS } from "./catalog.js";
import { useDialogAccessibility } from "./useDialogAccessibility.js";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function BagPanel({ open, onClose, items = [], onQuantityChange, onRemove }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const titleId = useId();
  const noteId = useId();
  useDialogAccessibility(open, onClose, dialogRef);

  if (!open) return null;

  const lines = items.map((item) => {
    const object = OBJECTS[item.objectKey];
    const colorway = object.colorways[item.color];
    const unitPrice = Number(object.price.replace(/[^\d.]/g, ""));
    return { ...item, object, colorway, unitPrice, linePrice: unitPrice * item.quantity };
  });
  const itemCount = lines.reduce((count, item) => count + item.quantity, 0);
  const total = lines.reduce((sum, item) => sum + item.linePrice, 0);

  const removeItem = (item) => {
    // Keep focus in the dialog when the focused line is removed.
    closeRef.current?.focus({ preventScroll: true });
    onRemove(item.objectKey, item.color);
  };

  return (
    <div className="atelier-bag" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <aside
        ref={dialogRef}
        className="bag-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={noteId}
        tabIndex={-1}
      >
        <header className="bag-header">
          <img className="bag-wordmark" src={asset("wordmark-white.png")} alt="DFRBS Studio" />
          <button ref={closeRef} className="bag-close" data-dialog-close type="button" onClick={onClose} aria-label="Close bag">
            <X size={24} weight="light" aria-hidden="true" />
          </button>
          <div className="bag-heading">
            <h2 id={titleId}>YOUR BAG</h2>
            <span className="bag-count" aria-live="polite" aria-atomic="true">
              {String(itemCount).padStart(2, "0")} {itemCount === 1 ? "ITEM" : "ITEMS"}
            </span>
          </div>
        </header>

        {lines.length ? (
          <ul className="bag-lines" aria-label="Bag items">
            {lines.map((item) => (
              <li className="bag-line" key={`${item.objectKey}-${item.color}`} data-object={item.objectKey} data-color={item.color}>
                <div className="bag-line-art">
                  <img className="bag-line-image" src={item.colorway.product} alt={`${item.colorway.label} ${item.object.name}`} />
                </div>
                <div className="bag-line-copy">
                  <span className="bag-line-code">OBJECT {item.object.code} / {item.colorway.label}</span>
                  <h3 className="bag-line-title">{item.object.name}</h3>
                  <span className="bag-unit-price">{currency.format(item.unitPrice)} each</span>
                  <div className="bag-line-actions">
                    <div className="bag-quantity" role="group" aria-label={`${item.colorway.label} ${item.object.name} quantity`}>
                      <button
                        type="button"
                        className="bag-quantity-button"
                        aria-label={`Decrease ${item.colorway.label} ${item.object.name} quantity`}
                        disabled={item.quantity <= 1}
                        onClick={() => onQuantityChange(item.objectKey, item.color, item.quantity - 1)}
                      >
                        <Minus size={16} aria-hidden="true" />
                      </button>
                      <span className="bag-quantity-value" aria-live="polite" aria-atomic="true">{item.quantity}</span>
                      <button
                        type="button"
                        className="bag-quantity-button"
                        aria-label={`Increase ${item.colorway.label} ${item.object.name} quantity`}
                        onClick={() => onQuantityChange(item.objectKey, item.color, item.quantity + 1)}
                      >
                        <Plus size={16} aria-hidden="true" />
                      </button>
                    </div>
                    <button className="bag-remove" type="button" onClick={() => removeItem(item)} aria-label={`Remove ${item.colorway.label} ${item.object.name} from bag`}>REMOVE</button>
                  </div>
                </div>
                <strong className="bag-line-price">{currency.format(item.linePrice)}</strong>
              </li>
            ))}
          </ul>
        ) : (
          <div className="bag-empty" role="status">
            <h3>NOTHING HERE. YET.</h3>
            <p>Explore the objects and choose your colorway.</p>
          </div>
        )}

        <footer className="bag-footer">
          <div className="bag-total">
            <span>TOTAL</span>
            <strong aria-live="polite" aria-atomic="true">{currency.format(total)}</strong>
          </div>
          <p className="bag-note" id={noteId}>Studio prototype — checkout is not connected.</p>
          <button className="bag-continue" type="button" onClick={onClose}>
            CONTINUE EXPLORING <ArrowRight size={20} weight="light" aria-hidden="true" />
          </button>
        </footer>
      </aside>
    </div>
  );
}
