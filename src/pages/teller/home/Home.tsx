import Header from '@/components/Header';
import SiderBar from '@/components/SiderBar';
import useAuth from '@/hooks/useAuth';
import {Outlet, Route, Routes } from 'react-router-dom'
import Admin from '../admin/Admin';

const Home = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { auth }:any = useAuth();
  
  return (
      <div className="w-full">
        Hello
      </div>
  )
}

export default Home;
