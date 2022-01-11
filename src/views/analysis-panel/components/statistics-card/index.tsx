import React, { FC } from 'react';
import { Card, Col, Row } from 'antd';
import './index.less';

interface IStatisticsProps {
  executePerDayAvg: number;
  numberOfExecutingDays: number;
  accumulatedFinished: number;
}

const StatisticsCard: FC<IStatisticsProps> = (props) => {
  const { executePerDayAvg, numberOfExecutingDays, accumulatedFinished } = props;

  return (
    <div className="statistics-card">
      <span className="title-style">任务执行情况</span>
      <Row gutter={2}>
        <Col span={8}>
          <Card title="平均执行数" size="small">
            {executePerDayAvg.toFixed(1)}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="执行天数" size="small">
            {numberOfExecutingDays}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="总执行数" size="small">
            {accumulatedFinished}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StatisticsCard;
