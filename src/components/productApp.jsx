import React, { useState, memo, useCallback, useMemo } from 'react';

const ProductImage = memo(({ config }) => {
  const imageName = useMemo(() => {
    const prefix = config.model === 'model1z' ? '1z' : '2x';
    switch(config.color) {
      case 'black': return `model_${prefix}b.svg`;
      case 'green': return `model_${prefix}g.svg`;
      case 'blue': return `model_${prefix}n.svg`;
      case 'red': return `model_${prefix}r.svg`;
      case 'white': return `model_${prefix}w.svg`;
      default: return `model_${prefix}r.svg`;
    }
  }, [config.model, config.color]);

  return (
    <div className="relative w-full">
      <img 
        src={`/images/${imageName}`}
        alt="Tuote"
        className="w-auto transition-[width] duration-500 ease-in-out"
        style={{
          width: config.size === 'medium' ? '12rem' : '10rem'
        }}
      />
    </div>
  );
});

import { PrimaryButton, ReturnButton, SubmitButton } from './buttons';

const ConfiguratorView = memo(({ config, updateConfig, setView, setSizeSelection }) => (
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
            <span className="text-lg font-medium">Model 1Z</span>
            <small> – edistyksellisellä 12MP dual-kameralla</small>
          </div>
          <div 
            onClick={() => updateConfig('model', 'model2x')}
            className={`flex-1 p-4 border-2 rounded-lg cursor-pointer transition-all ${
              config.model === 'model2x' ? 'bg-indigo-50 border-purple-600 shadow-lg shadow-gray-300' : 'border-gray-200'
            }`}
          >
            <span className="text-lg font-medium">Model 2X</span>
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

      <div className="mb-4">
        <label className="block mb-2">Haluan:</label>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="size"
              value="small"
              className="accent-blue-500"
              onChange={() => setSizeSelection('tarjouspyyntö')} // Update text based on radio selection
            />
            <span>ottaa vastaan tarjouksen</span>
          </label>
          
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="size"
              value="medium"
              className="accent-blue-500"
              onChange={() => setSizeSelection('tilaus')} // Update text based on radio selection
            />
            <span>tilata tuotteen suoraan kotiovelle</span>
          </label>
        </div>
      </div>
      
      <PrimaryButton text="Vahvista!" styles="mt-6" onClick={() => setView('contact')} />
    </div>

    <div className="flex-2 flex justify-center items-start">
      <ProductImage config={config} />
    </div>
  </div>
));

const ContactView = memo(({ formData, handleFormChange, handleSubmit, setView, submitText }) => (
  <div className="max-w-md mx-auto w-full min-w-full">
    <ReturnButton size="18" color="purple" text="Palaa takaisin" onClick={() => setView('configurator')} />
    <h2 className="text-xl font-bold mb-6">Täytä yhteystiedot</h2>
    <form onSubmit={handleSubmit}>

      <div className="flex gap-4">
        <div className="flex-1">
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
        </div>

        <div className="flex-1">
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
        </div>
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
      
      <SubmitButton text={submitText} styles="mt-8" onClick={handleSubmit} />
    </form>
  </div>
));

const SuccessView = () => (
  <div className="border border-indigo-600 text-indigo-600 text-2xl font-medium px-8 py-8 rounded text-center">
    Kiitos! Palaamme seuraavaksi tarjouksen muodossa.
    <div className="text-indigo-300 text-lg pt-2 px-8 font-normal text-center max-w-70">
      Huomioithan, että kyseessä on demo, joten toiminnallisuudet voivat olla rajoitettuja.
    </div>
  </div>
);

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
  const [sizeSelection, setSizeSelection] = useState('tarjouspyyntö'); // Default text

  const updateConfig = useCallback((key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Täytä pakolliset kentät!');
      return;
    }
    setView('success');
  }, [formData]);

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-4xl font-bold mb-12">Tarjoustyökalu</h1>
      {view === 'configurator' && (
        <ConfiguratorView
          config={config}
          updateConfig={updateConfig}
          setView={setView}
          setSizeSelection={setSizeSelection} // Pass setSizeSelection to update the submit button text
        />
      )}
      {view === 'contact' && (
        <ContactView
          formData={formData}
          handleFormChange={handleFormChange}
          handleSubmit={handleSubmit}
          setView={setView}
          submitText={sizeSelection === 'tarjouspyyntö' ? 'Lähetä tarjouspyyntö' : 'Lähetä tilaus'} // Dynamic button text
        />
      )}
      {view === 'success' && <SuccessView />}
    </div>
  );
};

export default ProductApp;
