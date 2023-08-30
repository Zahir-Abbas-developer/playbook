import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Avatar,
  Dropdown,
  Space,
  Progress,
  Pagination,
  Button,
} from "antd";
import EmailIcon from "../../../assets/images/staffManager/emailIcon.png";
import type { MenuProps } from "antd";
import ViewProfileIcon from "../../../assets/images/staffManager/viewProfileImg.png";
import SendIcon from "../../../assets/images/staffManager/sendEmailIcon.png";
import AllocateStaffIcon from "../../../assets/images/staffManager/allocateStaffIcon.png";
import StaffSummaryImg from "../../../assets/images/staffManager/staffSummaryImg.png";
import DeleteIcon from "../../../assets/images/staffManager/DeleteIcon.png";
import ActionImg from "../../../assets/images/staffManager/actionImg.png";
import CallImg from "../../../assets/images/staffManager/callImg.png";
import { useNavigate } from "react-router-dom";

import DeleteModal from "../../../shared/DeleteModal/DeleteModal";

import PostCodeImg from "../../../assets/images/staffManager/postCodeImg.png";
import { useDeleteProfileMutation } from "../../../store/Slices/StaffManager";
import AppSnackbar from "../../../utils/AppSnackbar";
import ApiLoader from "../../ApiLoader/ApiLoader";
import { GroundDetails } from "../../../mock/SelectGroundTypes/SelectGroundTypes";
import FeedbackPopup from "../../../shared/FeedbackPopup/feedback-popup";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../../utils/firebase";
import dayjs from "dayjs";

