import React, { FC } from 'react';
import './index.less';

const Popver: FC<any> = (props) => {
  const { content, top, left, visibility } = props;

  return (
    <>
      <div
        id="popover-container"
        style={{
          top: top - 6 - 28 + 'px',
          left: left - 30 + 'px',
          opacity: visibility ? 0.8 : 0,
        }}
      >
        <p>{content}</p>
      </div>
      <div
        id="triangle"
        style={{
          top: top - 6 + 'px',
          left: left - 6 + 'px',
          opacity: visibility ? 0.8 : 0,
        }}
      />
    </>
  );
};

export default Popver;
