import React from "react";
import { Card, Row, Col } from "antd";
import '../styles/stats.css';

const Stats = ({ stats, recentDate }) => {
  return(
    <>
    <p>Recent Gathered Data {recentDate}</p>
    <Row gutter={[16, 16]}>
      {stats.map((stat, index) => (
        <Col key={index} span={6}>
          <Card>
            <p className="stats_value" >{stat.value}</p>
            <h3 className="stats_title" ># {stat.title}</h3>
          </Card>
        </Col>
      ))}
    </Row>
    </>
  );
};

export default Stats;
