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
                  { value: 'fullday', label: 'Full Day' },
                  { value: 'morning', label: 'Morning' },
                  { value: 'evening', label: 'Evening' },
                  { value: 'night', label: 'Night' },
                ]}
              />
            </div>
          </div>
          <div className="col-box">
            <div className="area-fliters">
              <div className='filters-label fw-600 fs-14'>Start Date & Time</div>
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
          <div className="col-box">
            <div className="area-fliters">
              <div className='filters-label fw-600 fs-14'>End Date & Time</div>
              <DatePicker
              showTime 
                suffixIcon={<img src={datePicker} alt="calander" />}
                className="staff-filters-select title-color"
                style={{ width: "100%", border: "none", borderRadius: "0px" }}
                onChange={handleChangeEndDate}
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