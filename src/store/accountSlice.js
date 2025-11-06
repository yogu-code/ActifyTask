import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
      accountName: "TechNova Pvt Ltd",
      email: "contact@technova.com",
      phone: "+91 9876543210",
      website: "https://technova.com",
      industry: "Technology",
      status: "Active",
      remark: "Trusted client",
    },
    {
      accountName: "HealthFirst Labs",
      email: "info@healthfirst.com",
      phone: "+91 9123456780",
      website: "https://healthfirst.com",
      industry: "Healthcare",
      status: "Inactive",
      remark: "Follow-up needed",
    },
    {
      accountName: "EduSmart Systems",
      email: "support@edusmart.com",
      phone: "+91 9988776655",
      website: "https://edusmart.com",
      industry: "Education",
      status: "Active",
      remark: "New contract",
    },
    {
      accountName: "FinEdge Corp",
      email: "accounts@finedge.com",
      phone: "+91 8877665544",
      website: "https://finedge.com",
      industry: "Finance",
      status: "Inactive",
      remark: "Pending renewal",
    },
    {
      accountName: "TravelEase India",
      email: "hello@travelease.in",
      phone: "+91 9765432109",
      website: "https://travelease.in",
      industry: "Travel",
      status: "Active",
      remark: "Frequent client",
    },
    {
      accountName: "FoodNest Pvt Ltd",
      email: "orders@foodnest.com",
      phone: "+91 9898989898",
      website: "https://foodnest.com",
      industry: "Food & Beverages",
      status: "Active",
      remark: "Top performer",
    },
    {
      accountName: "BuildRight Constructions",
      email: "sales@buildright.in",
      phone: "+91 9345678912",
      website: "https://buildright.in",
      industry: "Construction",
      status: "Inactive",
      remark: "On hold",
    },
    {
      accountName: "MediQuick Pharma",
      email: "service@mediquick.com",
      phone: "+91 9234567891",
      website: "https://mediquick.com",
      industry: "Pharmaceutical",
      status: "Active",
      remark: "Regular supplier",
    },
    {
      accountName: "GreenEarth Solutions",
      email: "info@greenearth.in",
      phone: "+91 9456123789",
      website: "https://greenearth.in",
      industry: "Environment",
      status: "Inactive",
      remark: "Awaiting feedback",
    },
    {
      accountName: "AutoDrive Motors",
      email: "contact@autodrive.com",
      phone: "+91 9784561230",
      website: "https://autodrive.com",
      industry: "Automobile",
      status: "Active",
      remark: "New partnership",
    },
  ]
};

const accountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    addAccount: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const { addAccount } = accountSlice.actions;
export default accountSlice.reducer;
