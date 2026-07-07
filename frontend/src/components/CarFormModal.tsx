import { Col, Form, Input, InputNumber, Modal, Row } from "antd";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Car, CarFormValues } from "../types/CarEntity";

interface CarFormModalProps {
  open: boolean;
  car: Car | null;
  submitting: boolean;
  onCancel: () => void;
  onSubmit: (values: CarFormValues) => void;
}

const defaultValues: CarFormValues = {
  registrationNumber: "",
  brand: "",
  model: "",
  year: new Date().getFullYear(),
  color: "",
  notes: "",
};

const CarFormModal = ({
  open,
  car,
  submitting,
  onCancel,
  onSubmit,
}: CarFormModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CarFormValues>({ defaultValues });

  useEffect(() => {
    if (open) {
      reset(
        car
          ? {
              registrationNumber: car.registrationNumber,
              brand: car.brand,
              model: car.model,
              year: car.year,
              color: car.color,
              notes: car.notes ?? "",
            }
          : defaultValues,
      );
    }
  }, [open, car, reset]);

  const isEdit = Boolean(car);

  return (
    <Modal
      title={isEdit ? "Edit Car" : "Add Car"}
      open={open}
      onCancel={onCancel}
      onOk={handleSubmit(onSubmit)}
      okText={isEdit ? "Update" : "Add"}
      confirmLoading={submitting}
      destroyOnHidden
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              label="Registration Number"
              required
              validateStatus={errors.registrationNumber ? "error" : ""}
              help={errors.registrationNumber?.message}
            >
              <Controller
                name="registrationNumber"
                control={control}
                rules={{ required: "Registration number is required" }}
                render={({ field }) => (
                  <Input {...field} placeholder="e.g. KA01AB1234" />
                )}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Brand"
              required
              validateStatus={errors.brand ? "error" : ""}
              help={errors.brand?.message}
            >
              <Controller
                name="brand"
                control={control}
                rules={{ required: "Brand is required" }}
                render={({ field }) => (
                  <Input {...field} placeholder="e.g. Toyota" />
                )}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              label="Model"
              required
              validateStatus={errors.model ? "error" : ""}
              help={errors.model?.message}
            >
              <Controller
                name="model"
                control={control}
                rules={{ required: "Model is required" }}
                render={({ field }) => (
                  <Input {...field} placeholder="e.g. Innova" />
                )}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Year"
              required
              validateStatus={errors.year ? "error" : ""}
              help={errors.year?.message}
            >
              <Controller
                name="year"
                control={control}
                rules={{
                  required: "Year is required",
                  min: { value: 1900, message: "Year must be after 1900" },
                  max: {
                    value: 2100,
                    message: "Year must be before 2100",
                  },
                }}
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    style={{ width: "100%" }}
                    placeholder="e.g. 2022"
                  />
                )}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              label="Color"
              required
              validateStatus={errors.color ? "error" : ""}
              help={errors.color?.message}
            >
              <Controller
                name="color"
                control={control}
                rules={{ required: "Color is required" }}
                render={({ field }) => (
                  <Input {...field} placeholder="e.g. White" />
                )}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={24}>
            <Form.Item label="Notes">
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <Input.TextArea
                    {...field}
                    rows={3}
                    placeholder="Any additional notes"
                  />
                )}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CarFormModal;
