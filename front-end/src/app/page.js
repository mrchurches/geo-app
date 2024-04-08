'use client';

import { useEffect, useState } from "react";
import Spinner from "./components/Spinner";
import Card from "./components/Card";
import NoData from "./components/NoData";
import Geo from "./components/Geo";
import Arrow from "./components/Arrow";
import DoubleArrow from "./components/DoubleArrow";
import { data } from "autoprefixer";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [features, setFeatures] = useState([]);
  const [limit_per_page, setLimitPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [mag_type, setMagType] = useState({
    md: true,
    ml: true,
    ms: true,
    mw: true,
    me: true,
    mi: true,
    mb: true,
    mlg: true
  });
  const [rangeToPages, setRangeToPages] = useState([1]);
  const MAG_TYPES = ['md', 'ml', 'ms', 'mw', 'me', 'mi', 'mb', 'mlg']
  const URL_API = "http://localhost:3000";

  useEffect(() => {
    get_data()

  }, []);

  useEffect(() => {

  }, [data])
  useEffect(() => {
    get_data()
  }, [page, limit_per_page, mag_type]);

  useEffect(() => {
    setPage(1)
  }, [limit_per_page, mag_type])

  useEffect(() => {
    setPagination()
  }, [page, features])

  const setPagination = () => {
    if (features.pagination) {
      if (features.pagination.total <= 5) {
        setRangeToPages(Array.from({ length: features.pagination.total }, (_, i) => i + 1))
      } else {
        if (page <= 5) {
          setRangeToPages(Array.from({ length: 6 }, (_, i) => i + 1))
        } else if (page > features.pagination.total - 3) {
          setRangeToPages(Array.from({ length: 6 }, (_, i) => i + 1).map((p, i) => features.pagination.total - 5 + i))
        } else {
          setRangeToPages(Array.from({ length: 6 }, (_, i) => i + 1).map((p, i) => page - 3 + i))
        }
      }
    }
  }

  const get_data = async () => {
    let mag_types_to_send = Object.keys(mag_type).filter((type) => mag_type[type])
    fetch(`${URL_API}/features?per_page=${limit_per_page}&page=${page}${'&mag_type=' + mag_types_to_send}`)
      .then((response) => response.json())
      .then((data) => {
        setFeatures(data);
        setLoading(false);
      });
  }

  const handleLimitPerPage = (e) => {
    if (e.target.value < 1 || e.target.value > 1000) return;
    setLimitPerPage(e.target.value);
  }
  return (
    <main className="flex flex-col items-center max-h-screen relative gap-y-1">
      <div className="flex items-center gap-x-2">
        <h1 className="text-4xl font-bold">Geo-App</h1>
        <Geo />
        <button onClick={() => { document.querySelector('#modal').classList.remove('hidden') }} className="bg-slate-700 rounded-full p-1 w-5 h-5 items-center flex justify-center">?</button>
      </div>
      <div className="flex flex-col lg:flex-row overflow-y-scroll">
        <div className="flex flex-col gap-y-4 justify-center">
          <section id="filters" className="flex flex-col items-center gap-y-4">
            <form className="flex lg:flex-col lg:gap-y-4 lg:items-center gap-x-4 text-sm">
              <div className="flex flex-col gap-x-2 items-center">
                <label >Magnitude Type</label>
                <div className="flex w-48 sm:w-60 flex-wrap justify-center lg:gap-x-4 gap-y-1">
                  {MAG_TYPES.map((type, i) => (
                    <div key={`mag_type_option_${i}`} className="flex items-center gap-x-1">
                      <input type="checkbox" name="mag_type" id={`mag_type_${i}`} checked={mag_type[type]}
                        onChange={(e) => setMagType({ ...mag_type, [type]: !mag_type[type] })} />
                      <label >{type}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-x-2 items-center gap-y-1 text-xs sm:text-sm">
                <label>Limit p/page</label>
                <input className="px-2 py-0.5 w-20 rounded-xl" type="number" name="limit_per_page" id="limit_per_page" value={limit_per_page} onChange={(e) => handleLimitPerPage(e)} />
              </div>
            </form>
          </section>
          <section id="pagination" className="flex gap-x-2 items-center justify-center w-full">
            <DoubleArrow size={features?.pagination?.total} setPage={setPage} />
            <Arrow setPage={setPage} page={page} size={features?.pagination?.total} />
            <div className="flex max-w-[20rem]">
              {rangeToPages.map((p, i) => (
                <button key={`page_${i}`} className={`p-2 rounded-full ${p === page && 'bg-slate-300 text-slate-800'}`} onClick={() => setPage(p)}>{p}</button>
              ))}
            </div>
            <Arrow rotate setPage={setPage} page={page} size={features?.pagination?.total} />
            <DoubleArrow size={features?.pagination?.total} setPage={setPage} rotate />
          </section>
        </div>
        <section id="data" className="flex  overflow-y-auto overflow-x-hidden p-2">
          <div className={`${!loading && 'hidden'}`}><Spinner loading={loading} /></div>
          {features.data &&
            features.data.length ?
            <div className="flex flex-col gap-y-4">
              {features.data.map(({ id, attributes, links }, i) => (
                <Card key={`card_${i}`} attributes={attributes} links={links} id={id} />
              ))}
            </div>
            :
            <NoData />
          }
        </section>
      </div>
      <section id="modal" className="absolute flex justify-center">
        <div className="flex flex-col bg-slate-800 p-6 text-lg rounded-xl gap-x-4 m-4 w-1/2"
        >
          <div className="flex justify-between pb-4">
            <h2>About the app</h2>
            <button onClick={() => { document.querySelector('#modal').classList.add('hidden') }} className="self-end">X</button>
          </div>
          <p className="">Search for information about a specific earthquake in the last 30 days, adding read about comments of the community and add your own comment.</p>
        </div>
      </section>
    </main>
  );
}
