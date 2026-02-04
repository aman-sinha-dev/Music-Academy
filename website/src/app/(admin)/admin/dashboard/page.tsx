'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/moving-border';
import { BackgroundGradient } from '@/components/ui/background-gradient';

type Tab = 'purchases' | 'contacts';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('purchases');
  const [purchases, setPurchases] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch Purchases
        const purchaseRes = await fetch('/api/admin/purchases', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (purchaseRes.ok) {
          const data = await purchaseRes.json();
          setPurchases(data.data || []);
        } else if (purchaseRes.status === 401) {
            localStorage.removeItem('adminToken');
            router.push('/admin/login');
            return;
        }

        // Fetch Contacts
        const contactRes = await fetch('/api/admin/contacts', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (contactRes.ok) {
            const data = await contactRes.json();
            setContacts(data.data || []);
          }
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center text-white">
            Loading dashboard...
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-black p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <Button
            onClick={handleLogout}
            className="bg-slate-900 text-white border-slate-800 h-10 px-4"
          >
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <BackgroundGradient className="rounded-[22px] p-4 sm:p-10 bg-white dark:bg-zinc-900">
                <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                    Total Purchases
                </p>
                <p className="text-4xl font-bold text-teal-400">
                    {purchases.length}
                </p>
            </BackgroundGradient>
            
            <BackgroundGradient className="rounded-[22px] p-4 sm:p-10 bg-white dark:bg-zinc-900">
                <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                    Total Inquiries
                </p>
                <p className="text-4xl font-bold text-teal-400">
                    {contacts.length}
                </p>
            </BackgroundGradient>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-gray-800 pb-2">
          <button
            onClick={() => setActiveTab('purchases')}
            className={`pb-2 px-1 ${
              activeTab === 'purchases'
                ? 'border-b-2 border-teal-500 text-teal-500 font-bold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Course Purchases
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`pb-2 px-1 ${
              activeTab === 'contacts'
                ? 'border-b-2 border-teal-500 text-teal-500 font-bold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Contact Inquiries
          </button>
        </div>

        {/* Table Content */}
        <div className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">
          {activeTab === 'purchases' ? (
            <div className="overflow-x-auto">
              {purchases.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">No purchases found.</div>
              ) : (
                <table className="w-full text-left text-sm text-gray-400">
                  <thead className="bg-zinc-800 uppercase text-xs text-gray-200">
                    <tr>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Customer</th>
                      <th className="px-6 py-3">Course</th>
                      <th className="px-6 py-3">Price</th>
                      <th className="px-6 py-3">Email</th>
                      <th className="px-6 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {purchases.map((purchase: any) => (
                      <tr key={purchase._id} className="hover:bg-zinc-800/50">
                        <td className="px-6 py-4">
                            {new Date(purchase.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 font-medium text-white">{purchase.name}</td>
                        <td className="px-6 py-4 text-teal-400">{purchase.courseTitle}</td>
                        <td className="px-6 py-4">${purchase.coursePrice}</td>
                        <td className="px-6 py-4">{purchase.email}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20">
                            {purchase.status || 'Completed'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              {contacts.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">No inquiries found.</div>
              ) : (
                <table className="w-full text-left text-sm text-gray-400">
                  <thead className="bg-zinc-800 uppercase text-xs text-gray-200">
                    <tr>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Name</th>
                      <th className="px-6 py-3">Subject</th>
                      <th className="px-6 py-3">Email</th>
                      <th className="px-6 py-3">Message</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {contacts.map((contact: any) => (
                      <tr key={contact._id} className="hover:bg-zinc-800/50">
                        <td className="px-6 py-4">
                            {new Date(contact.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 font-medium text-white">{contact.name}</td>
                        <td className="px-6 py-4 text-white">{contact.subject}</td>
                        <td className="px-6 py-4">{contact.email}</td>
                        <td className="px-6 py-4 max-w-xs truncate" title={contact.message}>
                          {contact.message}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
