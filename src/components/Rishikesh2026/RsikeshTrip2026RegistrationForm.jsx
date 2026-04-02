import { useState } from 'react';
import qrCode from '../../assets/qr-code.png'; 

// --- THE KILL SWITCH ---
// Change this to `false` to instantly stop accepting new registrations and payments.
const IS_FORM_OPEN = false;

export default function RsikeshTrip2026RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    email: '',
    phone: '',
    studentId: '',
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Fixed trip details
  const amount = "3500";
  const upiId = "yogya@superyes"; 
  const upiName = "Sadhakas";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 2097152) { // 2MB limit
      setError('file is too large. please upload an image under 2mb.');
      setFile(null);
    } else {
      setError('');
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('please upload your payment screenshot.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result.split(',')[1];
        
        const payload = {
          name: formData.name,
          college: formData.college,
          email: formData.email,
          phone: formData.phone,
          studentId: formData.studentId,
          fileName: file.name,
          mimeType: file.type,
          fileData: base64String
        };

        const GAS_URL = import.meta.env.VITE_GAS_URL;
        
        const response = await fetch(GAS_URL, {
          method: 'POST',
          body: JSON.stringify(payload),
        });

        const result = await response.json();
        
        if (result.status === 'success') {
          setSuccess(true);
        } else {
          setError('something went wrong. please try again.');
        }
        setLoading(false);
      };
      
      reader.readAsDataURL(file);
    } catch (err) {
      setError('failed to submit. please check your connection.');
      setLoading(false);
    }
  };

  // 1. CLOSED STATE UI (Triggers if IS_FORM_OPEN is false)
  if (!IS_FORM_OPEN) {
    return (
      <div className="bg-slate-800/60 backdrop-blur-xl p-10 rounded-3xl border border-slate-600/50 text-center shadow-2xl transition-all">
        <div className="text-teal-400/50 mb-6 flex justify-center">
          <svg className="w-16 h-16 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
        </div>
        <h2 className="text-3xl font-black text-white mb-3 tracking-tight lowercase">registrations closed.</h2>
        <p className="text-slate-200 text-lg lowercase mb-8 leading-relaxed">
          we are officially full for the rishikesh trip.<br/>thank you for the overwhelming response!
        </p>
        <p className="text-teal-300 font-medium lowercase tracking-wide">stay tuned for future journeys.</p>
      </div>
    );
  }

  // 2. SUCCESS STATE UI
  if (success) {
    return (
      <div className="bg-slate-800/60 backdrop-blur-xl p-10 rounded-3xl border border-slate-600/50 text-center shadow-2xl transition-all">
        <div className="text-teal-400 text-6xl mb-6 drop-shadow-lg">🌊</div>
        <h2 className="text-3xl font-black text-white mb-3 tracking-tight lowercase">you're in.</h2>
        <p className="text-slate-200 text-lg lowercase mb-8 leading-relaxed">
          we received your registration and payment screenshot.<br/>check your email for the confirmation.
        </p>
        <p className="text-teal-300 font-medium lowercase tracking-wide">see you by the river.</p>
      </div>
    );
  }

  // 3. DEFAULT FORM UI
  return (
    <div className="bg-slate-800/60 backdrop-blur-xl p-6 md:p-10 rounded-3xl border border-slate-600/50 shadow-2xl w-full">
      <h2 className="text-3xl font-bold text-white mb-8 lowercase tracking-wide flex items-center gap-3">
        reserve your spot <span className="w-12 h-[2px] bg-teal-500 rounded-full inline-block"></span>
      </h2>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-5 py-4 rounded-xl mb-8 text-sm lowercase shadow-inner">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Personal Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-teal-100/80 text-sm mb-2 lowercase font-medium ml-1">full name</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange}
              className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-teal-400 focus:bg-slate-900 focus:ring-1 focus:ring-teal-400 transition-all lowercase placeholder:text-slate-500" placeholder="your name"/>
          </div>
          <div className="flex flex-col">
            <label className="text-teal-100/80 text-sm mb-2 lowercase font-medium ml-1">phone number</label>
            <input type="tel" name="phone" required value={formData.phone} onChange={handleChange}
              className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-teal-400 focus:bg-slate-900 focus:ring-1 focus:ring-teal-400 transition-all lowercase placeholder:text-slate-500" placeholder="whatsapp number"/>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-teal-100/80 text-sm mb-2 lowercase font-medium ml-1">email address</label>
          <input type="email" name="email" required value={formData.email} onChange={handleChange}
            className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-teal-400 focus:bg-slate-900 focus:ring-1 focus:ring-teal-400 transition-all lowercase placeholder:text-slate-500" placeholder="for trip updates"/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-teal-100/80 text-sm mb-2 lowercase font-medium ml-1">college</label>
            <input type="text" name="college" required value={formData.college} onChange={handleChange}
              className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-teal-400 focus:bg-slate-900 focus:ring-1 focus:ring-teal-400 transition-all lowercase placeholder:text-slate-500" placeholder="bits pilani, etc."/>
          </div>
          <div className="flex flex-col">
            <label className="text-teal-100/80 text-sm mb-2 lowercase font-medium ml-1">student id</label>
            <input type="text" name="studentId" required value={formData.studentId} onChange={handleChange}
              className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-teal-400 focus:bg-slate-900 focus:ring-1 focus:ring-teal-400 transition-all lowercase placeholder:text-slate-500" placeholder="id number"/>
          </div>
        </div>

        {/* Premium Payment Section */}
        <div className="mt-10 pt-8 border-t border-slate-700/50">
          <label className="block text-teal-400 text-lg mb-6 lowercase font-semibold tracking-wide text-center">complete payment</label>
          
          <div className="flex flex-col items-center bg-gradient-to-b from-slate-900/80 to-slate-900/40 p-8 rounded-2xl border border-slate-700/50 mb-8 shadow-inner">
            
            {/* Embedded QR Container */}
            <img src={qrCode} alt="UPI QR Code" className="w-48 h-48 mb-5 mix-blend-plus-lighter transform hover:scale-105 transition duration-300" />

            <p className="text-teal-200 text-sm lowercase font-medium tracking-wider mb-6">scan to pay exactly ₹{amount}</p>
            
            {/* Mobile UPI Links - Styled like pills */}
            <div className="flex flex-wrap justify-center gap-3 w-full sm:hidden">
              <a href={`gpay://upi/pay?pa=${upiId}&pn=${upiName}&am=${amount}&cu=INR&tn=Rishikesh Trip`}
                className="flex-1 bg-slate-800 border border-slate-600 text-teal-100 text-center py-2.5 rounded-full text-sm lowercase font-medium hover:bg-slate-700 transition">gpay</a>
              <a href={`phonepe://pay?pa=${upiId}&pn=${upiName}&am=${amount}&cu=INR&tn=Rishikesh Trip`}
                className="flex-1 bg-slate-800 border border-slate-600 text-teal-100 text-center py-2.5 rounded-full text-sm lowercase font-medium hover:bg-slate-700 transition">phonepe</a>
              <a href={`paytmmp://pay?pa=${upiId}&pn=${upiName}&am=${amount}&cu=INR&tn=Rishikesh Trip`}
                className="flex-1 bg-slate-800 border border-slate-600 text-teal-100 text-center py-2.5 rounded-full text-sm lowercase font-medium hover:bg-slate-700 transition">paytm</a>
            </div>
          </div>
          
          {/* File Upload Styling */}
          <div className="flex flex-col">
            <label className="text-teal-100/80 text-sm mb-3 lowercase font-medium ml-1">upload payment screenshot</label>
            <div className="bg-slate-900/30 border border-dashed border-slate-600 rounded-xl p-2 transition-all hover:border-teal-500/50 focus-within:border-teal-500">
              <input type="file" accept="image/*" onChange={handleFileChange} required
                className="w-full text-sm text-slate-300 file:mr-4 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-teal-900/50 file:text-teal-300 hover:file:bg-teal-800/80 transition-all file:cursor-pointer cursor-pointer lowercase"/>
            </div>
            <p className="text-slate-400 text-xs mt-2 ml-1 lowercase tracking-wide">max size: 2mb. jpg or png.</p>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={loading}
          className={`w-full py-4 mt-8 rounded-xl font-bold lowercase transition-all tracking-wider text-lg ${
            loading 
              ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-teal-600 to-teal-500 text-white hover:from-teal-500 hover:to-teal-400 shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] transform hover:-translate-y-0.5'
          }`}>
          {loading ? 'processing...' : 'confirm registration'}
        </button>
      </form>
    </div>
  );
}