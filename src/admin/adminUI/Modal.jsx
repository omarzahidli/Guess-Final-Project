export default function Modal({children}) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100 p-3">
            <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-6">
                {children}
            </div>
        </div>
    )
}
