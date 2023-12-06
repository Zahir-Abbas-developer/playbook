import { useEffect, useState } from "react";

// Ant Components
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Select, Space, Table, Input, Row, Col } from "antd";

// Components
import BreadCrumb from "../../../layout/BreadCrumb/BreadCrumb";

// RTK Query
import { useGetClientsQuery } from "../../../store/Slices/Setting/StaffSettings/RegisterationConfiguration";
import { useGetJobRequestFilterQuery, useGetJobRequestQuery } from "../../../store/Slices/Setting/JobRole";

// Utils, Constant and Packages
import { ROLES } from "../../../constants/Roles";
import AppSnackbar from "../../../utils/AppSnackbar";
import { debouncedSearch } from "../../../utils/utils";

// Assets
import actionImg from "../../../assets/icons/Setting/actionImg.svg";
import editIcon from "../../../assets/icons/edit-blue.svg";
import deleteIcon from "../../../assets/icons/delete-icon-outlined.svg";
import searchIcon from "../../../assets/icons/search.svg";

// Styling
import "./AddProducts.scss";
import DeleteModal from "../../../shared/DeleteModal/DeleteModal";
import CrossAllocationModal from "../../Setting/SettingJobRole/CrossAllocationModal";
import { renderDashboard } from "../../../utils/useRenderDashboard";
import AddProductsModal from "./AddProductsModal";
import { useDeleteProductsMutation, useGetAllMaterialsQuery, useGetOverAllProductsQuery } from "../../../store/Slices/Products";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { firestore } from "../../../utils/firebase";
import { useAppSelector } from "../../../store";
import { useDispatch } from "react-redux";
import { setCategories, setGrounds, setLocations } from "../../../store/Slices/Playbook";
import { Link } from "react-router-dom";

