import { useState } from 'react';
import './ModalDelete.css';
const services = [
  {
    id: 'internet',
    name: 'Интернет',
    options: [
      { id: 'inet-100', name: '100 Мбит/с - 500 ₽' },
      { id: 'inet-300', name: '300 Мбит/с - 800 ₽' },
      { id: 'inet-500', name: '500 Мбит/с - 1100 ₽' }
    ]
  },
  {
    id: 'tv',
    name: 'Телевидение',
    options: [
      { id: 'tv-basic', name: 'Базовый пакет - 300 ₽' },
      { id: 'tv-sport', name: 'Спортивный пакет - 450 ₽' },
      { id: 'tv-premium', name: 'Премиум пакет - 600 ₽' }
    ]
  },
  {
    id: 'package',
    name: 'Пакет услуг',
    options: [
      { id: 'pack1', name: 'Интернет + ТВ - 1200 ₽'},
      { id: 'pack2', name: 'Интернет + ТВ + Телефон - 1500 ₽' }
    ]
  }
];
const ModalDelete = ({setIsModalOpen, isModalOpen}) => {
  const [expandedService, setExpandedService] = useState(null);



  const toggleService = (serviceId) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  const handleOptionSelect = (serviceId, optionId) => {
    console.log(`Выбрана услуга: ${serviceId}, опция: ${optionId}`);
    // Здесь можно добавить логику выбора опции
    toggleService(serviceId); // Закрываем выпадающий список после выбора
  };

  return (

        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Выбор услуг</h2>
            
            <div className="services-list">
              {services.map((service) => (
                <div key={service.id} className="service-item">
                  <div 
                    className="service-header"
                    onClick={() => toggleService(service.id)}
                  >
                    <span>{service.name}</span>
                    <svg 
                      className={`dropdown-icon ${expandedService === service.id ? 'expanded' : ''}`} 
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 10l5 5 5-5z" />
                    </svg>
                  </div>
                  
                  {expandedService === service.id && (
                    <div className="options-list">
                      {service.options.map((option) => (
                        <button
                          key={option.id}
                          className="option-btn"
                          onClick={() => handleOptionSelect(service.id, option.id)}
                        >
                          {option.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="modal-actions">
              <button 
                className="cancel-btn"
                onClick={() => setIsModalOpen(false)}
              >
                Отмена
              </button>
              <button 
                className="confirm-btn"
                onClick={() => {
                  console.log('Услуги подтверждены');
                  setIsModalOpen(false);
                }}
              >
                Подтвердить
              </button>
            </div>
          </div>
        </div>
        );
}

export default ModalDelete;