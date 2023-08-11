import { Card, Col, Form, Popconfirm, Row, Space, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dashboardActions } from "./Store";
import "./dashboard.css";
import Piechart from "../../../services/graph/piechart/Piechart";
import Barchart from "../../../services/graph/barchart/Barchart";

function Dashboard() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.dashboard.dashboardData);
  const [dataSource, setDataSource] = useState(data);
  useEffect(() => {
    if (data) {
      setDataSource(data);
    }
  }, [data]);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(function (response) {
        dispatch(
          dashboardActions.getDashboardDetails({
            dashboardData: response.data,
          })
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const handleDelete = (id) => {
    const newData = dataSource?.filter((item) => item.id !== id);
    setDataSource(newData);
  };

  const columns = [
    {
      title: "userId",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "body",
      dataIndex: "body",
      key: "body",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) =>
        dataSource?.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  return (
    <div className="dash-container">
      <Row gutter={[24, 24]}>
        <Col
          xl={{ span: 12 }}
          lg={{ span: 12 }}
          md={{ span: 12 }}
          sm={{ span: 12 }}
          xs={{ span: 12 }}
        >
          <Card>
            <Piechart />
          </Card>
        </Col>
        <Col
          xl={{ span: 12 }}
          lg={{ span: 12 }}
          md={{ span: 12 }}
          sm={{ span: 12 }}
          xs={{ span: 12 }}
        >
          <Card>
            <Barchart />
          </Card>
        </Col>
      </Row>
      <Row>
        <h2>User Table </h2>
        <Table dataSource={dataSource} columns={columns} />
      </Row>
    </div>
  );
}

export default Dashboard;
