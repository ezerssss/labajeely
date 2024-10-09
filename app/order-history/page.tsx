"use client";

import { useState, useMemo } from "react";
import { Table } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";



const orderData = [
  {
    orderId: "#001",
    name: "Ezra Magbanua",
    address: "Balay Lampirong, UPV, Miagao",
    serviceType: "Dry Wash",
    bag: "Blue Duffle Bag",
    weight: 5,
    logistics: "Delivery",
    status: "To do",
    paymentStatus: "Unpaid",
    date: "10/09/2024",
  },
  {
    orderId: "#002",
    name: "Isabel Garcia",
    address: "International Dormitory, UPV, Miagao",
    serviceType: "Folded",
    bag: "Red Backpack",
    weight: 3,
    logistics: "Pick-up",
    status: "Completed",
    paymentStatus: "Paid",
    date: "10/08/2024",
  },
  {
    orderId: "#003",
    name: "Mark Reyes",
    address: "Balay Gumamela, UPV, Miagao",
    serviceType: "Press Only",
    bag: "Yellow Tote Bag",
    weight: 7,
    logistics: "Delivery",
    status: "In progress",
    paymentStatus: "Unpaid",
    date: "10/07/2024",
  },
  {
    orderId: "#004",
    name: "Ana Santos",
    address: "Balay Kanlaon, UPV, Miagao",
    serviceType: "Dry Wash",
    bag: "Black Suitcase",
    weight: 10,
    logistics: "Delivery",
    status: "Completed",
    paymentStatus: "Paid",
    date: "10/06/2024",
  },
  {
    orderId: "#005",
    name: "Carlos Dela Cruz",
    address: "Balay Madyaas, UPV, Miagao",
    serviceType: "Laundry Wash and Fold",
    bag: "Green Gym Bag",
    weight: 4,
    logistics: "Pick-up",
    status: "To do",
    paymentStatus: "Unpaid",
    date: "10/05/2024",
  },
  {
    orderId: "#006",
    name: "Joana Bernardo",
    address: "Balay Kanlaon, UPV, Miagao",
    serviceType: "Press Only",
    bag: "Blue Backpack",
    weight: 6,
    logistics: "Delivery",
    status: "Completed",
    paymentStatus: "Paid",
    date: "10/04/2024",
  },
  {
    orderId: "#007",
    name: "Miguel Francisco",
    address: "Balay Kanlaon, UPV, Miagao",
    serviceType: "Dry Wash",
    bag: "Gray Duffle Bag",
    weight: 8,
    logistics: "Pick-up",
    status: "In progress",
    paymentStatus: "Unpaid",
    date: "10/03/2024",
  },
  {
    orderId: "#008",
    name: "Sofia Rodriguez",
    address: "Balay Lampirong, UPV, Miagao",
    serviceType: "Laundry Wash and Fold",
    bag: "Pink Suitcase",
    weight: 5,
    logistics: "Delivery",
    status: "To do",
    paymentStatus: "Unpaid",
    date: "10/02/2024",
  },
  {
    orderId: "#009",
    name: "Josefina Cruz",
    address: "Balay Miagao, UPV, Miagao",
    serviceType: "Press Only",
    bag: "Purple Backpack",
    weight: 2,
    logistics: "Pick-up",
    status: "Completed",
    paymentStatus: "Paid",
    date: "10/01/2024",
  },
  {
    orderId: "#010",
    name: "Paolo Villanueva",
    address: "Balay Lampirong, UPV, Miagao",
    serviceType: "Dry Wash",
    bag: "White Duffle Bag",
    weight: 9,
    logistics: "Delivery",
    status: "In progress",
    paymentStatus: "Unpaid",
    date: "09/30/2024",
  },
];


const serviceTypes = ["Dry Wash", "Folded", "Press Only"];
const logisticsOptions = ["Pick-up", "Delivery"];
const statuses = ["In progress", "Completed", "To do"];
const paymentStatuses = ["Unpaid", "Paid"];

const tableHeaders = [
  "Order ID", "Name", "Address", "Service Type", "Bag", "Weight (kg)", "Logistics", "Status", "Payment Status", "Date"
];

