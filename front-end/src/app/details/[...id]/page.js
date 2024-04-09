'use client';
import Comment from "@/app/components/Comment";
import Geo from "@/app/components/Geo";
import PointMap from "@/app/components/PointMap";
import Spinner from "@/app/components/Spinner";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from 'next/link'
const DB_URL = process.env.NEXT_PUBLIC_DB_URL
export default function Details() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [textArea, setTextArea] = useState('');

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        fetch(`${DB_URL}/features/${id}`)
            .then(response => response.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => console.error(error));
    }

    const handleClick = (e) => {
        e.preventDefault();
        fetch(`${DB_URL}/features/${id}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ body: textArea })
        })
            .then(response => response.json())
            .then(data => {
                getData();
                setTextArea('');
            })
            .catch(error => console.error(error));
    }



    return (
        <section className="flex flex-col items-center">
            <div className="flex items-center gap-x-2">
                <h1 className="text-4xl font-bold">Geo-App</h1>
                <Geo />
            </div>
            {loading ?
                <Spinner />
                : (
                    <div id="content" className="flex flex-col sm:flex-row sm:gap-x-2">
                        <div id={`feature_data${id}`} className="flex flex-col gap-y-2 bg-slate-600 p-4 rounded-xl w-4/5 sm:w-auto self-center sm:h-content">
                            <h2 className="text-xl">{data.title}</h2>
                            <h4 className="flex items-center"><PointMap />{data.place}</h4>
                            <div className="flex gap-x-4 items-center">
                                <h4 className="flex bg-gray-500 rounded-lg w-fit h-fit p-2">{data.time}</h4>
                                <div className="flex flex-col bg-gray-500 rounded-lg w-fit p-2">
                                    <h4 className="text-xs">Magnitude</h4>
                                    <div className="flex gap-x-2 justify-center">
                                        <h4>{data.mag_type}</h4>
                                        <h4>{data.magnitude}</h4>
                                    </div>
                                </div>
                            </div>
                            <h4>{data.tsunami}</h4>
                            <a href={data.external_url} target="_blank" rel="noreferrer" className="text-yellow-500 pointer">External information</a>

                        </div>
                        <div id={`feature_comments${id}`} className="flex flex-col bg-slate-700 w-9/12  p-4 sm:my-2 sm:w-[30rem] rounded-b-xl rounded-lg gap-y-2 justify-between self-center">
                            {data.comments.length > 0 ? data.comments.map(comment => (
                                <Comment key={comment.id} comment={comment} />
                            )) :
                                <div className="flex justify-center bg-slate-800 p-2 rounded-lg">
                                    <p className="text-slate-300">No comments</p>
                                </div>}
                            <div className="flex flex-col gap-y-2">
                                <textarea name="comment" id="comment" placeholder="Write a comment here.." className="rounded-lg bg-slate-500 text-slate-300 p-2" value={textArea} onChange={({ target }) => setTextArea(target.value)}></textarea>
                                <button className="flex self-end bg-slate-800 px-4 py-1 text-sm rounded-lg" onClick={(e) => handleClick(e)}>Submit</button>
                            </div>
                        </div>
                    </div>)
            }
            <Link href="/"><button className="mt-4 flex self-end bg-slate-800 px-4 py-1 text-sm rounded-lg">Back</button></Link>
        </section>
    )
}