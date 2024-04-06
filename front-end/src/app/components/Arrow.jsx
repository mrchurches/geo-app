const Arrow = ({ rotate, page, setPage, size }) => {
    const handleClick = () => {
        if (!rotate) {
            if (page === 1) return;
            setPage(page - 1);
        }else{
            if (page === size) return;
            setPage(page + 1);
        }
    }
    return (
        <div className={rotate && 'rotate-180'} onClick={() => handleClick()}>
            <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9.586 4l-6.586 6.586a2 2 0 0 0 0 2.828l6.586 6.586a2 2 0 0 0 2.18 .434l.145 -.068a2 2 0 0 0 1.089 -1.78v-2.586h7a2 2 0 0 0 2 -2v-4l-.005 -.15a2 2 0 0 0 -1.995 -1.85l-7 -.001v-2.585a2 2 0 0 0 -3.414 -1.414z" strokeWidth="0" fill="currentColor" />
            </svg>
        </div>
    )
}

export default Arrow;