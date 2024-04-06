'use client';

import { useEffect, useState } from "react";
import Spinner from "./components/Spinner";
import Card from "./components/Card";
import NoData from "./components/NoData";
import Geo from "./components/Geo";
import Arrow from "./components/Arrow";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [features, setFeatures] = useState([]);
  const [limit_per_page, setLimitPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [mag_type, setMagType] = useState('md');
  const MAG_TYPES = ['md', 'ml', 'ms', 'mw', 'me', 'mi', 'mb', 'mlg']
  const URL_API = "http://localhost:3000";

  useEffect(() => {
    fetch(`${URL_API}/features?per_page=${limit_per_page}&page=${page}&mag_type=${mag_type}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setFeatures(data);
        setLoading(false);
      });
  }, [page, limit_per_page, mag_type]);

  useEffect(()=>{
    setPage(1)
  },[limit_per_page,mag_type])



  const handleLimitPerPage = (e) => {
    if (e.target.value < 1 || e.target.value > 1000) return;
    setLimitPerPage(e.target.value);
  }
  return (
    <main className="flex flex-col items-center pt-4 max-h-screen">
      <div className="flex items-center gap-x-2">
        <h1 className="text-4xl font-bold">Geo-App</h1>
        <Geo />
      </div>
      <section id="filters" className="flex flex-col items-center gap-y-4">
        <form className="flex gap-x-4 text-sm">
          <div className="flex gap-x-2 items-center">
            <label >Magnitude Type</label>
            <select name="mag_type" id="mag_type" className="p-0.5 rounded-xl" value={mag_type} onChange={(e) => setMagType(e.target.value)}>
              {MAG_TYPES.map((mag_type, i) => (
                <option value={mag_type} key={`mag_type_option_${i}`}>{mag_type}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-x-2 items-center">
            <label >Limit per page</label>
            <input className="px-2 py-0.5 w-20 rounded-xl" type="number" name="limit_per_page" id="limit_per_page" value={limit_per_page} onChange={(e) => handleLimitPerPage(e)} />
          </div>
        </form>
        <div id="pagination" className="flex gap-x-2 items-center">
          <Arrow setPage={setPage} page={page} size={features?.pagination?.total}/>
          {features?.pagination?.total && Array.from({ length: features?.pagination.total }, (_, i) => i + 1).map((p, i) => (
            <button key={`page_${i}`} className={`p-2 rounded-full ${p === page && 'bg-slate-300 text-slate-800'}`} onClick={() => setPage(p)}>{p}</button>
          ))}
          <Arrow rotate setPage={setPage} page={page} size={features?.pagination?.total}/>
        </div>
      </section>
      <section id="data" className="flex flex-grow  overflow-y-auto overflow-x-hidden">
        <div className={`${!loading && 'hidden'}`}><Spinner loading={loading} /></div>
        {features.data &&
          features.data.length ?
          <div className="flex flex-col gap-y-8">
            {features.data.map(({attributes, links}, i) => (
              <Card key={`card_${i}`} attributes={attributes} links={links} />
              ))}
          </div>
          :
              <NoData />
        }
      </section>
    </main>
  );
}
