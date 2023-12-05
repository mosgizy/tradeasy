import { useRef } from "react";

export const useRefs = () => {
  const refsByKey = useRef<Record<string,HTMLInputElement | null>>({})

  const setRef = (element: HTMLInputElement | null, key: string) => {
    refsByKey.current[key] = element;
  }

  return {refsByKey: refsByKey.current, setRef};
}