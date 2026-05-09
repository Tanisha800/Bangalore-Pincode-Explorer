export default function SearchBar({ mode, query, setQuery, handleSearch, loading }) {
    return (
        <div className="flex flex-col sm:flex-row justify-center gap-2.5">
            <div className="relative flex-grow max-w-lg group">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    placeholder={
                        mode === "pincode"
                            ? "Enter 6-digit pincode..."
                            : "Search by neighborhood..."
                    }
                    className="w-full h-[46px] pl-10 pr-10 bg-slate-50 border border-slate-200 rounded-xl 
                               text-slate-900 placeholder:text-slate-400 focus:outline-none 
                               focus:ring-[3px] focus:ring-blue-500/5 focus:border-blue-500/30 
                               focus:bg-white transition-all duration-300 text-[13px] font-medium group-hover:border-slate-300"
                />
                <div className="absolute left-[14px] top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-[15px] w-[15px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                {query && (
                    <button
                        onClick={() => setQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-300 hover:text-slate-500 transition-colors rounded-lg hover:bg-slate-100"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-[14px] w-[14px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
            <button
                onClick={handleSearch}
                disabled={loading}
                className="h-[46px] px-7 bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 active:scale-[0.97] text-white text-[13px] font-bold tracking-tight
                           rounded-xl transition-all duration-200 shadow-button flex items-center justify-center gap-2
                           disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-[1px]"
            >
                {loading ? (
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <span>Search</span>
                )}
            </button>
        </div>
    );
}