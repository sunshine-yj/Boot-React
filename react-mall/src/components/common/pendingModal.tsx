function PendingModal() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/70">
            <div className="flex h-1/4 w-[min(600px,90vw)] items-center justify-center rounded-3xl bg-white">
                <div className="text-4xl font-extrabold text-orange-400">Pending.....</div>
            </div>
        </div>
    );
}

export default PendingModal;