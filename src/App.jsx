import InfoSection from './components/Rishikesh2026/InfoSection';
import RishikeshTrip2026RegistrationForm from './components/Rishikesh2026/RsikeshTrip2026RegistrationForm';

function App() {
  return (
    // The background gradient: Deep Slate to Teal to mimic the river at night
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950/20 to-slate-900 py-10 px-4">
      
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: The lowercase, minimalist info */}
          <InfoSection />

          {/* Right Side: The Form */}
          <div className="w-full relative">
            {/* Subtle teal glow behind the form */}
            <div className="absolute inset-0 bg-teal-500 blur-3xl opacity-10 rounded-full -z-10"></div>
            <RishikeshTrip2026RegistrationForm />
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;