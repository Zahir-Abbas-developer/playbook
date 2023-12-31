import { Button, Modal, Input, Form, Row, Col, Select, InputNumber } from "antd";
import arrowDown from "../../../assets/icons/arrow-down-icon.svg";
import { useEffect, useState } from "react";
import { usePostJobRequestMutation, useUpdateJobRequestMutation } from "../../../store/Slices/Setting/JobRole";
import AppSnackbar from "../../../utils/AppSnackbar";
import { ROLES } from "../../../constants/Roles";
import { useGetClientsQuery } from "../../../store/Slices/Setting/StaffSettings/RegisterationConfiguration";
import { handleInputTrimSpaces, handleInputTrimStart } from "../../../utils/useInputTrim";
import {
  useGetAllCategoriessQuery,
  useGetAllColorsQuery,
  useGetAllMaterialsQuery,
  useGetAllProductsQuery,
  usePostProductsMutation,
  useUpdateProductsMutation,
} from "../../../store/Slices/Products";
import UploadImage from "../../Setting/SettingKeyInfo/UploadImage/UploadImage";
import { PlusCircleOutlined } from "@ant-design/icons";
import Thumbnail from "../../Setting/SettingKeyInfo/UploadImage/Thumbnail";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { firestore } from "../../../utils/firebase";

// const categoryOptions = [
//   { label: "Cricket", value: "cricket" },
//   { label: "Hockey", value: "hockey" },
//   { label: "FootBall", value: "football" },
//   { label: "BadMinton", value: "badminton" },
// ];
// const locationOptions = [
//   { label: "RawalPindi", value: "rawalpindi" },
//   { label: "WahCantt", value: "wahcantt" },
//   { label: "Islamabad", value: "islamabad" },
// ];

