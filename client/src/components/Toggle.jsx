export default function Toggle({ mode, setMode, setQuery, setError, setResults }) {
    const switchMode = (newMode) => {
        if (mode === newMode) return;
        setMode(newMode);
        setQuery("");
        setError("");
        setResults([]);
    };

    return (
        <div className="flex p-[3px] bg-slate-100/50 rounded-[10px] max-w-[240px] mx-auto border border-slate-200/40 relative">
            <button
                onClick={() => switchMode("pincode")}
                className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] rounded-md transition-all duration-300 relative z-10 ${mode === "pincode"
                        ? "text-blue-600"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
            >
                Pincode
            </button>
            <button
                onClick={() => switchMode("area")}
                className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] rounded-md transition-all duration-300 relative z-10 ${mode === "area"
                        ? "text-blue-600"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
            >
                Locality
            </button>
            
            <div 
                className={`absolute top-[3px] bottom-[3px] w-[calc(50%-3px)] bg-white rounded-md shadow-sm border border-slate-200/50 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                    mode === "pincode" ? "translate-x-0" : "translate-x-full"
                }`}
            />
        </div>
    );
}