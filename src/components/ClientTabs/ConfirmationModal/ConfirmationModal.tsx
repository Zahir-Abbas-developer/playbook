import React, { useState } from 'react';
import { Button, Drawer, Radio, Space } from 'antd';
import type { DrawerProps } from 'antd/es/drawer';
import type { RadioChangeEvent } from 'antd/es/radio';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const ConfirmationModal = ({ openDrawer, setOpenDrawer, groundData, productId, slot, date }: any) => {

  const [placement, setPlacement] = useState<DrawerProps['placement']>('right');
  const navigate = useNavigate()
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
  };
  const handleConfirmBooking = () => {
    navigate("/productDetails/cart-details/checkout-details", { state: { price: groundData?.price, groundId: groundData?.id, slot, date: dayjs(date).format('YYYY-MM-DD') } })

  }
  return (
    <>
      <Space>
      </Space>
      <Drawer
        title="Details"
        className="confirmation-drawer"
        placement={placement}
        width={500}
        onClose={onClose}
        open={openDrawer}

      >
        <p>Name : {groundData?.name ?? groundData?.parkName}</p>
        <p>Description : {groundData?.description}</p>
        {groundData?.seats && <p>Seats : {groundData?.seats}</p>}
        <p>Price : {groundData?.price}</p>
        <p>Slots : {groundData?.slots?.map((data: any) => { return <>{data}</> })}</p>


        <Button type="primary" disabled={!userRole} onClick={handleConfirmBooking}>
          Confirm Booking
        </Button>
        {!userRole && <p>Please First SignIn For Booking Thanks!</p>}
      </Drawer>
    </>
  );
};

export default ConfirmationModal;