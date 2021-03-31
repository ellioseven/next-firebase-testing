import { Divider, message, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { AggregateScoreTableRow } from "@ellioseven/next-firebase-firebase";
import Link from "next/link";
import styles from "@styles/index.module.css";

const TopScores = () => {
  const [isLoading, setLoading] = useState(false);
  const [scores, setScores] = useState<AggregateScoreTableRow[]>([]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Score",
      dataIndex: "score",
    },
  ];

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/api/score-top", {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        setScores(data);
      })
      .catch((error) => message.error(error.toString()))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.page}>
      <Space direction="vertical" style={{ width: "100%" }} size="large">
        <Typography.Title level={2} style={{ margin: 0 }}>
          Top Scores
        </Typography.Title>
        <p>
          <Link href="/">
            <a>Add Your Score</a>
          </Link>
        </p>
        <Divider />
        <Table
          dataSource={scores}
          columns={columns}
          loading={isLoading}
          pagination={false}
        />
      </Space>
    </div>
  );
};

export default TopScores;
