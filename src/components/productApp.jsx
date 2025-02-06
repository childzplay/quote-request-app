import React, { useState } from 'react';

const ProductApp = () => {
  const [view, setView] = useState('configurator');
  const [config, setConfig] = useState({
    model: 'model1z',
    color: 'red',
    size: 'medium'
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const updateConfig = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleFormChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Täytä pakolliset kentät!');
      return;
    }
    setView('success');
  };

  const getImageName = () => {
    const prefix = config.model === 'model1z' ? '1z' : '2x';
    switch(config.color) {
      case 'black': return `model_${prefix}b.svg`;
      case 'green': return `model_${prefix}g.svg`;
      case 'blue': return `model_${prefix}n.svg`;
      case 'red': return `model_${prefix}r.svg`;
      case 'white': return `model_${prefix}w.svg`;
      default: return `model_${prefix}r.svg`;
    }
  };

  const getSizeStyle = () => {
    switch(config.size) {
      case 'small': return 'w-[10rem]';
      case 'medium': return 'w-[12rem]';
      default: return 'w-[10rem]';
    }
  };

  const ConfiguratorView = () => (
    <div className="flex flex-col md:flex-row gap-20">
      <div className="flex-1">
        <div className="mb-6">
          <label className="block mb-2">Malli:</label>
          <div className="flex gap-4">
            <div 
              onClick={() => updateConfig('model', 'model1z')}
              className={`flex-1 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                config.model === 'model1z' ? 'bg-indigo-50 border-purple-600 shadow-lg shadow-gray-300' : 'border-gray-200'
              }`}
            >
              <span class="text-lg font-medium">Model 1Z</span>
              <small> – edistyksellisellä 12MP dual-kameralla</small>
            </div>
            <div 
              onClick={() => updateConfig('model', 'model2x')}
              className={`flex-1 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                config.model === 'model2x' ? 'bg-indigo-50 border-purple-600 shadow-lg shadow-gray-300' : 'border-gray-200'
              }`}
            >
              <span class="text-lg font-medium">Model 2X</span>
              <small> – 48MP ultralaajakulmalla varustettu kamerasysteemi</small>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Väri:</label>
          <select 
            className="w-full p-2 border rounded"
            value={config.color}
            onChange={(e) => updateConfig('color', e.target.value)}
          >
            <option value="red">Punainen</option>
            <option value="blue">Sininen</option>
            <option value="green">Vihreä</option>
            <option value="black">Musta</option>
            <option value="white">Valkoinen</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2">Näytön koko:</label>
          <select 
            className="w-full p-2 border rounded"
            value={config.size}
            onChange={(e) => updateConfig('size', e.target.value)}
          >
            <option value="small">6.1 tuumaa</option>
            <option value="medium">6.9 tuumaa</option>
          </select>
        </div>
        
        <button 
          onClick={() => setView('contact')}
          className="bg-gradient-to-tl from-purple-600 to-teal-500 text-white text-lg font-bold px-6 py-3 mt-5 rounded hover:bg-green-700"
        >
          Vahvista!
        </button>
      </div>

      <div className="flex-2 flex justify-center items-center">
        <div className="relative w-full">
          <img 
            key={`${config.color}-${config.model}`}
            src={`/images/${getImageName()}`}
            alt="Tuote"
            className={`transform transition-all duration-500 ease-in-out ${getSizeStyle()}`}
            style={{
              animation: 'fadeInDiagonal 0.5s ease-in-out'
            }}
          />
        </div>
        <style jsx>{`
          @keyframes fadeInDiagonal {
            from {
              width: ${config.size === 'medium' ? '10rem' : '12rem'});
            }
            to {
              width: ${config.size === 'medium' ? '12rem' : '10rem'});
            }
          }
        `}</style>
      </div>
    </div>
  );

  const ContactView = () => (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Täytä yhteystietosi</h2>
      <button 
        onClick={() => setView('configurator')}
        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 mb-4"
      >
        Takaisin
      </button>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Nimi:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2">Sähköposti:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2">Puhelin:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleFormChange}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <button 
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Lähetä tarjouspyyntö
        </button>
      </form>
    </div>
  );

  const SuccessView = () => (
    <div className="bg-green-600 text-white p-5 rounded text-center">
      Kiitos! Palaamme tarjouksen muodossa.
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-4xl font-bold mb-12">Tarjoustyökalu</h1>
      {view === 'configurator' && <ConfiguratorView />}
      {view === 'contact' && <ContactView />}
      {view === 'success' && <SuccessView />}
    </div>
  );
};

export default ProductApp;