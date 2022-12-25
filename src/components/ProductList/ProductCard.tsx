import { useState } from 'react'

import { css } from '@emotion/react'

import { ProductListType } from '../../api/ProductList.type'
import Portal from '../Portal/index'
import ProductDetails from './ProductDetails'

type ProductCardProps = {
  product: ProductListType
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { coverUrl, name, description, place } = product.club || {}
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  return (
    <>
      <div onClick={() => setIsModalOpen(true)} css={productCardContainer}>
        <img src={coverUrl} alt={name} />
        <div>
          <h2>{name}</h2>
          <h6>
            {product.leaders.map(
              (leader) => leader.name !== '' && `${leader.name} 님 `
            )}
          </h6>
          <p>{description}</p>
        </div>
        <div className="product-card-footer">
          <span>{place}</span>
        </div>
      </div>
      <Portal isOpen={isModalOpen}>
        <ProductDetails
          product={product}
          goToPrevPage={() => setIsModalOpen(false)}
        />
      </Portal>
    </>
  )
}

export default ProductCard

const productCardContainer = css({
  display: 'grid',
  gridTemplateRows: 'auto 100px 54px',
  border: '1px solid #ECECE9',
  borderRadius: '4px',
  margin: '24px 0',
  img: {
    width: '100%',
    borderRadius: '4px 4px 0 0',
  },
  div: {
    padding: '8px',
    fontSize: '12px',
  },
  p: {
    margin: '0',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    width: '200px',
    fontSize: '12px',
    color: '#6e6e6c',
  },
  h6: {
    fontSize: '12px',
  },

  '.product-card-footer': {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    span: {
      color: '#6e6e6c',
      fontSize: 'inherit',
      ':before': {
        content: `""`,
        display: 'block',
        height: '1px',
        backgroundColor: '#ECECE9',
        position: 'absolute',
        left: '0',
        margin: '0 1.25rem',
        top: '0',
        right: '0',
      },
    },
  },
})
