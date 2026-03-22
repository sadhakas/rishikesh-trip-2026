export default function InfoSection() {
  return (
    <div className="text-white space-y-8 md:pr-8 font-sans">
      {/* Header Area */}
      <div className="border-b border-slate-600 pb-6">
        <p className="text-teal-400 font-medium tracking-widest text-xs mb-3 lowercase">sādhakas retreat</p>
        <h1 className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tight uppercase">
          Ganga <br /> Echoes
        </h1>
        <p className="text-slate-300 text-lg tracking-wide uppercase">Rishikesh 2026</p>
      </div>

      {/* The Poetry/Copy */}
      <div className="space-y-4 text-slate-200 text-base md:text-lg leading-relaxed lowercase">
        <p>exams are done.</p>
        <p>a small window opens.</p>
        <p>
          we’re heading to the yoga capital.<br/>
          towards the ganga.<br/>
          a few days to step away and reset.
        </p>
      </div>

      {/* Details Grid */}
      <div className="bg-slate-800/40 rounded-xl p-6 border border-slate-700 shadow-lg lowercase">
        <ul className="text-slate-100 space-y-3">
          <li className="flex items-center"><span className="mr-3 text-teal-400">📍</span> rishikesh • ram taposthali • vashishta gufa</li>
          <li className="flex items-center"><span className="mr-3 text-teal-400">🌊</span> + river rafting</li>
          <li className="flex items-center"><span className="mr-3 text-teal-400">🗓️</span> 3–5 april</li>
          <li className="flex items-center"><span className="mr-3 text-teal-400">🚌</span> from pilani to pilani</li>
          <li className="flex items-center text-teal-300 font-bold mt-2"><span className="mr-3">₹</span> 3500 (all included)</li>
        </ul>
      </div>

      <div className="text-slate-700 font-semibold italic lowercase text-base">
        not just a trip.<br/>
        a pause to return clearer.
      </div>
      
      <div className="text-slate-700 font-semibold italic lowercase text-base">
        — sādhakas
      </div>
    </div>
  );
}