const DisplayCard = ({
    title,
    credentials,
    className = "bg-white border-gray-100",
    textClass = "text-gray-900",
    symbol,
}) => {
    return (
        <div
            className={`group relative p-6 flex flex-col border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out rounded-3xl w-full max-w-[320px] overflow-hidden ${className}`}
        >
            <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-black/3 rounded-full transform group-hover:scale-[2.5] transition-transform duration-700 ease-out pointer-events-none z-0"></div>

            <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                <div className="flex items-start justify-between">
                    <p className={`text-xs font-bold uppercase tracking-widest mt-1 ${className.includes('bg-white') ? 'text-gray-400' : 'opacity-70'}`}>
                        {title}
                    </p>
                    {symbol && (
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-black/5 shadow-sm backdrop-blur-sm border border-black/5 transition-colors duration-300 ${textClass}`}>
                            <span className="text-sm font-bold">{symbol}</span>
                        </div>
                    )}
                </div>
                <div className="flex flex-col items-start gap-1">
                    <p className={`text-xl font-black tracking-tighter ${textClass}`}>
                        {credentials}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default DisplayCard;