const AddProducts = () => {
  const [pagination, setPagination] = useState({ limit: 6, page: 1 });
  const [selectedFilterValue, setSelectedFilterValue] = useState<string | undefined>();
  const [selectedCareHomeFilterValue, setSelectedCareHomeFilterValue] = useState<string | undefined>();
  const [crossAllocationRecord, setCrossAllocationRecord] = useState([]);

  // ============================== Filters ==============================
  const [searchName, setSearchName] = useState<string>("");

  // ============================== ACTION MODALS ==============================
  const [jobID, setJobID] = useState<string>("");
  const [modalType, setModalType] = useState<string>("");
  const [addEditJobRole, setAddEditJobRole] = useState<boolean>(false);
  const [showCrossAllocation, setShowCrossAllocation] = useState<boolean>(false);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const [getTableRowValues, setGetFieldValues] = useState({});
  const [productsLoading, setProductsLoading] = useState<boolean>(false);
  const { grounds, locations, categories }: any = useAppSelector((state) => state.playbook);
  const dispatch = useDispatch()


  // ============================== Query Parameters Of Search and Filter ==============================
  const paramsObj: any = {};
  if (searchName) paramsObj["name"] = searchName;

  const query = "?" + new URLSearchParams(paramsObj).toString();

  // ============================== ROLES ==============================
  const { role }: any = JSON.parse(localStorage.getItem("careUserData") || "{}");

  // ============================== Variables to Assign Values to it ==============================
  let JobRole: any;

  let careHomeDataDropdown: any;

  useEffect(() => {
    if (!grounds.length) fetchGrounds();
    if (!locations?.length) fetchLocations()
    if (!categories?.length) fetchCategories()
  }, []);

  const fetchGrounds = () => {
    setProductsLoading(true);
    onSnapshot(collection(firestore, "grounds"), (snapshot) => {
      const groundsData: any = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      dispatch(setGrounds(groundsData))
      setProductsLoading(false);
    });
  };
  const fetchCategories = () => {
    onSnapshot(collection(firestore, "categories"), (snapshot) => {
      const categoriesData: any = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      dispatch(setCategories(categoriesData))
    });
  };
  const fetchLocations = () => {
    onSnapshot(collection(firestore, "locations"), (snapshot) => {
      const locationsData: any = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      dispatch(setLocations(locationsData))
    });
  };


  // ============================== Handle Delete Job Role ==============================
  const handleDeleteSubmit = async () => {
    try {
      deleteDoc(doc(firestore, "grounds", jobID))
        .then((response) =>
          AppSnackbar({
            type: "success",
            messageHeading: "Deleted!",
            message: "Information deleted successfully",
          })
        )
        .catch((error) =>
          AppSnackbar({
            type: "error",
            messageHeading: "Error",
            message: error?.data?.message ?? "Something went wrong!",
          })
        )
        .finally(() => {
          setIsDeleteModal(false);
          setGetFieldValues({});
        });
    } catch (error: any) {
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!",
      });
    }
  };

  // ============================== Filter and Remove The Current Allocation For the Cross Alloocation ==============================
  const handleCrossAllocationValues = (data: any) => {
    const filteredJobRoles = JobRole?.data?.result.filter((singleItem: any) => singleItem?._id !== data?._id);
    if (filteredJobRoles) {
      setCrossAllocationRecord(filteredJobRoles);
    }
  };

  // ============================== Reset back to Initial States ==============================
  const handleResetFormValues = () => {
    setGetFieldValues({});
    setJobID("");
  };

  const getCategoryName = (categoryId: string) => {
    return categories?.find((category: any) => category.id === categoryId)?.name || "N/A"
  }
  const getLocationName = (locationId: string) => {
    return locations?.find((location: any) => location.id === locationId)?.name || "N/A"
  }

  // ============================== Table Action Dropdowns Items ==============================
  const items: MenuProps["items"] = [
    {
      label: (
        <Space
          onClick={() => {
            setAddEditJobRole(true);
            setModalType("Edit");
          }}
        >
          <img src={editIcon} alt="edit" className="d-flex align-center" height={18} width={16} />
          <span className="m-0">Edit Details</span>
        </Space>
      ),
      key: "1",
    },

    {
      label: (
        <Space
          onClick={() => {
            setIsDeleteModal(true);
          }}
        >
          <img src={deleteIcon} className="d-flex align-center" alt="delete" height={18} width={16} />
          <span>Delete</span>
        </Space>
      ),
      key: "2",
    },
    {
      label: (
        <Space

        >
          <img src={editIcon} alt="edit" className="d-flex align-center" height={18} width={16} />
          <Link to={`/feedback/${jobID}`}>  <span>View Details</span></Link>
        </Space >
      ),
      key: "3",
    },
  ];

  // ============================== Job Role Table Columns ==============================
  const columns: any = [
    {
      title: "Sr. No.",
      dataIndex: "_id",
      key: "_id",
      render: (value: any, record: any, index: any) => {
        return <span>{index + pagination?.limit * pagination?.page - pagination?.limit + 1}</span>;
      },
    },
    {
      title: "Ground Name",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Ground Description",
      dataIndex: "description",
      align: "center",
    },
    {
      title: "Ground Price",
      dataIndex: "price",
      align: "center",
    },
    {
      title: "Category Name",
      dataIndex: "category",
      align: "center",
      render: (value: any, record: any, index: any) => {
        return <span className="capitalize">{getCategoryName(record?.categoryId)}</span>;
      },
    },
    {
      title: "Seats",
      dataIndex: "seats",
      align: "center",
      // render: (value: any, record: any, index: any) => {
      //   return <span>{record?.colorData?.name}</span>;
      // },
    },
    // {
    //   title: "Material",
    //   dataIndex: "material",
    //   align: "center",
    //   render: (value: any, record: any, index: any) => {
    //     return <span>{record?.materialData?.name}</span>;
    //   },
    // },

    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (_: any, text: any) => (
        <div>
          <Dropdown
            menu={{ items }}
            placement="bottom"
            trigger={["click"]}
            overlayClassName="actionDropDownBlocking my-dropdown-blocking"
            overlayStyle={{ borderRadius: "4px" }}
            onOpenChange={(visible) => {
              if (!visible) {
                // Do something when the dropdown is closed
                handleResetFormValues();
              } else {
                setJobID(text.id)
              }
            }}
          >
            <Space>
              <div
                className="border-color cursor-pointer"
                onClick={() => {
                  setJobID(text.id);
                  setGetFieldValues(text);
                  handleCrossAllocationValues(text);
                }}
              >
                <img src={actionImg} alt="ElpiseIcon" />
              </div>
            </Space>
          </Dropdown>
        </div>
      ),
    },
  ];

  return (
    <>
      <BreadCrumb
        breadCrumbItems={[
          {
            title: "Ground",
            path: "",
          },
          {
            title: "Home",
            path: renderDashboard(role),
          },
        ]}
      />

      <div className="setting-job-role">
        <div className="header border-radius-10">
          <Button
            className="add-job-role-btn fs-14 fw-600 border-radius-10 d-flex justify-center align-items-center"
            onClick={() => {
              setGetFieldValues({});
              setAddEditJobRole(true);
              setModalType("Add");
            }}
          >
            Add Ground Detail
            <PlusCircleOutlined style={{ marginLeft: "20px" }} />
          </Button>

          {/* ============================== Job Role Top Filters ============================== */}
          <Row gutter={[0, 20]} className="job-role-filters-wrapper">
            {role === ROLES.coordinator && (
              <Col xs={24} md={10} lg={8} xl={6} xxl={4}>
                <p className="fs-14 fw-600 title-color line-height-17 m-0" style={{ marginBottom: "0.563rem" }}>
                  Care Home
                </p>
                <div className="filter-column">
                  <Select
                    size="large"
                    placeholder="Select care home"
                    optionFilterProp="children"
                    defaultValue="All"
                    className="app-select-wrap-class"
                    popupClassName="app-select-popup-wrap-class"
                    style={{ width: "100%" }}
                    onChange={(value: string) => {
                      if (selectedCareHomeFilterValue === value) {
                        setSelectedCareHomeFilterValue("");
                      } else {
                        setSelectedCareHomeFilterValue(value);
                      }
                    }}
                    value={selectedCareHomeFilterValue}
                    options={careHomeDataDropdown}
                  />
                </div>
              </Col>
            )}
          </Row>
        </div>

        <div className="filter-bar">
          <Space className="input-export-icons input-search-wrapper" size={[30, 10]}>
            <Input
              className="search-input"
              placeholder="Search by product name"
              onChange={(event: any) => {
                // debouncedSearch(event.target.value, setSearchName);
                // setPagination({ ...pagination, page: 1 });
              
                if (event.target.value) {
                  dispatch(
                    setGrounds(
                      grounds.filter(({ name }: any) =>
                        name
                          ?.toLowerCase()
                          .includes(event.target.value?.toLowerCase())
                      )
                    )
                  );
                } else fetchGrounds();
              }}
              prefix={<img src={searchIcon} alt="searchIcon" width={22} height={22} style={{ marginRight: "0.623rem" }} />}
            />
            {/* <Space size={[25, 0]}>
              <img src={coloredCopyIcon} alt="csv" className="img-hover" />
              <img src={coloredCsvIcon} alt="csv" className="img-hover" />
              <img src={coloredXlsIcon} alt="csv" className="img-hover" />
            </Space> */}
          </Space>
        </div>

        {/* ============================== Job Role Table ============================== */}
        <div className="record-table  border-radius-10">
          <Table
            scroll={{ x: 768 }}
            columns={columns}
            dataSource={grounds}
            locale={{ emptyText: !productsLoading ? "No Data" : " " }}
            loading={productsLoading}
            pagination={{
              current: pagination.page,
              pageSize: pagination.limit,
              total: grounds.length,
              onChange: (page, limit) => setPagination({ limit, page }),
            }}
            className="common-setting-table"
          />
        </div>
      </div>

      {/* ============================== Add Modal For Job Role ============================== */}
      <AddProductsModal
        addEditJobRole={addEditJobRole}
        setAddEditJobRole={setAddEditJobRole}
        modalType={modalType}
        setGetFieldValues={setGetFieldValues}
        getTableRowValues={getTableRowValues}
        role={role}
        categoryOptions={categories.map((category: any) => ({ label: category.name, value: category.id }))}
        locationOptions={locations.map((location: any) => ({ label: location.location, value: location.id }))}
      />

      {/* ============================== Cross Allocation Modal For Job Role ============================== */}
      <CrossAllocationModal
        showCrossAllocation={showCrossAllocation}
        setShowCrossAllocation={setShowCrossAllocation}
        getTableRowValues={getTableRowValues}
        setGetFieldValues={setGetFieldValues}
        role={role}
        crossAllocationRecord={crossAllocationRecord}
        handleResetFormValues={handleResetFormValues}
      />

      {/* ============================== Delete Modal For Job Role ============================== */}
      <DeleteModal
        setDeleteModal={setIsDeleteModal}
        deleteModal={isDeleteModal}
        submitTitle="Yes"
        cancelTitle="No"
        title="Do you want to discard this Details?"
        onSubmit={handleDeleteSubmit}
        onCancel={() => setIsDeleteModal(false)}
      // isLoading={isDeleteJobRequestMutation}
      />
    </>
  );
};

export default AddProducts;
