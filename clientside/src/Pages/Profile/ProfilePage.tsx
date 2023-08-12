import React, { useEffect } from 'react'
import { BreadCrumbConfig, HeaderTitleHandler } from '../../Redux/Reducers/UtilsReducers';
import { useDispatch } from 'react-redux';

export default function ProfilePage() {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(HeaderTitleHandler('Profile'));
        dispatch(BreadCrumbConfig({
         title:'Profile',
         href:'/profile',
         preventPush:false
        } as any))
       },[]);
  return (
    <div>ProfilePage</div>
  )
}
