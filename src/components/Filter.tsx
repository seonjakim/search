type FilterProps = {
  filterList: Array<{ name: string; value: string; description?: string }>;
  filterHandler: (e: React.MouseEvent<Element, MouseEvent>) => void;
  filterName: string;
};

const Filter = ({ filterList, filterHandler, filterName }: FilterProps) => {
  return (
    <div onClick={filterHandler}>
      Filter
      {filterList.map((place) => (
        <div key={place.name}>
          <input
            type="checkbox"
            name={filterName}
            value={place.value}
            data-element="filter"
          />
          <label htmlFor={place.value}>{place.name}</label>
          {place?.description && <div>{place.description}</div>}
        </div>
      ))}
    </div>
  );
};

export default Filter;
