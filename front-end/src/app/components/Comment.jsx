const Comment = ({ comment }) => {
    //format time (is in this format : 2024-04-07T12:27:29.105ZE) to a more readable format like 2024-04-07 12:27:29
    const time = new Date(comment.created_at).toLocaleString();
    return (
        <div className="flex bg-slate-600 p-2 rounded-lg gap-x-2 items-center text-sm flex-wrap">
        <time className="bg-slate-500 p-1 rounded-lg text-xs ">{time}</time>
        <p className="">{comment.body}</p>
        </div>
    );
    };

export default Comment;