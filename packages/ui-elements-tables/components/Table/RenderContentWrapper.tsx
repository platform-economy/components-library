import React, { useEffect } from 'react';

export type RenderContentWrapperProps = {
  children: React.ReactNode;
  getHeight: (height: number) => void;
};

export const RenderContentWrapper = (props: RenderContentWrapperProps) => {
  const contentRef = React.createRef<HTMLDivElement>();

  const getHeight = () => {
    const node = contentRef.current;
    /* istanbul ignore else */
    if (node) {
      props.getHeight(node.getBoundingClientRect().height);
    }
  };

  useEffect(() => {
    getHeight();
  });

  return (
    <div ref={contentRef}>
      {props.children}
    </div>
  );
};
