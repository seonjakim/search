import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { css } from '@emotion/react';

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
};

const Portal = ({ children, isOpen }: ModalProps) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div css={portalContainer} className="portal">
      {children}
    </div>,
    document.getElementById("portal-root") as HTMLElement
  );
};

export default Portal;

const portalContainer = css({
  position: "fixed",
  top: "0",
  right: "0",
  width: "100vw",
  height: "100vh",
  backgroundColor: "#fff",
});
