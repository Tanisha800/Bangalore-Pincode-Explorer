export default function ResultsTable({ results, mode }) {
    return (
        <div className="p-4 sm:p-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
                    Found {results.length} locations
                </span>
                <div className="flex-grow h-[1px] bg-slate-100" />
            </div>

            <div className="grid grid-cols-1 gap-3">
                {results.map((r, i) => (
                    <div
                        key={i}
                        className="group relative flex items-center justify-between p-4 bg-white border border-slate-200/50 rounded-2xl transition-all duration-300 hover:shadow-premium hover:border-blue-500/10 hover:-translate-y-0.5"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-[13px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-none mb-1.5">
                                    {r.Name}
                                </h4>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{r.Division}</span>
                                    <span className="w-1 h-1 bg-slate-200 rounded-full" />
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{r.BranchType}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <div className="text-[13px] font-mono font-bold text-slate-900 tracking-tight mb-1">
                                    {r.Pincode || r.PINCode}
                                </div>
                                <div className={`text-[9px] font-bold uppercase tracking-[0.1em] flex items-center justify-end gap-1 ${
                                    r.DeliveryStatus === "Delivery" ? "text-emerald-500" : "text-amber-500"
                                }`}>
                                    <span className={`w-1 h-1 rounded-full ${
                                        r.DeliveryStatus === "Delivery" ? "bg-emerald-500" : "bg-amber-500"
                                    }`} />
                                    {r.DeliveryStatus}
                                </div>
                            </div>
                            <div className="p-1 text-slate-100 group-hover:text-slate-300 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}