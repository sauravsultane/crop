import { useState } from 'react';
import { Leaf, Droplets, Thermometer, FlaskConical, CloudRain, Sun, Sprout, ArrowRight } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({
    N: '',
    P: '',
    K: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateRecommendation = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Convert to numbers
      const payload = {
        N: Number(formData.N),
        P: Number(formData.P),
        K: Number(formData.K),
        temperature: Number(formData.temperature),
        humidity: Number(formData.humidity),
        ph: Number(formData.ph),
        rainfall: Number(formData.rainfall)
      };

      const res = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) throw new Error('Failed to get prediction');
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Something went wrong. Is the Flask API running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 -left-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-10 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="max-w-4xl w-full z-10 glass-panel rounded-3xl shadow-xl overflow-hidden border border-white/40 flex flex-col md:flex-row">
        
        {/* Left Side: Header & Info */}
        <div className="md:w-5/12 bg-gradient-to-br from-emerald-500 to-teal-700 p-8 text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <Leaf className="w-8 h-8 text-emerald-100" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">AgriSense AI</h1>
            </div>
            <p className="text-emerald-50 text-lg leading-relaxed mb-6 font-light">
              Enter your soil metrics and environmental data to receive intelligent crop recommendations powered by our advanced predictive model.
            </p>
          </div>
          
          <div className="hidden md:block">
            <div className="p-5 bg-black/10 rounded-2xl border border-white/10 backdrop-blur-md">
              <Sprout className="w-6 h-6 mb-3 text-emerald-200" />
              <h3 className="font-semibold mb-1 text-emerald-50">Precision Farming</h3>
              <p className="text-sm text-emerald-100/80">Optimize yield by planting the right crop for your specific conditions.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-7/12 bg-white/60 p-8 md:p-10 relative">
          {!result ? (
            <form onSubmit={calculateRecommendation} className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Environmental Data</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputField icon={<span className="font-bold text-gray-500 px-1">N</span>} label="Nitrogen Ratio" name="N" value={formData.N} onChange={handleChange} placeholder="e.g. 90" />
                <InputField icon={<span className="font-bold text-gray-500 px-1">P</span>} label="Phosphorus Ratio" name="P" value={formData.P} onChange={handleChange} placeholder="e.g. 42" />
                <InputField icon={<span className="font-bold text-gray-500 px-1">K</span>} label="Potassium Ratio" name="K" value={formData.K} onChange={handleChange} placeholder="e.g. 43" />
                <InputField icon={<FlaskConical className="w-5 h-5 text-gray-400" />} label="Soil pH" name="ph" value={formData.ph} onChange={handleChange} placeholder="e.g. 6.5" step="0.1" />
                <InputField icon={<Thermometer className="w-5 h-5 text-gray-400" />} label="Temperature (°C)" name="temperature" value={formData.temperature} onChange={handleChange} placeholder="e.g. 24" step="0.1" />
                <InputField icon={<Droplets className="w-5 h-5 text-gray-400" />} label="Humidity (%)" name="humidity" value={formData.humidity} onChange={handleChange} placeholder="e.g. 82" step="0.1" />
                <InputField icon={<CloudRain className="w-5 h-5 text-gray-400" />} label="Rainfall (mm)" name="rainfall" value={formData.rainfall} onChange={handleChange} placeholder="e.g. 202.9" step="0.1" className="sm:col-span-2" />
              </div>

              {error && (
                <div className="text-red-500 text-sm p-3 bg-red-50 border border-red-200 rounded-xl">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 py-4 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-medium text-lg transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Analyze Conditions <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="h-full flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center mb-8">
                <p className="text-sm font-medium text-emerald-600 uppercase tracking-wider mb-2">Recommended Crop</p>
                <h2 className="text-5xl font-extrabold capitalize text-gray-900 tracking-tight">
                  {result.recommended_crop}
                </h2>
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-sm font-semibold">
                  <Sun className="w-4 h-4" /> {result.confidence}% Match
                </div>
              </div>

              {result.top_3 && result.top_3.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-gray-500 mb-3 px-1">Alternative Options</h3>
                  <div className="space-y-3">
                    {result.top_3.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3.5 rounded-2xl bg-white/60 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <span className="font-medium text-gray-800 capitalize flex items-center gap-2">
                          <div className="w-6 text-center text-gray-400 text-sm font-bold">{idx + 1}</div>
                          {item.crop}
                        </span>
                        <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                          {item.confidence}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => setResult(null)}
                className="w-full py-4 rounded-xl text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50 font-medium transition-all shadow-sm border border-gray-200"
              >
                Analyze Another Field
              </button>
            </div>
          )}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}} />
    </div>
  );
}

function InputField({ label, name, value, onChange, placeholder, icon, step = "1", className = "" }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1.5 px-0.5">{label}</label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors group-focus-within:text-emerald-500">
          {icon}
        </div>
        <input
          required
          type="number"
          step={step}
          name={name}
          value={value}
          onChange={onChange}
          className="block w-full pl-11 pr-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-gray-900 placeholder-gray-400 shadow-sm hover:border-gray-300"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

export default App;
