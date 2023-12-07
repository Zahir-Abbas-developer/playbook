import { Button, DatePicker, Form, Select } from 'antd'
import arrowDownSmall from '../../../assets/icons/arrow-small-down.svg'
import "./ParkInnerFilters.scss"
import datePicker from "../../../assets/BookingCalander/images/date-picker.png";
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useAppSelector } from '../../../store';
import { firestore } from '../../../utils/firebase';
import { setLocations, setParkLocations } from "../../../store/Slices/Playbook";
const GroundInnerFilters = (props:any) => {
  const {setValues}=props;
  const dispatch = useDispatch();
  const { locations } = useAppSelector(state => state.playbook)
  const handleChangeStartDate=(value:any)=>{
    console.log(`selected ${value}`);
  }
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  useEffect(() => {
    if (!locations?.length)
      fetchLocations();
  }, []);

  const fetchLocations = () => {
  
    onSnapshot(collection(firestore, "parkLocations"), (snapshot) => {
      dispatch(setLocations(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))))
   
    });
  };
  const handleFinish=(valuesObject:any)=>{
    setValues(valuesObject)
  }
console.log("selectLocations",locations)
console.log(fetchLocations)
const selectLocations=locations?.map((location:any)=>{return({value:location?.id ,label:location?.name})})
console.log("selectLocations",selectLocations)

  return (
    <Form className='filter-form' onFinish={handleFinish}>
      
    <div className="wrapper-fliters">
      <div className="flex-filters">
     
          <div className='inner-flex-filters'>
            {/* ... (existing code) */}
            <div className="col-box">
              <div className="area-fliters">
                <div className='filters-label fw-600 fs-14'>Select Location</div>
                <Form.Item
                  name="location"
                  rules={[
                    {
                      required: true,
                      message: 'Please select a location!',
                    },
                  ]}
                >
                  <Select
                    placeholder="Select Care Home"
                    style={{ width: '100%' }}
                    suffixIcon={<img src={arrowDownSmall} alt="" />}
                    onChange={handleChange}
                    options={selectLocations}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="col-box">
              <div className="area-fliters">
                <div className='filters-label fw-600 fs-14'>Select Slot</div>
                <Form.Item
                  name="slot"
                  rules={[
                    {
                      required: true,
                      message: 'Please select a slot!',
                    },
                  ]}
                >
                  <Select
                    placeholder="All"
                    style={{ width: '100%' }}
                    onChange={handleChange }
                    suffixIcon={<img src={arrowDownSmall} alt="" />}
                    options={[
                      { value: 'fullday', label: 'Full Day (24 Hours)' },
                      { value: 'morning', label: 'Morning (6AM - 12AM)' },
                      { value: 'afternoon', label: 'Afternoon (1PM - 4PM)' },
                      { value: 'evening', label: 'Evening (4PM - 8PM)' },
                      { value: 'night', label: 'Night(8PM - 1AM)' },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="col-box">
              <div className="area-fliters">
                <div className='filters-label fw-600 fs-14'>Date </div>
                <Form.Item
                  name="date"
                  rules={[
                    {
                      required: true,
                      message: 'Please select a date!',
                    },
                  ]}
                >
                  <DatePicker
                    showTime
                    suffixIcon={<img src={datePicker} alt="calander" />}
                    className="staff-filters-select title-color"
                    style={{ width: "100%", border: "none", borderRadius: "0px" }}
                    onChange={handleChangeStartDate}
                    placeholder="From"
                  />
                </Form.Item>
              
              </div>
            </div>
          
          </div>
          
       
      </div>
    </div>
    <Form.Item>
                  <Button type="primary" htmlType="submit" className='search-button' style={{backgroundColor:"#3c3b91"}}>
                    Search
                  </Button>
                </Form.Item>
    </Form>
  )
}

export default GroundInnerFilters;
