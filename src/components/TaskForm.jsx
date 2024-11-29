import React from "react";
import { Form, Input, DatePicker, Button, message, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";

export default function TaskForm({ addTask }) {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    const now = moment();
    const start = moment(values.startTime.toDate());
    console.log(start);
    const deadline = moment(values.deadlineTime.toDate());

    if (start.isBefore(now.add(30, "minutes"))) {
      message.error(
        "Thời gian bắt đầu phải lớn hơn thời gian hiện tại ít nhất 30 phút"
      );
      return;
    }

    if (deadline.isSameOrBefore(start)) {
      message.error("Thời gian kết thúc phải lớn hơn thời gian bắt đầu");
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: values.title,
      startTime: start.toISOString(),
      deadlineTime: deadline.toISOString(),
      isDone: false,
    };

    addTask(newTask);
    form.resetFields();
    message.success("Thêm công việc thành công");
  };

  const disabledStartDate = (current) => {
    return current && current < moment().add(30, "minutes");
  };

  const disabledEndDate = (current) => {
    const startDate = form.getFieldValue("startTime");
    if (!startDate) {
      return current && current < moment().add(30, "minutes");
    }
    return current && current <= moment(startDate);
  };

  return (
    <Form form={form} onFinish={handleSubmit} className="mb-4">
      {/* Tiêu đề Form */}
      <div className="text-xl font-bold mb-4 text-left text-[30px]">
        Thêm Công Việc
      </div>

      {/* Các trường input nằm trong một hàng */}
      <div className="grid grid-cols-3 gap-4">
        {/* Tên công việc */}
        <Form.Item
          name="title"
          rules={[{ required: true, message: "Vui lòng nhập tên công việc" }]}
        >
          <Input placeholder="Tên công việc" className="w-full p-2" />
        </Form.Item>

        {/* Thời gian bắt đầu */}
        <Form.Item
          name="startTime"
          rules={[
            { required: true, message: "Vui lòng chọn thời gian bắt đầu" },
          ]}
        >
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm"
            placeholder="Thời gian bắt đầu"
            disabledDate={disabledStartDate}
            className="w-full p-2"
          />
        </Form.Item>

        {/* Thời gian kết thúc */}
        <Form.Item
          name="deadlineTime"
          rules={[
            { required: true, message: "Vui lòng chọn thời gian kết thúc" },
          ]}
        >
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm"
            placeholder="Thời gian kết thúc"
            disabledDate={disabledEndDate}
            className="w-full p-2"
          />
        </Form.Item>
      </div>

      {/* Nút thêm công việc nằm dưới cùng */}
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          icon={<PlusOutlined />}
          className=""
        >
          Thêm công việc
        </Button>
      </Form.Item>
    </Form>
  );
}
