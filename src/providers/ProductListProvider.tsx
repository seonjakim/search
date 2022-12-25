import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'

import { ProductListType } from '../api/ProductList.type'
import useFilter from '../hooks/useFilter'
import { decodedQueryString } from '../utils'

type ProductListProviderProps = {
  children: ReactNode
}
type FilterKeyType = 'place' | 'type'

type ProductListContextType = {
  setInitialProductList: Dispatch<SetStateAction<Array<ProductListType>>>
  filteredProductList: Array<ProductListType>
  setFilteredProductList: Dispatch<SetStateAction<Array<ProductListType>>>
  filterKeywords: Map<string, Set<string>>
  onFilterKeywordsHandler: (
    e:
      | React.MouseEvent<Element, MouseEvent>
      | React.KeyboardEvent<HTMLInputElement>
  ) => void
  setIsUpdated: Dispatch<SetStateAction<boolean>>
  initialProductList: Array<ProductListType>
}

const ProductListContext = React.createContext<ProductListContextType>({
  setInitialProductList: () => {},
  filteredProductList: [],
  setFilteredProductList: () => {},
  filterKeywords: new Map(),
  onFilterKeywordsHandler: (e) => {},
  setIsUpdated: () => {},
  initialProductList: [],
})

export const useProductListContext = () => useContext(ProductListContext)
const ProductListProvider = ({ children }: ProductListProviderProps) => {
  const [initialProductList, setInitialProductList] = useState<
    Array<ProductListType>
  >([])
  const [filteredProductList, setFilteredProductList] = useState<
    Array<ProductListType>
  >([])
  const [isUpdated, setIsUpdated] = useState(true)
  const {
    filterKeywords,
    onFilterKeywordsHandler,
    setFilterKeywords,
    hasFilterKeywords,
  } = useFilter()

  useEffect(() => {
    if (initialProductList.length || isUpdated) {
      const filtered = decodedQueryString(window.location.pathname)
      // console.log("이게 안되나?", filtered, initialProductList);
      setFilterKeywords(decodedQueryString(window.location.pathname))
      onFilterApplied(initialProductList, filtered)
      setIsUpdated(false)
    }
  }, [initialProductList, isUpdated])
  const isSubString = (
    originString: string,
    compareString: string
  ): boolean => {
    return originString.toLowerCase().includes(compareString)
  }

  const onFilterApplied = (
    initialProductList: Array<ProductListType>,
    selectedFilter: Map<string, Set<string>>
  ) => {
    let newFilteredProductList = initialProductList
    if (selectedFilter.size) {
      newFilteredProductList = initialProductList.filter((productList) => {
        const existKeywords = Array.from(
          selectedFilter.keys()
        ).filter((keyword) =>
          keyword === 'name'
            ? isSubString(
                productList.club.name,
                Array.from(selectedFilter.get(keyword) || []).join('')
              )
            : selectedFilter
                .get(keyword)
                ?.has(productList.club[keyword as FilterKeyType])
        )
        if (existKeywords.length) return productList
      })
    }
    setFilteredProductList(() => newFilteredProductList)
  }

  const initialValue = {
    setInitialProductList,
    filteredProductList,
    setFilteredProductList,
    filterKeywords,
    onFilterKeywordsHandler,
    setIsUpdated,
    initialProductList,
  }
  return (
    <ProductListContext.Provider value={initialValue}>
      {children}
    </ProductListContext.Provider>
  )
}

export default ProductListProvider