function AddProductsModal(props: any) {
  const [form] = Form.useForm();
  const [certificateUrlThumbnail, setCertificateUrlThumbnail] = useState("");
  const { addEditJobRole, setAddEditJobRole, modalType, getTableRowValues, setGetFieldValues, categoryOptions, locationOptions } = props;
  const { role: userRole, id: userId }: any = JSON.parse(localStorage.getItem("user") || "{}");
  // ------------------ Error cases Variable ------------------
  // const [selectedItems, setSelectedItems] = useState<string[]>(getTableRowValues?.slots?getTableRowValues?.slots:[]);
  const uploadCertificateThumbnail = (url: any) => {
    setCertificateUrlThumbnail(url);
  };



  if (modalType !== "Add") {
    const formValues = {
      name: getTableRowValues.name,
      categoryId: getTableRowValues.categoryId,
      locationId: getTableRowValues.locationId,
      seats: getTableRowValues?.seats,
      description: getTableRowValues?.description,
      price: getTableRowValues?.price,
      email:getTableRowValues?.email,
      phone:getTableRowValues?.phone,
      slots:getTableRowValues?.slots
    };
    // setSelectedItems(getTableRowValues?.slots||[])
    form.setFieldsValue(formValues);
  }

  
const  options=[
    { value: 'fullday', label: 'Full Day (24 Hours)' },
    { value: 'morning', label: 'Morning (6AM - 12AM)' },
    { value: 'afternoon', label: 'Afternoon (1PM - 4PM)' },
    { value: 'evening', label: 'Evening (4PM - 8PM)' },
    { value: 'night', label: 'Night(8PM - 1AM)' },
  ]
  // ---------------- Failed Form Fields ----------------
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };


  // const filteredOptions = options.filter((o:any) => !selectedItems.includes(o));
  // ---------------- On Finish used to reset form fields in form ----------------
  const onFinish = async (values: any) => {
    // -------- for error cases --------
    if (modalType !== "Add") {
      const updateProductValues = {
        ...values,
        price: parseInt(values?.price),
      };
      if (certificateUrlThumbnail) updateProductValues["thumbnail"] = certificateUrlThumbnail;
      setDoc(doc(firestore, "grounds", getTableRowValues?.id), updateProductValues)
        .then((response) => AppSnackbar({ type: "success", messageHeading: "Successfully Updated!", message: "Information updated successfully" }))
        .catch((error) =>
          AppSnackbar({
            type: "error",
            messageHeading: "Error",
            message: error?.data?.message ?? "Something went wrong!",
          })
        )
        .finally(() => handleFormClear());
    } else {
      const addProductValues = {
        ...values,
        price: parseInt(values?.price),
        thumbnail: certificateUrlThumbnail,
        createdAt: serverTimestamp(),
        createdBy: userId ?? "",
      };
      addDoc(collection(firestore, "grounds"), addProductValues)
        .then((response) => AppSnackbar({ type: "success", messageHeading: "Successfully Added!", message: "Information added successfully" }))
        .catch((error) =>
          AppSnackbar({
            type: "error",
            messageHeading: "Error",
            message: error?.data?.message ?? "Something went wrong!",
          })
        )
        .finally(() => handleFormClear());
    }
  };

  const handleFormClear = () => {
    setAddEditJobRole(false);
    form.resetFields();
    setGetFieldValues({});
  };

  return (
    <Modal
      title="Add Ground Details"
      open={addEditJobRole}
      onOk={() => handleFormClear()}
      onCancel={() => handleFormClear()}
      centered
      className="add-Manage-Job-Role"
      footer={false}
      width="888px"
      maskClosable={false}
    >
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Row gutter={20} style={{ marginTop: "20px" }}>
          <Col lg={12} xs={24} style={{ marginBottom: "20px" }}>
            <label className="fs-14 fw-600">Name</label>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
              normalize={(value: any) => handleInputTrimStart(value)}
            >
              <Input placeholder="Enter Ground Name" id="PositionName" style={{ marginTop: "2px", height: "40px" }} />
            </Form.Item>
          </Col>

          <Col lg={12} xs={24} style={{ marginBottom: "20px" }}>
            <label className="fs-14 fw-600">Description</label>
            <Form.Item
              name="description"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
              normalize={(value: any) => handleInputTrimStart(value)}
            >
              <Input placeholder="Enter Ground Description" id="description" style={{ marginTop: "2px", height: "40px" }} />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24} style={{ marginBottom: "20px" }}>
            <label className="fs-14 fw-600">Location</label>
            <Form.Item
              name="locationId"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
              normalize={(value: any) => handleInputTrimStart(value)}
            >
              <Select placeholder="Select Ground Location" id="locationId" style={{ marginTop: "2px", height: "40px" }} options={locationOptions} />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24} style={{ marginBottom: "20px" }}>
            <label className="fs-14 fw-600">Category</label>
            <Form.Item
              name="categoryId"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
              normalize={(value: any) => handleInputTrimStart(value)}
            >
              <Select placeholder="Select Ground Category" id="categoryId" style={{ marginTop: "2px", height: "40px" }} options={categoryOptions} />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24} style={{ marginBottom: "20px" }}>
            <label className="fs-14 fw-600">Seats</label>
            <Form.Item
              name="seats"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
            // normalize={(value: any) => handleInputTrimStart(value)}
            >
              <InputNumber min={1} placeholder="Enter Ground Seats" id="seats" style={{ marginTop: "2px", height: "40px", width: "100%" }} />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24} style={{ marginBottom: "20px" }}>
            <label className="fs-14 fw-600">Price</label>
            <Form.Item
              name="price"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
            // normalize={(value: any) => handleInputTrimStart(value)}
            >
              <InputNumber min={10} placeholder="Enter Ground Price" id="price" style={{ marginTop: "2px", height: "40px", width: "100%" }} />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24} style={{ marginBottom: "20px" }}>
            <label className="fs-14 fw-600">Email</label>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
            // normalize={(value: any) => handleInputTrimStart(value)}
            >
              <Input min={1} placeholder="Enter Ground email" id="seats" style={{ marginTop: "2px", height: "40px", width: "100%" }} />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24} style={{ marginBottom: "20px" }}>
            <label className="fs-14 fw-600">Select Slots</label>
            <Form.Item
              name="slots"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
            // normalize={(value: any) => handleInputTrimStart(value)}
            >
           <Select
      mode="multiple"
      placeholder="Select Slots"
      // value={selectedItems}
      // onChange={setSelectedItems}
      style={{ width: '100%' }}
      options={options.map((item) => ({
        value: item.value,
        label: item.label,
      }))}
    />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24} style={{ marginBottom: "20px" }}>
            <label className="fs-14 fw-600">Phone</label>
            <Form.Item
              name="phone"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
            // normalize={(value: any) => handleInputTrimStart(value)}
            >
              <InputNumber min={10} placeholder="Enter Ground Phone" id="price" style={{ marginTop: "2px", height: "40px", width: "100%" }} />
            </Form.Item>
          </Col>
          {/* <Col xs={12} lg={12}>
            <p style={{ fontWeight: 600, color: "#6E7191" }}>Images</p>
            <UploadImage uploadCertificateId={uploadCertificateId} />
          </Col> */}
          <Col xs={24} lg={24}>
            <p style={{ fontWeight: 600, color: "#6E7191" }}>Thumbnail</p>
            <Thumbnail uploadCertificateThumbnail={uploadCertificateThumbnail} />
          </Col>
        </Row>

        <Form.Item>
          {/* {apiErrorMessage !== undefined && <p className="fs-14 fw-400 line-height-18 error-color  m-0" style={{ marginBottom: "1rem" }}>{apiErrorMessage?.status === 400 ? 'Request not fulfilled! Try again after some time.' : 'Something went wrong.'}</p>} */}
          <Button
            type="primary"
            htmlType="submit"
          //  loading={isPostJobRequestMutation || isUpdateJobRequestMutation}
          >
            {modalType === "Edit" ? "Update" : "Save"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddProductsModal;
