import React, { useEffect } from 'react'
import { BreadCrumbConfig, HeaderTitleHandler } from '../../Redux/Reducers/UtilsReducers';
import { useDispatch } from 'react-redux';

export default function Settings() {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(HeaderTitleHandler('Settings'));
        dispatch(BreadCrumbConfig({
         title:'Settings',
         href:'/settings',
         preventPush:false
        } as any))
       },[]);
  return (
    <div>Settings</div>
  )
}
