export const Card = ({ title, credentials, className, textClass, symbol }) => {
    return (
        <div className={`p-3 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all duration-200 ${className}`}>
            <p className="text-[8px] sm:text-[12px] font-bold capitalize tracking-widest text-slate-500 mb-1">{title}</p>
            <p className={`text-base sm:text-lg lg:text-xl font-bold  ${textClass || 'text-slate-900'}`}>
                {symbol}{credentials}
            </p>
        </div>
    )
}