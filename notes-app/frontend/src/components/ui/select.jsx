import React, { createContext, useContext, useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const SelectContext = createContext(null);

function Select({ value, onValueChange, children }) {
  const [open, setOpen] = useState(false);
  const itemsRef = useRef({});

  const registerItem = (val, label) => {
    if (val == null) return;
    itemsRef.current[val] = label;
  };

  return (
    <SelectContext.Provider
      value={{ value, onValueChange, open, setOpen, registerItem, itemsRef }}
    >
      <div className="inline-block w-full">{children}</div>
    </SelectContext.Provider>
  );
}

function SelectTrigger({ children, className = "" }) {
  const ctx = useContext(SelectContext);
  if (!ctx) return null;

  return (
    <button
      type="button"
      onClick={() => ctx.setOpen(!ctx.open)}
      className={cn(
        "flex w-full items-center justify-between gap-2 rounded-md border bg-background px-3 py-2 text-sm shadow-sm",
        className
      )}
    >
      {children}
    </button>
  );
}

function SelectValue({ placeholder = "Select...", className = "" }) {
  const ctx = useContext(SelectContext);
  if (!ctx) return null;

  const { value, itemsRef } = ctx;
  const label = value != null ? itemsRef.current[value] ?? value : placeholder;

  return <span className={cn("truncate text-sm", className)}>{label}</span>;
}

function SelectContent({ children, className = "" }) {
  const ctx = useContext(SelectContext);
  if (!ctx) return null;

  if (!ctx.open) return null;

  return (
    <div className={cn("mt-2 rounded-md border bg-popover shadow-lg p-1", className)}>
      {children}
    </div>
  );
}

function SelectItem({ value, children, className = "" }) {
  const ctx = useContext(SelectContext);
  useEffect(() => {
    if (ctx) ctx.registerItem(value, typeof children === "string" ? children : String(children));
  }, [ctx, value, children]);

  if (!ctx) return null;

  const handleClick = () => {
    ctx.onValueChange?.(value);
    ctx.setOpen(false);
  };

  const selected = ctx.value === value;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      className={cn(
        "cursor-pointer rounded px-3 py-2 text-sm hover:bg-muted",
        selected ? "bg-muted font-medium" : "",
        className
      )}
    >
      {children}
    </div>
  );
}

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue };
