interface PageComponentProps<T> {
    serverData: PageResponseDTO<T>;
    movePage: (pageParam: PageParam) => void;
}

function PageComponent<T>({ serverData, movePage }: PageComponentProps<T>) {
    const { prev, next, prevPage, nextPage, pageNumList, current } = serverData;

    return (
        <div className="m-6 flex justify-center gap-2">
            {prev && (
                <button type="button" className="w-16 p-2 font-bold text-blue-500" onClick={() => movePage({ page: prevPage })}>
                    Prev
                </button>
            )}

            {pageNumList.map((num) => (
                <button
                    type="button"
                    key={num}
                    className={`w-12 rounded p-2 text-white shadow-md ${current === num ? "bg-gray-500" : "bg-blue-400"}`}
                    onClick={() => movePage({ page: num })}>
                    {num}
                </button>
            ))}

            {next && (
                <button type="button" className="w-16 p-2 font-bold text-blue-500" onClick={() => movePage({ page: nextPage })}>
                    Next
                </button>
            )}
        </div>
    );
}

export default PageComponent;