// Color based on status
const getBadgeColor = (status: string) => {
  switch (status) {
    case "Completed":
    case "Paid":
      return "bg-green-100 text-green-700";
    case "In progress":
      return "bg-blue-100 text-blue-700";
    case "Unpaid":
    case "To do":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

// Main
export default function OrderHistory() {
  // Search 
  const [filter, setFilter] = useState<string>(""); 
  // Service Type Filter
  const [serviceFilter, setServiceFilter] = useState<string[]>([]);
  // Logistics Filter
  const [logisticsFilter, setLogisticsFilter] = useState<string | null>(null);
  // Status Filter
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  // Payment Status Filter
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string | null>(null);

  // Filter
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "clear") {
      clearFilters();
    } else if (serviceTypes.includes(value)) {
      setServiceFilter([value]); 
    } else if (logisticsOptions.includes(value)) {
      setLogisticsFilter(value);
    } else if (statuses.includes(value)) {
      setStatusFilter(value);
    } else if (paymentStatuses.includes(value)) {
      setPaymentStatusFilter(value);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setFilter("");
    setServiceFilter([]);
    setLogisticsFilter(null);
    setStatusFilter(null);
    setPaymentStatusFilter(null);
  };

  // Memoized filter
  const filteredOrders = useMemo(() => {
    return orderData.filter(order => {
      const matchesName = order.name.toLowerCase().includes(filter.toLowerCase());
      const matchesServiceType = serviceFilter.length === 0 || serviceFilter.includes(order.serviceType);
      const matchesLogistics = !logisticsFilter || order.logistics === logisticsFilter;
      const matchesStatus = !statusFilter || order.status === statusFilter;
      const matchesPaymentStatus = !paymentStatusFilter || order.paymentStatus === paymentStatusFilter;

      return matchesName && matchesServiceType && matchesLogistics && matchesStatus && matchesPaymentStatus;
    });
  }, [filter, serviceFilter, logisticsFilter, statusFilter, paymentStatusFilter]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Order History</h1>

      {/* Search and filter dropdown container */}
      <div className="flex items-center mb-6 gap-4">
        <Input
          placeholder="Search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg shadow-sm w-full"
        />

        <div className="relative">
          <select 
            onChange={handleFilterChange}
            className="border border-gray-300 px-3 py-2 rounded-lg shadow-sm w-full"
            style={{ backgroundColor: '#DBEAFF', color: 'black' }} 
          >
            {/* Dropdown for filters */}
            <option value="" className="text-black">Select Filter</option>
            <optgroup label="Service Types">
              {serviceTypes.map((type) => (
                <option key={type} value={type} className="text-black">{type}</option>
              ))}
            </optgroup>
            <optgroup label="Logistics">
              {logisticsOptions.map((logistics) => (
                <option key={logistics} value={logistics} className="text-black">{logistics}</option>
              ))}
            </optgroup>
            <optgroup label="Order Statuses">
              {statuses.map((status) => (
                <option key={status} value={status} className="text-black">{status}</option>
              ))}
            </optgroup>
            <optgroup label="Payment Statuses">
              {paymentStatuses.map((paymentStatus) => (
                <option key={paymentStatus} value={paymentStatus} className="text-black">{paymentStatus}</option>
              ))}
            </optgroup>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {/* Filter badges */}
        {serviceFilter.map((filterType, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-gray-700"
          >
            {filterType}
            <button
              onClick={() => setServiceFilter((prev) => prev.filter((type) => type !== filterType))}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}

        {logisticsFilter && (
          <div
            className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-gray-700"
          >
            {logisticsFilter}
            <button
              onClick={() => setLogisticsFilter(null)}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {statusFilter && (
          <div
            className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-gray-700"
          >
            {statusFilter}
            <button
              onClick={() => setStatusFilter(null)}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {paymentStatusFilter && (
          <div
            className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-gray-700"
          >
            {paymentStatusFilter}
            <button
              onClick={() => setPaymentStatusFilter(null)}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Clear all filters Button */}
        <button
          onClick={clearFilters}
          disabled={!filter && serviceFilter.length === 0 && !logisticsFilter && !statusFilter && !paymentStatusFilter}
          className={`ml-2 px-4 py-2 rounded-lg transition-all ${filter || serviceFilter.length > 0 || logisticsFilter || statusFilter || paymentStatusFilter ? "bg-[#9CC0D9] text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
        >
          Clear All
        </button>
      </div>

      <div className="border border-gray-300 shadow-lg rounded-2xl overflow-hidden mt-6 p-4">

      {/* Table of Orders */}
      <Table className="min-w-full table-auto rounded-2xl overflow-hidden">

        {/* Table Headers */}
        <thead
          className="text-left text-gray-700 uppercase tracking-wide text-sm font-semibold rounded-t-2xl"
          style={{ backgroundColor: '#DBEAFF' }}
        >
          <tr className="border-b border-gray-200">
            {tableHeaders.map((header, index) => (
              <th key={index} className="py-2 px-4">{header}</th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="text-gray-600">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => ( //Map for filters
              <tr key={index} className="border-b border-gray-200">

                {/* Order Details */}
                <td className="py-2 px-4">{order.orderId}</td>
                <td className="py-2 px-4">{order.name}</td>
                <td className="py-2 px-4">{order.address}</td>
                <td className="py-2 px-4">{order.serviceType}</td>
                <td className="py-2 px-4">{order.bag}</td>
                <td className="py-2 px-4">{order.weight}</td>
                <td className="py-2 px-4">{order.logistics}</td>
                <td className="py-2 px-4">

                  <Badge className={getBadgeColor(order.status)}>{order.status}</Badge>
                </td>
                <td className="py-2 px-4">
                  <Badge className={getBadgeColor(order.paymentStatus)}>{order.paymentStatus}</Badge>
                </td>
                <td className="py-2 px-4">{order.date}</td>
              </tr>
            ))
          ) : (
            <tr>

              {/* Case of 0 orders */}
              <td colSpan={tableHeaders.length} className="text-center py-4">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>

    </div>
  );
}
