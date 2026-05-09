import { useState } from "react";
import Toggle from "./components/Toggle";
import SearchBar from "./components/SearchBar";
import ResultsTable from "./components/ResultsTable";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export default function App() {
  const [mode, setMode] = useState("pincode");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setError("");
    setResults([]);

    if (mode === "pincode") {
      if (!/^\d{6}$/.test(query)) {
        setError("Please enter a valid 6-digit pincode.");
        return;
      }
      if (!query.startsWith("56")) {
        setError("Bangalore pincodes start with 56. e.g. 560001");
        return;
      }
    }

    if (mode === "area" && query.trim().length < 2) {
      setError("Please enter at least 2 characters.");
      return;
    }

    fetchResults();
  };

  const fetchResults = async () => {
    setLoading(true);
    try {
      const endpoint =
        mode === "pincode"
          ? `${API_URL}/api/pincode/${query}`
          : `${API_URL}/api/area/${query}`;

      const res = await fetch(endpoint);
      const data = await res.json();

      if (data.success) {
        setResults(data.areas);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Cannot connect to server. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col relative overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(45%_40%_at_50%_0%,rgba(59,130,246,0.03)_0%,transparent_100%)] pointer-events-none" />

      <main className="flex-grow flex flex-col items-center justify-start pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full max-w-lg text-center mb-10 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tighter mb-4">
            Pincode Explorer
          </h1>
          <p className="text-base sm:text-[17px] text-slate-500 leading-relaxed font-medium max-w-[380px] mx-auto tracking-tight">
            Search Bangalore neighborhoods instantly by pincode or locality.
          </p>
        </div>

        <div className="w-full max-w-2xl bg-white rounded-[20px] shadow-premium border border-slate-200/50 overflow-hidden animate-card-entrance">
          <div className="p-6 sm:p-10">
            <div className="mb-8">
              <Toggle
                mode={mode}
                setMode={setMode}
                setQuery={setQuery}
                setError={setError}
                setResults={setResults}
              />
            </div>

            <div className="space-y-6">
              <SearchBar
                mode={mode}
                query={query}
                setQuery={setQuery}
                handleSearch={handleSearch}
                loading={loading}
              />

              <div className="min-h-[16px] flex items-center justify-center">
                {error && (
                  <div className="flex items-center gap-1.5 text-xs text-red-500 font-semibold animate-fade-in">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </div>
                )}
                
                {loading && (
                  <div className="flex items-center gap-2 text-xs text-blue-500 font-bold animate-fade-in">
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></div>
                      <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse [animation-delay:200ms]"></div>
                      <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse [animation-delay:400ms]"></div>
                    </div>
                    Indexing records...
                  </div>
                )}

                {!loading && !error && results.length === 0 && query === "" && (
                  <div className="flex flex-col items-center justify-center animate-fade-in [animation-delay:100ms]">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                      Find locations by pincode or area name
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {results.length > 0 && (
            <div className="border-t border-slate-50 bg-[#FCFCFC] animate-fade-in">
              <ResultsTable results={results} mode={mode} />
            </div>
          )}
        </div>

        <footer className="mt-16 flex flex-col items-center animate-fade-in [animation-delay:500ms]">
          <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">
            <span className="w-6 h-[1px] bg-slate-200" />
            <span>Open Data Bangalore</span>
            <span className="w-6 h-[1px] bg-slate-200" />
          </div>
          <p className="text-[10px] text-slate-400 font-semibold">
            Official records from India Post
          </p>
        </footer>
      </main>
    </div>
  );
}