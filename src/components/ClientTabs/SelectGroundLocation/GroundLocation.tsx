import { useState } from "react";

import { Dropdown, Row, Space } from "antd";

import "./GroundLocation.scss";

import { ColumnsType } from "antd/es/table";


import threeDots from "../../assets/icons/three-dots.svg";




import StaffAllocationFilters from "./SelectGroundLocation";

const StaffAllocation = () => {
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [rowStatus, setRowStatus] = useState("");
  const [pagination, setPagination] = useState({ limit: 5, page: 1 });
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");

  //Filter States
  const [filterValues, setFilterValues] = useState({
    careHome: "",
    allocationStatus: "",
    userType: "",
  });

  const [isAllocateCarerModal, setIsAllocateCarerModal] = useState(false);
  const [isViewCarerHomeModal, setIsViewCarerHomeModal] = useState(false);

  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isProfileModal, setIsProfileModal] = useState(false);

  const handleCancelSubmit = () => {
    setIsDeleteModal(false);
  };


  //query parameters of search and filter
  const paramsObj: any = {};
  if (searchTerm) paramsObj["search"] = searchTerm;
  if (filterValues?.allocationStatus && filterValues?.allocationStatus !== "All")
    paramsObj["allocationStatus"] = filterValues?.allocationStatus;
  if (filterValues?.userType) paramsObj["userType"] = filterValues?.userType;
  const query = "&" + new URLSearchParams(paramsObj).toString();

  //Get Staff List
  

  //BreadCrumb Items
  const breadCrumbItems = [
    {
      title: "Staff Allocation",
      path: "",
    },
    {
      title: "Dashboard",
      path: "/dashboard",
    },
  ];

  return (
    <>
    
      <div className="staff-allocation-main-wrapper">
        <div className="wrapper-top-cards">
          
        </div>
        <div className="wrapper-filters">
          <StaffAllocationFilters
         
            selectedRowKeys={selectedRowKeys}
            setSelectedRowKeys={setSelectedRowKeys}
            selectedRecord={selectedRecord}
            selectedRows={selectedRows}
        
            filterValues={filterValues}
            paginationStaff={pagination}
            setPagination={setPagination}
            setFilterValues={setFilterValues}
          />
        </div>
        
        
      
      </div>
     
    </>
  );
};

export default StaffAllocation;
