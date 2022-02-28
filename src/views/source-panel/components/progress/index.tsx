import React, { FC, useEffect, useState } from 'react';
import { Progress } from 'antd';

interface IChunkProps {
  size: number;
  percent: number;
  chunkName: string;
  [key: string]: any;
}
interface ITpProgressProps {
  totalSize: number;
  chunkList: IChunkProps[];
}

const TpProgress: FC<ITpProgressProps> = (props) => {
  const { chunkList, totalSize } = props;
  const [totalPercent, setTotalPercent] = useState(0);

  useEffect(() => {
    const loaded = chunkList.map(({ size, percent }) => size * percent).reduce((pre, cur) => pre + cur, 0);
    setTotalPercent(Number((loaded / totalSize).toFixed(2)));
  }, [chunkList, totalSize]);

  return (
    <div>
      总进度：
      <Progress percent={totalPercent} />
      切片进度：
      {chunkList.map((chunk, idx: number) => (
        <div key={idx}>
          <span>{chunk.chunkName}</span>
          <Progress percent={chunk.percent} />
        </div>
      ))}
    </div>
  );
};

export default TpProgress;
