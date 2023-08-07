import {
  Button,
  Modal,
  Input,
  Form,
  Row,
  Col,
  Select,
} from "antd";
import arrowDown from "../../../assets/icons/arrow-down-icon.svg"
import AppSnackbar from "../../../utils/AppSnackbar";
import { ROLES } from "../../../constants/Roles";
import { useGetClientsQuery } from "../../../store/Slices/Setting/StaffSettings/RegisterationConfiguration";
import {  handleInputTrimStart } from "../../../utils/useInputTrim";
import {  usePostColorsMutation, useUpdateColorsMutation,  } from "../../../store/Slices/Products";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { firestore } from "../../../utils/firebase";

function AddColorModal(props: any) {
  const [form] = Form.useForm();
  const { addEditJobRole, setAddEditJobRole, modalType, getTableRowValues, setGetFieldValues, role ,jobID} = props;
  const { data: clientData, isSuccess: isClientDataSuccess, } = useGetClientsQuery({ refetchOnMountOrArgChange: true });
  const [postColors, { isLoading: isPostJobRequestMutation }] = usePostColorsMutation();
  const [updateColors, { isLoading: isUpdateJobRequestMutation }] = useUpdateColorsMutation();
  const { role: userRole, id: userId }: any = JSON.parse(localStorage.getItem("user") || "{}");


  // ------------------ Error cases Variable ------------------
  let userRoleDropdown: any;
  let clientAPIData: any;


  if (isClientDataSuccess) {
    clientAPIData = clientData;
    // Making new array for dropdown from data
    userRoleDropdown = clientAPIData?.data?.result?.map((item: any) => ({
      value: item?._id,
      label: item?.clientName,
    }));
  }

  
  if (modalType !== "Add") {
    const formValues = {
      location: getTableRowValues.location,
      description: getTableRowValues.description,
    }
    form.setFieldsValue(formValues)
  }


  // ---------------- Failed Form Fields ---------------- 
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };


  // ---------------- On Finish used to reset form fields in form ----------------
  const onFinish = async (values: any) => {
    // -------- for error cases --------
    if (modalType !== "Add") {
     
     
      setDoc(doc(firestore, "categories", getTableRowValues?.id), values)
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
        createdAt: serverTimestamp(),
        createdBy: userId ?? "",
      };
      addDoc(collection(firestore, "categories"), addProductValues)
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
  }




  return (
    <Modal
      title="Add Location"
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
            <label className="fs-14 fw-600">Location Name</label>
            <Form.Item
              name="location"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
              normalize={(value: any) => handleInputTrimStart(value)}
            >
              <Input
                placeholder="Enter location"
                id="location"
                style={{ marginTop: "2px", height: "40px", }}
              />
            </Form.Item>
          </Col>
        
          <Col lg={12} xs={24} style={{ marginBottom: "20px" }}>
            <label className="fs-14 fw-600">Location Description</label>
            <Form.Item
              name="description"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
              normalize={(value: any) => handleInputTrimStart(value)}
            >
              <Input
                placeholder="Enter location"
                id="description"
                style={{ marginTop: "2px", height: "40px", }}
              />
            </Form.Item>
          </Col>
          

        </Row>

        <Form.Item>

          {/* {apiErrorMessage !== undefined && <p className="fs-14 fw-400 line-height-18 error-color  m-0" style={{ marginBottom: "1rem" }}>{apiErrorMessage?.status === 400 ? 'Request not fulfilled! Try again after some time.' : 'Something went wrong.'}</p>} */}
          <Button type="primary" htmlType="submit" loading={isPostJobRequestMutation || isUpdateJobRequestMutation}>
            {modalType === 'Edit' ? 'Update' : "Save"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>

  );
}

export default AddColorModal;
