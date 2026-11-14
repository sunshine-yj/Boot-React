function ResultModal({ title, content, callbackFn }: ResultModalProps) {
    const close = () => callbackFn?.();

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-gray-500/70 pt-24" onClick={close}>
            <div
                className="w-[min(600px,90vw)] rounded bg-white px-6 shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="my-6 border-b-4 border-gray-500 text-2xl">{title}</div>
                <div className="border-b-4 border-orange-400 py-4 text-3xl">{content}</div>
                <div className="flex justify-end">
                    <button type="button" className="my-4 rounded bg-blue-500 px-6 py-3 text-lg text-white" onClick={close}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ResultModal;