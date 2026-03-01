import { useCallback, useRef, useState } from "react";

interface Snapshot<T> {
  state: T;
}

const MAX_HISTORY = 50;

export function useUndoRedo<T>(initial: T) {
  const [state, setState] = useState<T>(initial);
  const past = useRef<Snapshot<T>[]>([]);
  const future = useRef<Snapshot<T>[]>([]);

  const set = useCallback((updater: T | ((prev: T) => T)) => {
    setState((prev) => {
      past.current.push({ state: prev });
      if (past.current.length > MAX_HISTORY) past.current.shift();
      future.current = [];
      return typeof updater === "function" ? (updater as (prev: T) => T)(prev) : updater;
    });
  }, []);

  const undo = useCallback(() => {
    setState((current) => {
      const prev = past.current.pop();
      if (!prev) return current;
      future.current.push({ state: current });
      return prev.state;
    });
  }, []);

  const redo = useCallback(() => {
    setState((current) => {
      const next = future.current.pop();
      if (!next) return current;
      past.current.push({ state: current });
      return next.state;
    });
  }, []);

  const canUndo = past.current.length > 0;
  const canRedo = future.current.length > 0;

  // Reset history (e.g. on draft load or clear)
  const resetHistory = useCallback((newState: T) => {
    past.current = [];
    future.current = [];
    setState(newState);
  }, []);

  return { state, set, undo, redo, canUndo, canRedo, resetHistory };
}
