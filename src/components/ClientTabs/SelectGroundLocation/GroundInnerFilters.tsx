import { DatePicker, Select } from 'antd'
import arrowDownSmall from '../../../assets/icons/arrow-small-down.svg'
import "./GroundLocationInnerFilters.scss"
import datePicker from "../../../assets/BookingCalander/images/date-picker.png";
import dayjs from 'dayjs';
const GroundInnerFilters = (props:any) => {
  const {careHomeOptions,userTypeOptions,filterValues,setFilterValues ,paginationStaff ,setPagination} = props
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const handleChangeStartDate=(value:any)=>{
    console.log(`selected ${value}`);
  }
  const handleChangeEndDate=(value:any)=>{
    console.log(`selected ${value}`);
  }
  return (
    <div className="wrapper-fliters">
      <div className="flex-filters">

        <div className='inner-flex-filters'>
          <div className="col-box">
            <div className="area-fliters">
              <div className='filters-label fw-600 fs-14'>Select Location</div>
              <Select
                placeholder="Select Care Home"
                style={{ width: '100%' }}
                suffixIcon={<img src={arrowDownSmall} alt="" />}
                onChange={handleChange}
                options={[
                  { value: 'rawalpindi', label: 'Rawalpindi' },
                  { value: 'wahcantt', label: 'WahCantt' },
                  { value: 'islamabad', label: 'Islamabad' },
                  
                ]}
              />
              
            </div>
          </div>
          <div className="col-box">
            <div className="area-fliters">
              <div className='filters-label fw-600 fs-14'>Select Slot</div>
              <Select
                placeholder="All"
                style={{ width: '100%' }}
                onChange={(value:string) => {setFilterValues({...filterValues, allocationStatus : value});setPagination({...paginationStaff,page:1})}}
                suffixIcon={<img src={arrowDownSmall} alt="" />}
                options={[
                  { value: 'fullday', label: 'Full Day (24 Hours)' },
                  { value: 'morning', label: 'Morning (6AM - 12AM)' },
                  { value: 'afternoon', label: 'Afternoon (1PM - 4PM)' },
                  { value: 'evening', label: 'Evening (4PM - 8PM)' },
                  { value: 'night', label: 'Night(8PM - 1AM)' },
                ]}
              />
            </div>
          </div>
          <div className="col-box">
            <div className="area-fliters">
              <div className='filters-label fw-600 fs-14'>Date </div>
              <DatePicker
                 showTime 
                suffixIcon={<img src={datePicker} alt="calander" />}
                className="staff-filters-select title-color"
                style={{ width: "100%", border: "none", borderRadius: "0px" }}
                onChange={handleChangeStartDate}
                placeholder="From"
              />
            </div>
          </div>
        
        </div>

      </div>
    </div>
  )
}

export default GroundInnerFilters