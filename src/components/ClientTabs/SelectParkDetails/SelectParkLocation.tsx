import { useEffect, useState } from "react";
import { Button, Col, Row, Slider } from "antd";
import { firestore } from "../../../utils/firebase";
import "./ParkStaff.scss";
import {
  useAllocateCarersMutation,
  useDeleteStaffMutation,
} from "../../../store/Slices/StaffAllocation";
import AppSnackbar from "../../../utils/AppSnackbar";
import DeleteModal from "../../../shared/DeleteModal/DeleteModal";
import { CollectionReference, collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";

import { useDispatch } from "react-redux";
import { setGrounds, setParks } from "../../../store/Slices/Playbook";
import { useAppSelector } from "../../../store";
import SliderCard from "../Slider/SliderCard";
import GroundInnerFilters from "./ParkInnerFilters";
import GroundInfo from "./ParkInfo";

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
  const [productsLoading, setProductsLoading] = useState<boolean>(false);
  const { parks, }: any = useAppSelector((state:any) => state.playbook);
  const [deleteModal, setDeleteModal] = useState(false);
  const [values,setValues]=useState<any>(null);

  const onChange = (newValue: number) => {
    setInputValue(newValue);
  };

  const dispatch = useDispatch()
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

  const fetchGrounds = () => {
    const  locationCollection:CollectionReference=collection(firestore, "parks");
    let baseQuery:any = locationCollection;
    if(values?.location) baseQuery =query(baseQuery,where("locationId",'==',values?.location));
    if(values?.slot) baseQuery =query(baseQuery,where("slots",'array-contains',values?.slot));
    console.log(baseQuery)
    setProductsLoading(true);
    onSnapshot(baseQuery, (snapshot:any) => {
      const groundsData: any = snapshot.docs.map((doc:any) => ({ id: doc.id, ...doc.data() }))
      console.log("parks",groundsData)
      setProductsLoading(false);
      dispatch(setParks(groundsData))
    });
  };
  useEffect(() => {
     fetchGrounds();
  
  }, [values]);
  return (
    <div className="inner-wrap-filters">
     <p style={{fontWeight:"bold",fontSize:"30px",marginBottom:"0px"}}>Search for Parks</p>
     <p>Find The Best Parks In Your Area.</p>
      <div className="bottom-inset-filters d-flex justify-between align-center">
        <GroundInnerFilters
          careHomeOptions={careHomeOptions}
          userTypeOptions={userTypeOptions}
          filterValues={filterValues}
          setFilterValues={setFilterValues}
          paginationStaff={paginationStaff}
          setPagination={setPagination}
          setValues={setValues}
        />

       
      </div>
    
    <GroundInfo grounds={parks}/>
      <DeleteModal deleteModal={deleteModal} title={"Are you sure you want to remove this record?"} submitTitle={"Yes, Remove"} cancelTitle={"Cancel"} setDeleteModal={() => setDeleteModal(false)} />
    </div>
  );
};

export default StaffAllocationFilters;
