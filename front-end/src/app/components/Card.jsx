const Card = ({ attributes, links }) => {
    return (
        <article className="w-[33rem] rounded-xl hover:bg-slate-800 p-3">
            <h3 className="text-2xl font-bold">{attributes.title}</h3>
            <p className="text-lg flex items-center gap-x-2">
                <svg width="15" height="15" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" strokeWidth="0" fill="currentColor" />
                </svg>
                {attributes.place}
            </p>
            <p className="text-lg">{attributes.time}</p>
            <p className="text-lg">Magnitude: {attributes.magnitude} | <span>{attributes.mag_type}</span></p>
            <div className="truncate">
                <a href={links.external_url} target="_blank" rel="noreferrer" className="text-orange-400">{links.external_url}</a>
            </div>
        </article>
    );
};

export default Card;