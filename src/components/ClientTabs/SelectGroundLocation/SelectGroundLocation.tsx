import { useEffect, useState } from "react";
import { firestore } from "../../../utils/firebase";
import "./GroundStaffFilters.scss";


import DeleteModal from "../../../shared/DeleteModal/DeleteModal";
import { CollectionReference, collection,  onSnapshot, query, where } from "firebase/firestore";
import GroundInnerFilters from "./GroundInnerFilters";
import GroundInfo from "./GroundInfo";
import { useDispatch } from "react-redux";
import { setGrounds } from "../../../store/Slices/Playbook";
import { useAppSelector } from "../../../store";
import { useLocation } from "react-router-dom";



const StaffAllocationFilters = (props: any) => {

  const {
    filterValues,
    setFilterValues,
    careHomeOptions,
    userTypeOptions,
    paginationStaff,
    setPagination
  } = props;

  const [productsLoading, setProductsLoading] = useState<boolean>(false);
  const { grounds, }: any = useAppSelector((state: any) => state.playbook);
  const [deleteModal, setDeleteModal] = useState(false);
  const [values, setValues] = useState<any>(null);

 
  const dispatch = useDispatch()
  //Allocate Carer


 
  const fetchGrounds = () => {
    const locationCollection: CollectionReference = collection(firestore, "grounds");
    let baseQuery: any = locationCollection;
    if (values?.location) baseQuery = query(baseQuery, where("locationId", '==', values?.location));
    if (values?.slot) baseQuery = query(baseQuery, where("slots", 'array-contains', values?.slot));
    setProductsLoading(true);
    onSnapshot(baseQuery, (snapshot: any) => {
      const groundsData: any = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
      console.log("grounds", groundsData)
      setProductsLoading(false);
      dispatch(setGrounds(groundsData))
    });
  };
  useEffect(() => {
    fetchGrounds();

  }, [values]);
  const location = useLocation();
  const card = location.state;
  console.log(card)
  console.log(grounds)
 const filterData=grounds?.filter((id:any)=>id?.categoryId===card?.id)
 console.log(filterData)
  return (
    <div className="inner-wrap-filters">
      <p style={{ fontWeight: "bold", fontSize: "30px", marginBottom: "0px" }}>Search for Ground</p>
      <p>Find The Best Grounds In Your Area.</p>
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

      <GroundInfo grounds={filterData} values={values} />
      <DeleteModal deleteModal={deleteModal} title={"Are you sure you want to remove this record?"} submitTitle={"Yes, Remove"} cancelTitle={"Cancel"} setDeleteModal={() => setDeleteModal(false)} />
    </div>
  );
};

export default StaffAllocationFilters;
