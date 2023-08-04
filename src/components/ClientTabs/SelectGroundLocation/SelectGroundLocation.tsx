import { useState } from "react";
import { Button, Col, Row, Slider } from "antd";

import "./GroundStaffFilters.scss";
import {
  useAllocateCarersMutation,
  useDeleteStaffMutation,
} from "../../../store/Slices/StaffAllocation";
import AppSnackbar from "../../../utils/AppSnackbar";
import DeleteModal from "../../../shared/DeleteModal/DeleteModal";
import GroundInnerFilters from "./GroundInnerFilters";

const handleStyling: any = {
  color: "blue",
  border: "7px solid white",
  borderRadius: 5,
  height: 29,
  width: 16,
  position: "absolute",
  top: -4,
  boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.25)",
};

const StaffAllocationFilters = (props: any) => {
  
  const {
    filterValues,
    setFilterValues,
    careHomeOptions,
    userTypeOptions,
    selectedRows,
    careHomeId,
    selectedRowKeys,
    setSelectedRowKeys,
    paginationStaff,
    setPagination
  } = props;

  const [inputValue, setInputValue] = useState(50);
  const [isAllocateCarerModal, setIsAllocateCarerModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const onChange = (newValue: number) => {
    setInputValue(newValue);
  };

  //Allocate Carer
  const [allocateCare] = useAllocateCarersMutation();

  const handleAllocate = async () => {
    const payload = {
      clientId: [careHomeId],
      staffId: selectedRows,
    };
    const { data ,error}: any = await allocateCare(payload);
    if (data) {
      setSelectedRowKeys([]);
      AppSnackbar({ type: "success", message: data?.message });
    }
    if(error){
        AppSnackbar({
          type: "error",
          messageHeading: "Error",
          message: error?.data?.message ?? "Something went wrong!",
        });
    }
  };

  //Delete Staff
  const [deleteStaff] = useDeleteStaffMutation();

  const handleDeleteSubmit = async () => {
    const payload: any = {
      staffId: selectedRows,
    };
    const { data }: any = await deleteStaff({ id: careHomeId, payload });
    if (data) {
      setSelectedRowKeys([]);
      AppSnackbar({ type: "success", message: data?.message });
    }
  };

  return (
    <div className="inner-wrap-filters">

      <div className="bottom-inset-filters d-flex justify-between align-center">
        <GroundInnerFilters
          careHomeOptions={careHomeOptions}
          userTypeOptions={userTypeOptions}
          filterValues={filterValues}
          setFilterValues={setFilterValues}
          paginationStaff={paginationStaff}
          setPagination={setPagination}
        />

       
      </div>
    
      <DeleteModal deleteModal={deleteModal} title={"Are you sure you want to remove this record?"} submitTitle={"Yes, Remove"} cancelTitle={"Cancel"} setDeleteModal={() => setDeleteModal(false)} />
    </div>
  );
};

export default StaffAllocationFilters;
