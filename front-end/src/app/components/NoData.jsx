const NoData = () => {
    return (
        <div className="flex items-center gap-x-4">
        <p className="text-2xl font-bold">No data found</p>
        <svg width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M9 10l.01 0" />
          <path d="M15 10l.01 0" />
          <path d="M9 15l6 0" />
        </svg>
      </div>
    );
}

export default NoData;