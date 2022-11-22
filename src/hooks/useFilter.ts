import {
  MouseEvent,
  useState,
} from 'react';

const useFilter = () => {
  const [filter, setFilter] = useState<Map<string, Set<string>>>(new Map());
  const filterHandler = (e: MouseEvent) => {
    const targetNode = e.target as HTMLInputElement;
    if (!targetNode.dataset.element) return;
    const { name = "", value = "", checked = false } = targetNode;
    const newFilter = new Map([...filter]);
    const previousFilterList = newFilter.get(name);
    if (checked) {
      if (previousFilterList)
        newFilter.set(name, previousFilterList.add(value));
      else newFilter.set(name, new Set([value]));
    } else {
      if (previousFilterList) {
        previousFilterList.delete(value);
        if (previousFilterList.size === 0) newFilter.delete(name);
      }
    }
    setFilter(newFilter);
  };

  return { filter, filterHandler };
};

export default useFilter;
