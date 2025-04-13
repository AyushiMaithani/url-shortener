import { useState } from 'react';
import axios from 'axios';

export default function LinkForm() {
  const [longUrl, setLongUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shortUrl, setShortUrl] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShortUrl(null);

    try {
      const payload = {
        url: longUrl,
        alias: customAlias || undefined,
        expiration_date: expirationDate ? new Date(expirationDate).toISOString() : undefined,
      };

      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
      const response = await axios.post(`${baseUrl}/api/url`, payload);

      if (response.status === 200 || response.status === 201) {
        const shortId = response.data.id;
        const generatedUrl = `${baseUrl}/api/url/${shortId}`;
        setShortUrl(generatedUrl);
      } else {
        throw new Error('Something went wrong while creating the short link.');
      }

      setLongUrl('');
      setCustomAlias('');
      setExpirationDate('');
    } catch (err) {
      if (err.response?.status === 409) {
        setError("That custom alias is already in use. Please try another.");
      } else {
        setError(err.response?.data?.message || err.message || 'Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create Short Link</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Long URL
          </label>
          <input
            type="url"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Custom Alias (optional)
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Expiration Date (optional)
          </label>
          <input
            type="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? 'Creating...' : 'Generate Short Link'}
        </button>

        {shortUrl && (
          <div className="mt-4 text-green-600 text-sm">
            Short URL:{" "}
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {shortUrl}
            </a>
            <button
              onClick={() => navigator.clipboard.writeText(shortUrl)}
              className="ml-2 text-blue-600 hover:underline text-sm"
            >
              Copy
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
