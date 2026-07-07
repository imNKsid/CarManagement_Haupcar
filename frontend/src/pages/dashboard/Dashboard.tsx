import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import CarFormModal from "../../components/CarFormModal";
import { useCars } from "../../hooks/useCars";
import { Car, CarFormValues } from "../../types/CarEntity";
import "./Dashboard.css";

const Dashboard = () => {
  const { cars, loading, addCar, editCar, removeCar, getErrorMessage } =
    useCars();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const openAddModal = () => {
    setEditingCar(null);
    setModalOpen(true);
  };

  const openEditModal = (car: Car) => {
    setEditingCar(car);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingCar(null);
  };

  const handleSubmit = async (values: CarFormValues) => {
    setSubmitting(true);
    try {
      if (editingCar) {
        await editCar(editingCar.id, values);
      } else {
        await addCar(values);
      }
      closeModal();
    } catch (err) {
      message.error(
        getErrorMessage(
          err,
          editingCar ? "Failed to update car" : "Failed to add car",
        ),
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await removeCar(id);
    } catch (err) {
      message.error(getErrorMessage(err, "Failed to delete car"));
    } finally {
      setDeletingId(null);
    }
  };

  const columns: ColumnsType<Car> = [
    {
      title: "Registration",
      dataIndex: "registrationNumber",
      key: "registrationNumber",
      sorter: (a, b) =>
        a.registrationNumber.localeCompare(b.registrationNumber),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      sorter: (a, b) => a.brand.localeCompare(b.brand),
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      sorter: (a, b) => a.year - b.year,
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      ellipsis: true,
      render: (notes: string | null) => notes || "-",
    },
    {
      title: "Edit",
      key: "edit",
      align: "center",
      render: (_, record) => (
        <Button
          type="text"
          icon={<EditOutlined />}
          aria-label="Edit car"
          onClick={() => openEditModal(record)}
        />
      ),
    },
    {
      title: "Delete",
      key: "delete",
      align: "center",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure?"
          description="This will permanently delete this car."
          okText="Delete"
          cancelText="Cancel"
          okButtonProps={{ danger: true, loading: deletingId === record.id }}
          onConfirm={() => handleDelete(record.id)}
        >
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            aria-label="Delete car"
          />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="container">
      <h1>Company Cars</h1>

      <div className="main-container">
        <Table
          className="car-table"
          rowKey="id"
          columns={columns}
          dataSource={cars}
          loading={{ spinning: loading, tip: "Loading..." }}
          pagination={{ pageSize: 10 }}
        />

        <div className="button-container">
          <Button
            size={"large"}
            type="primary"
            icon={<PlusOutlined />}
            onClick={openAddModal}
          >
            Add Car
          </Button>
        </div>
      </div>

      <CarFormModal
        open={modalOpen}
        car={editingCar}
        submitting={submitting}
        onCancel={closeModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Dashboard;
