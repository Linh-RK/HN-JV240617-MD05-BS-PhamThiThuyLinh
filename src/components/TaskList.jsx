import React from "react";
import { Table, Button, Popconfirm } from "antd";
import { DeleteOutlined, CheckOutlined, UndoOutlined } from "@ant-design/icons";
import moment from "moment";

export default function TaskList({ tasks, deleteTask, toggleTaskCompletion }) {
  const columns = [
    {
      title: (
        <div className="font-semibold text-lg text-gray-700">Tên công việc</div>
      ),
      dataIndex: "title",
      key: "title",
    },

    {
      title: (
        <div className="font-semibold text-lg text-gray-700">
          Thời gian bắt đầu
        </div>
      ),
      dataIndex: "startTime",
      key: "startTime",
      render: (text) => moment(text).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: (
        <div className="font-semibold text-lg text-gray-700">
          Thời gian kết thúc
        </div>
      ),
      dataIndex: "deadlineTime",
      key: "deadlineTime",
      render: (text) => moment(text).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <div className="space-x-2">
          <Button
            onClick={() => toggleTaskCompletion(record.id)}
            icon={record.isDone ? <UndoOutlined /> : <CheckOutlined />}
            type="primary"
            className={
              record.isDone
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-green-500 hover:bg-green-600"
            }
          >
            {record.isDone ? "Hoàn tác" : "Hoàn thành"}
          </Button>

          <Popconfirm
            title="Bạn có chắc chắn muốn xóa công việc này?"
            onConfirm={() => deleteTask(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button
              icon={<DeleteOutlined />}
              type="default"
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Table
      dataSource={tasks}
      columns={columns}
      rowKey="id"
      rowClassName={(record) =>
        moment(record.deadlineTime).isBefore(moment().add(12, "hours")) &&
        !record.isDone
          ? "bg-red-400 hover:bg-red-400 "
          : ""
      }
    />
  );
}
