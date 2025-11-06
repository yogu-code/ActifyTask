"use client";
import React from "react";
import AccountTable from "../components/Accounttable";
import { useSelector } from "react-redux";

export default function Page() {
  // ✅ Correct selector
  const accounts = useSelector((state) => state.accounts.data);

  console.log("Accounts from Redux Store:", accounts);

  return (
    <div>
      <AccountTable data={accounts} />
    </div>
  );
}