const GroundInfo = (props: any) => {
  const { data, pagination, setPagination, total, grounds } = props;
  const [staffId, setStaffId] = useState("");
  const [openFeedbackPopup, setOpenFeedbackPopup] = useState<boolean>(false);

  const [staffDetails, setStaffDetails] = useState<any>({});
  const [toggleSnackbar, setToggleSnackbar] = useState({
    message: "",
    isToggle: false,
    mode: "",
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [allocateStaff, setAllocateStaff] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [isSendEmailModalOpen, setIsSendEmailModalOpen] =
    useState<boolean>(false);
  const [IsProfileModal, setIsProfileModal] = useState(false);
  const [profileViewData, setProfileViewData] = useState();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectProfileData, setSelectProfileData] = useState<any>(null);
  const [groundId, setGroundId] = useState("");
  const [groundData, setGroundData] = useState("")
  const [deleteProfile] = useDeleteProfileMutation({ id: staffDetails?._id });
  console.log(props?.values?.slot)
  useEffect(() => {
    // setOpenFeedbackPopup(true);
    // AppSnackbar({
    //   type: "error",
    //   messageHeading: "Error",
    //   message: "Something went wrong!",
    // });
  }, []);

  const handleDeleteModalSubmit = async () => {
    try {
      await deleteProfile({ id: staffDetails?._id }).unwrap();
      AppSnackbar({
        type: "success",
        messageHeading: "Successfully Deleted!",
        message: "Information deleted successfully",
      });
      setDeleteModal(false);
    } catch (error: any) {
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!",
      });
    }
  };

  const handleProfileViewById = (record: any) => {
    setProfileViewData(record?._id);
    setSelectProfileData(record);
  };

  const navigate = useNavigate();
  const items: MenuProps["items"] = [
    {
      label: (
        <div
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
          onClick={() => setIsProfileModal(true)}
        >
          <img src={ViewProfileIcon} alt="ViewProfile" />
          <span>View Profile</span>
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          onClick={() =>
            navigate(`/staff-manager/${staffDetails?._id}/staff-summary`, {
              state: staffDetails,
            })
          }
        >
          <div
            className="d-flex align-center justify-center"
            style={{
              backgroundColor: "#EFF0F7",
              borderRadius: "50%",
              width: "28px",
              height: "28px",
            }}
          >
            <img src={StaffSummaryImg} alt="ViewProfile" />
          </div>
          <span>Staff Summary</span>
        </div>
      ),
      key: "2",
    },
    {
      label: (
        <div
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
          onClick={() => setIsSendEmailModalOpen(true)}
        >
          <img src={SendIcon} alt="ViewProfile" width={28} height={28} />
          <span>Send Email</span>
        </div>
      ),
      key: "3",
    },
    {
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          onClick={() => setIsModalOpen(true)}
        >
          <img src={EmailIcon} alt="ViewProfile" width={28} height={28} />
          <span>Send / Resend Invitation</span>
        </div>
      ),
      key: "4",
    },
    {
      label: (
        <div
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
          onClick={() => setAllocateStaff(true)}
        >
          <img
            src={AllocateStaffIcon}
            alt="ViewProfile"
            width={28}
            height={28}
          />
          <span>Allocate Staff</span>
        </div>
      ),
      key: "5",
    },
    {
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          onClick={() => setDeleteModal(true)}
        >
          <img src={DeleteIcon} alt="ViewProfile" width={28} height={28} />
          <span>Delete</span>
        </div>
      ),
      key: "6",
    },
  ];
  return (
    <>
      <div className="staff-info-wrapper">
        <div className="scroll-div">
          {grounds?.length > 0 ? (
            grounds?.map((item: any) => (
              <Row
                gutter={[20, 20]}
                className="staff-mananger-wrapper"
                style={{ marginBlock: "0.7rem" }}
                align="middle"
              >
                <Col xs={24} lg={6} xl={4} className="staff-info">
                  <div className="border-right">
                    <Avatar
                      src={item?.thumbnail}
                      // icon={`${item?.fullName.split(' ')[0].charAt(0)}${item?.fullName.split(' ')[1].charAt(0)}`}
                      className="user-img"
                      style={{
                        height: 100,
                        width: 100,
                      }}
                    />
                    <div className="staff-manager-heading">
                      <h2 style={{ textTransform: "capitalize" }}>
                        {item?.name}
                      </h2>
                      <p
                        className="fs-14 fw-400 line-height-18 m-0"
                        style={{ color: "#A0A3BD" }}
                      >
                        {item?.name}
                      </p>
                      {/* <p
                        className="fs-14 fw-400 line-height-18 m-0"
                        style={{ color: "#A0A3BD" }}
                      >
                        {item?.userTypeData?.shortForm}
                      </p> */}
                    </div>
                  </div>
                </Col>
                <Col xs={24} lg={18} xl={20}>
                  <div className="staff-manager-details">
                    <Row gutter={[15, 20]}>
                      <Col xs={24} sm={10} md={12} xxl={5}>
                        <div>
                          <h5
                            className="staff-manager-contact fs-16 fw-600 line-height-24 m-0"
                            style={{ color: "#6E7191" }}
                          >
                            Contact:
                          </h5>
                          <div
                            className="d-flex align-center contact-content"
                            style={{
                              gap: "5px",
                              marginTop: "4px",
                              paddingLeft: "1.5rem",
                            }}
                          >
                            <img src={EmailIcon} alt="email" />
                            <p className="m-0">{item?.name}</p>
                          </div>
                          <div
                            className="d-flex align-center contact-content"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                              marginTop: "6px",
                              paddingLeft: "1.5rem",
                            }}
                          >
                            <div
                              className="d-flex align-center justify-center"
                              style={{
                                backgroundColor: "#EFF0F7",
                                borderRadius: "50%",
                                width: "28px",
                                height: "28px",
                              }}
                            >
                              <img src={CallImg} alt="email" />
                            </div>
                            <p className="m-0" style={{ margin: "0" }}>
                              {item?.name}
                            </p>
                          </div>
                        </div>
                      </Col>
                      <Col xs={24} sm={14} md={12} xxl={6}>
                        <div className="d-flex align-center justify-between">
                          <div>
                            <h5
                              className="staff-manager-contact fs-16 fw-600 line-height-24 m-0 status-title"
                              style={{ color: "#6E7191" }}
                            >
                              Status:
                            </h5>
                            <h5
                              className="staff-manager-contact fs-16 fw-600 line-height-24 m-0 status-title"
                              style={{ color: "#6E7191", marginTop: "8px" }}
                            >
                              Seats:
                            </h5>
                            <h5
                              className="staff-manager-contact fs-16 fw-600 line-height-24 m-0 status-title"
                              style={{ color: "#6E7191", marginTop: "6px" }}
                            >
                              Slot:
                            </h5>
                          </div>
                          <div>
                            <h5
                              className="staff-manager-contact fs-16 fw-700 line-height-24 m-0 status-data"
                              style={{
                                color:
                                  item.status === "active"
                                    ? "#52C41A"
                                    : "#f5222d",
                                textTransform: "capitalize",
                              }}
                            >
                              {item?.name}
                            </h5>
                            <h5
                              className="staff-manager-contact fs-16 fw-700 line-height-24 m-0 status-data"
                              style={{ color: "#4E4B66", marginTop: "8px" }}
                            >
                              {`${item?.seats}`}
                            </h5>
                            <h5
                              className="staff-manager-contact fs-16 fw-700 line-height-24 m-0 status-data"
                              style={{
                                color: "#4E4B66",
                                marginTop: "6px",
                                textTransform: "capitalize",
                              }}
                            >
                              {item?.name ? item.name : "No data"}
                            </h5>
                          </div>
                        </div>
                      </Col>
                      <Col sm={24} style={{ textAlign: "end" }}>
                        <span>Rs 20,000 </span>
                        <Button
                          disabled={!props?.values?.location && !props?.values?.date && !props?.values?.slot}
                          onClick={() => {
                            const orderRef = collection(firestore, 'order');
                            const q = query(orderRef,
                              where('createdAt', '>', new Date(dayjs(props?.values?.date).format('YYYY-MM-DD'))),
                              where('createdAt', '<', new Date(dayjs(props?.values?.date).add(1, 'day').format('YYYY-MM-DD'))),
                              where("slot", '==', props?.values?.slot),
                              where('groundId', '==', item.id)
                            );
                            getDocs(q).then((snapshot) => {
                              if (snapshot.docs.length) {
                                AppSnackbar({
                                  type: "error",
                                  messageHeading: "Error",
                                  message: "Ground Already Booked",
                                });
                              } else {
                                setOpenFeedbackPopup(true);
                                setGroundId(item.id);
                                setOpenDrawer(true)
                                setGroundData(item)
                              }
                            })


                          }}
                          type="primary"
                          htmlType="submit"
                          className="search-button"
                          style={{ backgroundColor: "#E76F51" }}
                        >
                          Bookme
                        </Button>
                      </Col>

                    </Row>
                  </div>
                </Col>
              </Row>
            ))
          ) : (
            <ApiLoader />
          )}
        </div>
      </div>
      <ConfirmationModal openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} groundData={groundData} slot={props?.values?.slot} date={props?.values?.date} productId={groundId} />
      {/* <FeedbackPopup
        open={openFeedbackPopup}
        feedBack={setToggleSnackbar}
        setOpen={setOpenFeedbackPopup}
        productId={groundId}
      /> */}
      <Pagination
        className="staff-pagination"
        current={pagination?.page}
        total={data?.metadata?.total}
        onChange={(page, limit) => setPagination({ page, limit })}
      />
      {deleteModal && (
        <DeleteModal
          deleteModal={deleteModal}
          title={"Are you sure you want to Delete this ?"}
          submitTitle={"Yes, Delete"}
          cancelTitle={"Cancel"}
          setDeleteModal={() => setDeleteModal(false)}
          onSubmit={handleDeleteModalSubmit}
          onCancel={() => setDeleteModal(false)}
        />
      )}
    </>
  );
};
export default GroundInfo;
