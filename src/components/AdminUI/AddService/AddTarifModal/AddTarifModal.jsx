import { useState } from 'react';
import './AddTariffModal.css';

const packageTypes = [
  { id: 'basic', name: 'Базовый' },
  { id: 'standard', name: 'Стандарт' },
  { id: 'premium', name: 'Премиум' }
];

const serviceTypes = [
  { id: 'internet', name: 'Высокоскоростной интернет' },
  { id: 'tv', name: 'Телевидение' },
  { id: 'phone', name: 'Телефония' },
  { id: 'security', name: 'Охранная система' },
  { id: 'internet', name: 'Интернет' },
  { id: 'tv', name: 'Телевидение' },
  { id: 'phone', name: 'Телефония' },
  { id: 'security', name: 'Охранная система' }
];

function AddTariffModal({serviceId, setIsModalOpen}) {
  const [showPackageTypes, setShowPackageTypes] = useState(false);
  const [showServiceTypes, setShowServiceTypes] = useState(false);
   
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    typeService: '',
    services: []
  });
  
  const addService = (serviceId) => {
    const service = serviceTypes.find(s => s.id === serviceId);
    if (service && !formData.services.some(s => s.id === serviceId)) {
      setFormData({
        ...formData,
        services: [...formData.services, service],
        description: !formData.description ? service.name :formData.description + ", " + service.name
      });
    }
    setShowServiceTypes(false);
  };
  
  const removeService = (serviceId) => {
    setFormData({
      ...formData,
      services: formData.services.filter(s => s.id !== serviceId)
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Отправленные данные:', formData);
    setIsModalOpen(false);
  };
  
  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      description: '',
      type: '',
      services: []
    });
    setIsModalOpen(false);
  };

  return (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Название пакета</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  placeholder="Введите название тарифа"
                />
              </div>
              <div className="form-group">
                <label>Тариф</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  required
                  placeholder="Введите сумму"
                />
              </div>
              {serviceId !== "package" && <div className="form-group">
                <label>Описание</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                  placeholder="Введите текст"
                />
              </div>}
              
              
              <div className="form-group">
                <label>Тип пакета</label>
                <div className="dropdown">
                  <input
                    type="text"
                    value={packageTypes.find(p => p.id === formData.type)?.name || ''}
                    readOnly
                    onClick={() => setShowPackageTypes(!showPackageTypes)}
                    placeholder="Выберите тип пакета"
                    required
                  />
                  {showPackageTypes && (
                    <div className="dropdown-content">
                      {packageTypes.map((pkg) => (
                        <div
                          key={pkg.id}
                          className="dropdown-item"
                          onClick={() => {
                            setFormData({...formData, type: pkg.id});
                            setShowPackageTypes(false);
                          }}
                        >
                          {pkg.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div> 
              {serviceId === "package" &&  <div className="form-group">
                <label>Услуги</label>
                <div className="services-container">
                  {formData.services.map(service => (
                    <div key={service.id} className="service-item">
                      <span>{service.name}</span>
                      <button 
                        type="button" 
                        className="remove-service-btn"
                        onClick={() => removeService(service.id)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    className="add-service-btn"
                    onClick={() => setShowServiceTypes(true)}
                  >
                    + Добавить услугу
                  </button>
                  
                  {showServiceTypes && (
                    <div className="services-dropdown">
                      {serviceTypes.map(service => (
                        <button
                          key={service.id}
                          type="button"
                          className="service-option"
                          onClick={() => addService(service.id)}
                          disabled={formData.services.some(s => s.id === service.id)}
                        >
                          {service.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>}

              
              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={resetForm}
                >
                  Отмена
                </button>
                <button 
                  type="submit" 
                  className="submit-btn"
                  // disabled={!formData.tariffName || !formData.packageType}
                >
                  Добавить
                </button>
              </div>
            </form>
          </div>
        </div>
        );
}

export default AddTariffModal;