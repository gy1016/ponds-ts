import React from 'react';

const ErrorPage = ({ error }: { error: Error | null }) => {
  console.log('ERRORERROR:', error);
  return <div className="tp-error">{error ? `${error}` : '页面不存在'}</div>;
};

export default ErrorPage;
