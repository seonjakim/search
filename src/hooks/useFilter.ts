import {
  KeyboardEvent,
  MouseEvent,
  useState,
} from 'react';

const useFilter = () => {
  const [filterKeywords, setFilterKeywords] = useState<
    Map<string, Set<string>>
  >(new Map());
  const onFilterKeywordsHandler = (
    e: MouseEvent | KeyboardEvent<HTMLInputElement>
  ) => {
    const targetNode = e.target as HTMLInputElement;
    if (!targetNode.dataset.element) return;
    const { name = "", value = "", checked = false } = targetNode;
    const newFilterKeywords = new Map([...filterKeywords]);
    if ((e as KeyboardEvent).key === "Enter") {
      if (value === "") {
        newFilterKeywords.delete(name);
      } else {
        newFilterKeywords.set(name, new Set([value]));
      }
      setFilterKeywords(newFilterKeywords);
      return;
    }
    const previousFilterList = newFilterKeywords.get(name) as Set<string>;
    if (checked) {
      if (previousFilterList)
        newFilterKeywords.set(name, previousFilterList.add(value));
      else newFilterKeywords.set(name, new Set([value]));
    } else {
      if (previousFilterList) {
        previousFilterList.delete(value);
        if (previousFilterList.size === 0) newFilterKeywords.delete(name);
      }
    }
    setFilterKeywords(newFilterKeywords);
  };

  return {
    filterKeywords,
    onFilterKeywordsHandler,
    setFilterKeywords,
    hasFilterKeywords: filterKeywords.size > 0,
  };
};

export default useFilter;
