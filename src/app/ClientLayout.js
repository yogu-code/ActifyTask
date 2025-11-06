"use client";

import Sidebar from "@/components/Sidebar";
import { Provider } from "react-redux";
import { store } from "@/store/AccountStore";

export default function ClientLayout({ children }) {
  return (
    <Provider store={store}>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 ml-16 sm:ml-52">
          <main className="w-full">
            {children}
          </main>
        </div>
      </div>
    </Provider>
  );
}