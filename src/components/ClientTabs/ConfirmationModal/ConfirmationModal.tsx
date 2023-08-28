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

  const onChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };

  const onClose = () => {
    setOpenDrawer(false);
    navigate("/productDetails/cart-details/checkout-details",{state:{price:groundData?.price}})
  };

  return (
    <>
      <Space>
      </Space>
      <Drawer
        title="Drawer with extra actions"
        placement={placement}
        width={500}
        onClose={onClose}
        open={openDrawer}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <p>Name : {groundData?.name}</p>
        <p>Description : {groundData?.description}</p>
        <p>Seats : {groundData?.seats}</p>
        <p>Price : {groundData?.price}</p>
        <p>Slots : {groundData?.slots?.map((data:any)=>{return <>{data}</>})}</p>
        

       <Button type="primary" onClick={onClose}>
              Confirm Booking
            </Button>
      </Drawer>
    </>
  );
};

export default ConfirmationModal;