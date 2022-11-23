import { MouseEventHandler } from 'react';

import { css } from '@emotion/react';

import { ProductListType } from '../../api/ProductList.type';

type ProductDetailsProps = {
  product: ProductListType;
  goToPrevPage: MouseEventHandler<HTMLButtonElement>;
};

const ProductDetails = ({ product, goToPrevPage }: ProductDetailsProps) => {
  const { coverUrl, name, description, place } = product.club || {};
  const { price } = product || {};
  const numberFormat = (price: number): string => price.toLocaleString("ko-KR");
  return (
    <div css={productDetailsContainer}>
      <div className="product-details-header">
        <button onClick={goToPrevPage}>&#8592;</button>
      </div>
      <div className="product-details-body">
        <img src={coverUrl} alt={name} />
        <div className="product-details-body-content">
          <p>
            <h2>{name}</h2>
            <h5>{place}</h5>
            <span>{numberFormat(price)}원</span>
          </p>
          <p>{description}</p>
        </div>
      </div>
      <div className="product-details-footer">
        <button>지금 구매하기</button>
      </div>
    </div>
  );
};

export default ProductDetails;

const productDetailsContainer = css({
  height: "100vh",
  display: "grid",
  gridTemplateRows: "auto 1fr auto",

  ".product-details-header": {
    button: {
      width: "48px",
      height: "48px",
      fontSize: "24px",
      backgroundColor: "transparent",
    },
  },
  ".product-details-body": {
    overflow: "auto",
    ".product-details-body-content": {
      padding: "0 24px",
      h5: {
        color: "#838380",
        fontSize: "14px",
      },
      span: {
        color: "#ff7900",
        fontWeight: "bold",
        fontSize: "20px",
      },
      ".product-information": {
        height: "",
      },
    },
  },
  ".product-details-footer": {
    height: "72px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "12px 24px",
    button: {
      width: "100%",
      height: "100%",
      color: "#fff",
      backgroundColor: "#ff7900",
      fontSize: "16px",
      fontWeight: "bold",
      borderRadius: "4px",
    },
  },
});
