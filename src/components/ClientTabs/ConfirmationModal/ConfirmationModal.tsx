import React, { useState } from 'react';
import { Button, Drawer, Radio, Space } from 'antd';
import type { DrawerProps } from 'antd/es/drawer';
import type { RadioChangeEvent } from 'antd/es/radio';
import { Link, useNavigate } from 'react-router-dom';

const ConfirmationModal = ({openDrawer,setOpenDrawer,groundData}:any) => {

  const [placement, setPlacement] = useState<DrawerProps['placement']>('right');
 const navigate=useNavigate()
  const showDrawer = () => {
    setOpenDrawer(true);
  };
  const { role: userRole, id: userId }: any = JSON.parse(localStorage.getItem("user") || "{}");
  const onChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };
  console.log(groundData)
  const onClose = () => {
    setOpenDrawer(false);
    navigate("/productDetails/cart-details/checkout-details",{state:{price:groundData?.price,groundId:groundData?.id}})
  };

  return (
    <>
      <Space>
      </Space>
      <Drawer
        title=""
        placement={placement}
        width={500}
        onClose={onClose}
        open={openDrawer}
     
      >
        <p>Name : {groundData?.name}</p>
        <p>Description : {groundData?.description}</p>
   {groundData?.seats &&     <p>Seats : {groundData?.seats}</p>}
        <p>Price : {groundData?.price}</p>
        <p>Slots : {groundData?.slots?.map((data:any)=>{return <>{data}</>})}</p>
        

     <Button type="primary"  disabled={!userRole} onClick={onClose}>
              Confirm Booking
            </Button>
          {!userRole &&  <p>Please First SignIn For Booking Thanks!</p>}
      </Drawer>
    </>
  );
};

export default ConfirmationModal;