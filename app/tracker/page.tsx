"use client";

import React, { useState, useEffect } from "react";
import "./Tracker.css";
import { ShoppingCart, Settings, Package, Check } from "lucide-react";
import { generateTrackingNumber } from "@/lib/utils";

const status = [
  "Confirmed Order", 
  "In Progress", 
  "Waiting for Pickup", 
  "Done"
];

const messages = [
  "The laundry order has been successfully placed.",
  "The laundry is currently being washed, dried, or ironed.",
  "The laundry is ready and waiting to be picked up by the customer.",
  "The customer has picked up their laundry, and the order is complete."
];

const icons = [
  <ShoppingCart size={43} />,
  <Settings size={46} />,
  <Package size={48} />,
  <Check size={50} />
]; 

export default function Tracker () {  

  const [currentStatus, setCurrentStatus] = useState(0);
  const [complete, setComplete] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [orderHistory, setOrderHistory] = useState([{
    status: status[0],
    message: messages[0],
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  }]);

  useEffect(() => {
    setTrackingNumber(generateTrackingNumber());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStatus < status.length - 1) {
        setOrderHistory(prevHistory => [
          ...prevHistory,
          {
            status: status[currentStatus + 1],
            message: messages[currentStatus + 1],
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
          }
        ]);
        setCurrentStatus(prev => prev + 1);
      } else {
        setComplete(true);
        clearInterval(interval);
      }
    }, 11000);

    return () => clearInterval(interval);
  }, [currentStatus, status, messages]);

  return (
    <div className="flex flex-col items-center h-screen bg-gradient-to-br from-[#A6D3EF] to-[#EFF5FF]">
      <div className="flex gap-[500px] fixed left-[80px] mt-[30px]">
        <div>
          <p className="font-bold text-center text-[50px] text-[#173563] mb-5">
            Tracking Order
          </p>
          <p className="font-normal bg-white text-[20px] text-center text-[#173563] p-[10px] rounded-[10px] shadow-2xl">
            <strong>{trackingNumber}</strong>
          </p>
        </div>

        <div className="text-left overflow-y-auto mt-[30px]">
          {orderHistory.map((order, index) => (
            <div 
            key={order.message} 
              className="relative flex"
            >
              <div className="flex flex-col items-center mr-5">
                <div className={`bullet ${index <= currentStatus ? 'active' : ""}`}></div>
                {index < orderHistory.length - 1 && <div className="line"></div>}
              </div>
              <div>
                <p className="font-normal text-[12.5px] text-[#173563]">
                  <strong>{order.status}</strong> - {order.message}
                </p>
                <p className="font-normal text-[12.5px] text-[#173563] mb-5">
                  {order.date} | {order.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-[290px] flex justify-between mt-[20px]">
        {status.map((status, index) => (
          <div
            key={index}
            className={`status-line ${currentStatus === index ? "active" : ""} ${index < currentStatus || complete ? "complete" : ""}`}
          >
            <div className="status">
              {icons[index]}
            </div>
            <p className="font-bold text-[13px] text-[#173563]">
            {status}
            </p>
          </div>
        ))}
      </div>

      <img src="/images/tracker/basket.png" alt="Basket" className="w-[1300px] fixed top-[485px] items-center" />

    </div>
  );
}
