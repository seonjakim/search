import { useProductListContext } from '../../providers/ProductListProvider';

type FilterProps = {
  filterList: Array<{ name: string; value: string; description?: string }>;
  filterName: string;
  title: string;
};

const Filter = ({ filterList, filterName, title }: FilterProps) => {
  const { onFilterKeywordsHandler, filterKeywords } = useProductListContext();
  return (
    <div onClick={onFilterKeywordsHandler}>
      <h4>{title}</h4>
      {filterList.map((place) => (
        <div key={place.name}>
          <input
            type="checkbox"
            name={filterName}
            value={place.value}
            data-element="filter"
            defaultChecked={filterKeywords.get(filterName)?.has(place.value)}
          />
          <label htmlFor={place.value}>{place.name}</label>
          {place?.description && <div>{place.description}</div>}
        </div>
      ))}
    </div>
  );
};

export default Filter;
