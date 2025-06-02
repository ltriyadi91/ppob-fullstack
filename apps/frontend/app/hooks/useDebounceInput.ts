import { useEffect, useRef } from 'react';

type autoSaveType = {
  callback: () => void;
  delay?: number;
};

const useDebounceInput = ({ callback, delay = 3000 }: autoSaveType) => {
  const keyPressedRef = useRef<boolean>(false);
  const saveTimeout = useRef(null);

  useEffect(() => {
    const handleKeyPress = () => {
      console.log('handleKeyPress');
      keyPressedRef.current = true;
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
      clearAutoSave();
    };
  }, []);

  const handleChangeForm = () => {
    console.log('handleChangeForm');
    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
      saveTimeout.current = null;
    }

    //@ts-expect-error setTimeout return type is incompatible with useRef type
    saveTimeout.current = setTimeout(() => {
      if (keyPressedRef.current) {
        console.log('handleChangeForm');
        callback();
        keyPressedRef.current = false;
      }
    }, delay);
  };

  const clearAutoSave = () => {
    //@ts-expect-error setTimeout return type is incompatible with useRef type
    clearTimeout(saveTimeout.current);
    saveTimeout.current = null;
    keyPressedRef.current = false;
  };

  return {
    handleChangeForm,
    clearAutoSave,
  };
};

export default useDebounceInput;
