import { useState } from 'react';
import { format } from 'date-fns';

export default function Dashboard() {
  const [links] = useState([]);
  const [loading] = useState(false);
  const [filter, setFilter] = useState('all'); // all, active, expired

  return (
    <div className="mt-8">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Your Links</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="all">All Links</option>
          <option value="active">Active</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Original URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Short Link
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Clicks
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expires
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : links.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">
                  No links found
                </td>
              </tr>
            ) : (
              links.map((link) => (
                <tr key={link.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {link.long_url}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    {link.short_url}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {link.clicks}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(link.created_at), 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {link.expiration_date
                      ? format(new Date(link.expiration_date), 'MMM d, yyyy')
                      : 'Never'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}