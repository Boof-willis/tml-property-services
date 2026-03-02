import { useState, useEffect } from 'react';

export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    zip: '',
    details: '',
    name: '',
    phone: ''
  });
  const [meta, setMeta] = useState({});
  const [status, setStatus] = useState('idle');

  // Capture UTMs and ockno_id on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tracking = {
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_term: params.get('utm_term') || '',
      utm_content: params.get('utm_content') || '',
      ockno_id: params.get('ockno_id') || ''
    };
    setMeta(tracking);
  }, []);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSelectService = (service) => {
    setFormData(prev => ({ ...prev, service }));
    nextStep();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // Final payload includes all form fields + UTMs/ockno_id natively
    const payload = { ...formData, ...meta };

    try {
      // Simulate webhook submission (e.g. to GoHighLevel)
      // await fetch('https://services.leadconnectorhq.com/hooks/...', {
      //   method: 'POST',
      //   body: JSON.stringify(payload),
      //   headers: { 'Content-Type': 'application/json' }
      // });
      
      await new Promise(resolve => setTimeout(resolve, 1500)); // Fake network request
      
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-white text-dark p-8 md:p-12 border border-primary/10 text-center flex flex-col items-center">
        <svg className="w-16 h-16 text-[#7c847c] mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h4 className="text-3xl font-heading text-primary mb-4">Request Received</h4>
        <p className="text-dark/70 text-lg">We'll be in touch shortly to schedule your free estimate.</p>
      </div>
    );
  }

  return (
    <div className="bg-white text-dark p-8 md:p-10 shadow-xl border border-primary/10">
      
      {/* Progress Bar */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map(i => (
          <div key={i} className={`h-1 flex-1 transition-colors duration-300 ${step >= i ? 'bg-accent' : 'bg-light'}`} />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="min-h-[280px]">
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h3 className="text-2xl font-heading text-primary mb-6">What type of cleaning do you need?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Commercial Office', 'Residential Home', 'Move-In / Move-Out', 'Post-Construction'].map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleSelectService(type)}
                  className={`p-5 text-left border transition-all duration-300 hover:border-primary group ${formData.service === type ? 'border-primary bg-background' : 'border-primary/10 bg-white'}`}
                >
                  <div className="font-medium text-primary mb-1 group-hover:text-dark transition-colors">{type}</div>
                  <div className="text-xs text-dark/60 leading-relaxed">
                    {type === 'Commercial Office' && 'Routine or deep cleaning for businesses.'}
                    {type === 'Residential Home' && 'Detailed cleaning for private residences.'}
                    {type === 'Move-In / Move-Out' && 'Resetting a space for the next occupant.'}
                    {type === 'Post-Construction' && 'Removing dust and debris after a build.'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h3 className="text-2xl font-heading text-primary mb-6">Tell us about the space.</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-dark/80 mb-2 uppercase tracking-widest text-xs">Zip Code</label>
                <input 
                  type="text" 
                  value={formData.zip}
                  onChange={e => setFormData(prev => ({...prev, zip: e.target.value}))}
                  required 
                  className="w-full px-4 py-4 bg-light border border-primary/10 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-shadow" 
                  placeholder="84601" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark/80 mb-2 uppercase tracking-widest text-xs">Any specific details? (Optional)</label>
                <textarea 
                  value={formData.details}
                  onChange={e => setFormData(prev => ({...prev, details: e.target.value}))}
                  rows="3"
                  className="w-full px-4 py-3 bg-light border border-primary/10 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-shadow resize-none" 
                  placeholder="Approximate square footage, frequency needed, etc." 
                />
              </div>

              <div className="flex gap-4 pt-2">
                <button type="button" onClick={prevStep} className="px-6 py-4 border border-dark text-dark font-medium text-sm tracking-widest uppercase hover:bg-light transition-colors">
                  Back
                </button>
                <button type="button" onClick={() => formData.zip && nextStep()} className="flex-1 btn-primary text-sm w-full" disabled={!formData.zip}>
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h3 className="text-2xl font-heading text-primary mb-6">Where should we send your estimate?</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-dark/80 mb-2 uppercase tracking-widest text-xs">Full Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData(prev => ({...prev, name: e.target.value}))}
                  required 
                  className="w-full px-4 py-4 bg-light border border-primary/10 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-shadow" 
                  placeholder="Jane Doe" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark/80 mb-2 uppercase tracking-widest text-xs">Phone Number</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={e => setFormData(prev => ({...prev, phone: e.target.value}))}
                  required 
                  className="w-full px-4 py-4 bg-light border border-primary/10 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-shadow" 
                  placeholder="(801) 555-0123" 
                />
              </div>

              <div className="flex gap-4 pt-2">
                <button type="button" onClick={prevStep} className="px-6 py-4 border border-dark text-dark font-medium text-sm tracking-widest uppercase hover:bg-light transition-colors">
                  Back
                </button>
                <button type="submit" disabled={status === 'loading'} className="flex-1 btn-accent py-4 text-sm disabled:opacity-70 disabled:cursor-not-allowed">
                  {status === 'loading' ? 'Sending...' : 'Get My Estimate'}
                </button>
              </div>
              
              {status === 'error' && (
                <p className="text-red-500 text-sm mt-2 text-center">There was an issue submitting your request. Please try again or call us.</p>
              )}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}