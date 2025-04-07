import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

export const ModalWrapper = ({ children }: PropsWithChildren) => {
  return createPortal(<>{children}</>, document.body);
};
