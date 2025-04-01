import { useAtom } from "jotai";
import { anyErrorAtom, ErrorMessage } from "@/state/store";

export function useErrors() {
  const [errors, setErrors] = useAtom(anyErrorAtom);

  const addError = (message: string) => {
    setErrors((prevErrors) => {
      // Prevent adding a duplicate error
      if (prevErrors.some((error) => error.message === message)) {
        return prevErrors;
      }
      return [{ id: crypto.randomUUID(), message }, ...prevErrors];
    });
  };

  const removeError = (id: string) => {
    setErrors((prevErrors) => prevErrors.filter((error) => error.id !== id));
  };

  const clearErrors = () => {
    setErrors([]);
  };

  return { errors, addError, removeError, clearErrors };
}
