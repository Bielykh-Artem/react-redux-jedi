import { useEffect, useState } from "react";

export interface SearchDebounceOptions {
  trim: boolean;
  toLowerCase: boolean;
  regExp: RegExp;
  replaceTo: string;
}

export const escapeRegExp = (searchStr: string | undefined, replace: RegExp, replaceTo: string) => {
  if (!searchStr || (searchStr && searchStr.length === 0)) {
    return searchStr;
  }

  return searchStr.replace(replace, replaceTo ? replaceTo : "");
};

export const prepareSearchString = (searchStr: string | undefined, options?: SearchDebounceOptions) => {
  if (!searchStr || (searchStr && searchStr.length === 0)) {
    return searchStr;
  }

  if (options) {
    let preparedString = searchStr;
    const { trim = true, toLowerCase = true, regExp = /[&\/\\#,+()$~%.'":*?<>{}]/g, replaceTo = "" } = options;

    if (trim) {
      preparedString = preparedString.trim();
    }

    if (toLowerCase) {
      preparedString = preparedString.toLowerCase();
    }

    if (regExp) {
      preparedString = escapeRegExp(preparedString, regExp, replaceTo) as string;
    }
  }

  return searchStr.trim().toLowerCase();
};

export default function useSearchDebounce(
  searchStr: string | undefined,
  delay: number,
  minStrLength?: number,
  options?: SearchDebounceOptions,
) {
  const preparedStr = prepareSearchString(searchStr, options);
  const [debouncedValue, setDebouncedValue] = useState(preparedStr);
  useEffect(() => {
    const handler = setTimeout(() => {
      if (minStrLength && preparedStr && preparedStr.length < minStrLength) {
        setDebouncedValue("");
        return;
      }
      setDebouncedValue(preparedStr);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [preparedStr, delay, minStrLength]);

  return debouncedValue;
}
