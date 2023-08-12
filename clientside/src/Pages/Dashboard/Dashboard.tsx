import React, { useEffect } from 'react'
import { Col, Row } from 'antd'
import { MenuItems } from '../../Constants/Constant';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import StatisticModal from '../StatisticModal/StatisticModal';
import { BreadCrumbConfig, HeaderTitleHandler } from '../../Redux/Reducers/UtilsReducers';

export default function Dashboard() {
  const UtilsModal = useSelector((state:any)=> state.UtilsReducer.isModalOpen);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(HeaderTitleHandler('Dashboard'));
   dispatch(BreadCrumbConfig({
    title:'Dashboard',
    href:'/',
    preventPush:true
   } as any))
  },[]);

  const onFinish = (val:any) => {

  }
  return (
    <>
    <Row className='dashboard-row'>
      {MenuItems?.map((M: any) => (
        <Col className='dashboard-col' xs={24} sm={12} md={8} lg={8} xl={6}>
          <NavLink to={M.path}>
            <div className="menu-tiles">
              <img className='menu-img' src={M.image} />
              <div className="menu-title">{M.title}</div>
            </div>
          </NavLink>
        </Col>
      ))}
    </Row>
    <StatisticModal isOpen={UtilsModal} onFinish={onFinish} className='statistic-modal'/>
    </>
  )
}
