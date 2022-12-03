import {
  Fragment,
  KeyboardEvent,
  useState,
} from 'react';

import { css } from '@emotion/react';

import Test from '../../assets/filter.svg';
import {
  clubTypes,
  places,
} from '../../constants/Filter';
import { useProductListContext } from '../../providers/ProductListProvider';
import {
  decodedQueryString,
  encodedQueryString,
} from '../../utils';
import Filter from '../Filter';
import Portal from '../Portal';

const SearchBar = () => {
  const {
    filterKeywords,
    onFilterKeywordsHandler,
    setIsUpdated,
    setFilteredProductList,
  } = useProductListContext();

  const isSubString = (
    originString: string,
    compareString: string
  ): boolean => {
    return originString.toLowerCase().includes(compareString);
  };
  const onEnterKeyPressed = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const targetNode = e.target as HTMLInputElement;
    // onFilterKeywordsHandler(e);
    // 현재 filtered에서 다시 filter해야하는거임....
    // empty value가 들어왔을때, 원래 있는 filter 기준으로 업데이트해줘야함
    // query string도 name은 따로 update해줘야할듯

    setFilteredProductList((prev) =>
      prev.filter((product) => isSubString(product.club.name, targetNode.value))
    );
    updateQueryString(targetNode.name, targetNode.value);
  };

  const updateQueryString = (key: string, value: string) => {
    const currentFilterMap = decodedQueryString(window.location.pathname);
    if (value === "") currentFilterMap.delete(key);
    else currentFilterMap.set(key, new Set([value]));

    let encodedUrl = encodedQueryString(currentFilterMap);
    history.pushState(null, "", encodedUrl);
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onFilterApplyButtonClick = () => {
    let encodedUrl = encodedQueryString(filterKeywords);
    history.pushState(null, "", encodedUrl);
    setIsModalOpen(false);
    setIsUpdated(true);
  };
  return (
    <Fragment>
      <div css={searchBarContainer}>
        <input
          data-element="filter"
          name="name"
          type="text"
          defaultValue={Array.from(
            filterKeywords.get("name")?.values() || []
          ).join("")}
          onKeyDown={(e) => onEnterKeyPressed(e)}
        />
        <button onClick={() => setIsModalOpen(true)}>
          <img src={Test} alt="filter svg" />
        </button>
      </div>
      <Portal isOpen={isModalOpen}>
        <button onClick={() => setIsModalOpen(false)}>X</button>
        <Filter title="장소" filterName="place" filterList={places} />
        <Filter title="클럽 유형" filterName="type" filterList={clubTypes} />
        <button onClick={onFilterApplyButtonClick}>적용</button>
      </Portal>
    </Fragment>
  );
};

export default SearchBar;

const searchBarContainer = css({
  display: "flex",
  alignItems: "center",
});
