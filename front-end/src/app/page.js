'use client';

import { useEffect, useState } from "react";
import Spinner from "./components/Spinner";

export default function Home() {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit_per_page, setLimitPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const MAG_TYPES = ['md', 'ml', 'ms', 'mw', 'me', 'mi', 'mb', 'mlg']
  const URL_API = "http://localhost:3000";

  useEffect(() => {
    fetch(`${URL_API}/features?per_page=${limit_per_page}&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setFeatures(data.features);
        setLoading(false);
      });
  },[page, limit_per_page]);

  const handleLimitPerPage = (e) => {
    if (e.target.value < 1 || e.target.value > 1000) return;
    setLimitPerPage(e.target.value);
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex items-center gap-x-2">
        <h1 className="text-4xl font-bold">Geo-App</h1>
        <svg width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15.22 9.375a1 1 0 0 1 1.393 -.165l.094 .083l4 4a1 1 0 0 1 .284 .576l.009 .131v5a1 1 0 0 1 -.883 .993l-.117 .007h-16.022l-.11 -.009l-.11 -.02l-.107 -.034l-.105 -.046l-.1 -.059l-.094 -.07l-.06 -.055l-.072 -.082l-.064 -.089l-.054 -.096l-.016 -.035l-.04 -.103l-.027 -.106l-.015 -.108l-.004 -.11l.009 -.11l.019 -.105c.01 -.04 .022 -.077 .035 -.112l.046 -.105l.059 -.1l4 -6a1 1 0 0 1 1.165 -.39l.114 .05l3.277 1.638l3.495 -4.369z" strokeWidth="0" fill="currentColor" />
          <path d="M15.232 3.36a1 1 0 0 1 1.382 -.15l.093 .083l4 4a1 1 0 0 1 -1.32 1.497l-.094 -.083l-3.226 -3.225l-4.299 5.158a1 1 0 0 1 -1.1 .303l-.115 -.049l-3.254 -1.626l-2.499 3.332a1 1 0 0 1 -1.295 .269l-.105 -.069a1 1 0 0 1 -.269 -1.295l.069 -.105l3 -4a1 1 0 0 1 1.137 -.341l.11 .047l3.291 1.645l4.494 -5.391z" strokeWidth="0" fill="currentColor" />
        </svg>
      </div>
      <section id="filters" className="flex flex-col items-center gap-y-4">
        <form className="flex gap-x-4">
          <div className="flex gap-x-2 items-center">
            <label for="mag_type">Magnitude Type</label>
            <select name="mag_type" id="mag_type" className="p-1 rounded-xl">
              {MAG_TYPES.map((mag_type, i) => (
                <option value={mag_type} key={`mag_type_option_${i}`}>{mag_type}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-x-2 items-center">
            <label for="limit_per_page">Limit per page</label>
            <input className="p-1.5 w-20 rounded-xl" type="number" name="limit_per_page" id="limit_per_page" value={limit_per_page} onChange={(e) => handleLimitPerPage(e)} />
          </div>

        </form>
        <div id="pagination" className="flex gap-x-2 items-center">
          <svg width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9.586 4l-6.586 6.586a2 2 0 0 0 0 2.828l6.586 6.586a2 2 0 0 0 2.18 .434l.145 -.068a2 2 0 0 0 1.089 -1.78v-2.586h7a2 2 0 0 0 2 -2v-4l-.005 -.15a2 2 0 0 0 -1.995 -1.85l-7 -.001v-2.585a2 2 0 0 0 -3.414 -1.414z" stroke-width="0" fill="currentColor" />
          </svg>
          {features.map((feature, i) => (
            <button key={`feature_page_${i}`} onClick={setPage(i+1)}>{i + 1}</button>
          ))}
          <svg width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12.089 3.634a2 2 0 0 0 -1.089 1.78l-.001 2.586h-6.999a2 2 0 0 0 -2 2v4l.005 .15a2 2 0 0 0 1.995 1.85l6.999 -.001l.001 2.587a2 2 0 0 0 3.414 1.414l6.586 -6.586a2 2 0 0 0 0 -2.828l-6.586 -6.586a2 2 0 0 0 -2.18 -.434l-.145 .068z" stroke-width="0" fill="currentColor" />
          </svg>
        </div>
      </section>
      <section id="data">
        <div className={`${!loading && 'hidden'}`}><Spinner loading={loading} /></div>
      </section>
    </main>
  );
}
