import React, { useState } from 'react';
import { Button, Drawer, Radio, Space } from 'antd';
import type { DrawerProps } from 'antd/es/drawer';
import type { RadioChangeEvent } from 'antd/es/radio';
import { Link } from 'react-router-dom';

const ConfirmationModal = ({openDrawer,setOpenDrawer}:any) => {

  const [placement, setPlacement] = useState<DrawerProps['placement']>('right');

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const onChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };

  const onClose = () => {
    setOpenDrawer(false);
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
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>

       <Link  to="/productDetails/cart-details/checkout-details"> <Button type="primary" onClick={onClose}>
              Confirm Booking
            </Button></Link>
      </Drawer>
    </>
  );
};

export default ConfirmationModal;