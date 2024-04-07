import Link from 'next/link'
import PointMap from './PointMap';

const Card = ({ attributes, links, id }) => {
    return (
        <article className="w-80 sm:w-[33rem] rounded-xl hover:bg-slate-800 p-3 transition">
            <h3 className="text-2xl font-bold">{attributes.title}</h3>
            <p className="text-lg flex items-center gap-x-2">
                <PointMap />
                {attributes.place}
            </p>
            <p className="text-lg">{attributes.time}</p>
            <p className="text-lg">Magnitude: {attributes.magnitude} | <span>{attributes.mag_type}</span></p>
            <div className="truncate my-2">
                <a href={links.external_url} target="_blank" rel="noreferrer" className="text-orange-400 pointer">{'(external info) '}{links.external_url}</a>
            </div>
            <Link href={`/details/${id}`}><button className='bg-slate-600 px-2 py-1 rounded-lg mt-2 text-sm hover:bg-slate-500 transition'>See details</button></Link>
        </article>
    );
};

export default Card;