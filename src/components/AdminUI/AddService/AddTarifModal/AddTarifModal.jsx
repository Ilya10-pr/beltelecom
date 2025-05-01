import { useState } from 'react';
import style from  './AddTariffModal.module.css';
import { createPackage, createService, getAllServices } from '../../../../api/api';
import { useQuery } from '@tanstack/react-query';

const packageTypes = [
  { id: 'basic', name: 'Базовый' },
  { id: 'standard', name: 'Стандарт' },
  { id: 'premium', name: 'Премиум' }
];

const AddTariffModal = ({serviceId, setIsModalOpen}) => {
  const [showPackageTypes, setShowPackageTypes] = useState(false);
  const [showServiceTypes, setShowServiceTypes] = useState(false);
  const {data, isLoading, isError, error} = useQuery({queryKey: ["serviceTypes"], queryFn: () => getAllServices("service")})
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    type: '',
    services: []
  });

  // if (isLoading) return <div>Загрузка...</div>;
  // if (isError) return <div>Ошибка при загрузке данных: {error.message}</div>;
  // if (!data || data.length === 0) return <div>Забронированного времени нет</div>;
  
  const addService = (serviceId) => {
    const service = data.find(s => s.id === serviceId);
    if (service && !formData.services.some(s => s.id === serviceId)) {
      setFormData({
        ...formData,
        services: [...formData.services, service],
        // description: !formData.description ? service.name : formData.description + ", " + service.name
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
  
  const handleSubmit = async (e) => {
    console.log(formData)
    e.preventDefault();
    setIsModalOpen(false);
    if(serviceId === "package"){
      const response = await createPackage(formData)
      response ? console.log("Pakage created") : console.log("Pakage didn`t create")
      } else {
        formData.category = serviceId
        const response = await createService(formData)
        response ? console.log("Service created") : console.log("Service didn`t create")
      } 
    } 
  
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
        <div className={style.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>            
            <form onSubmit={handleSubmit}>
              <div className={style.formGroup}>
                <label>Название</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  placeholder="Введите название тарифа"
                />
              </div>
              <div className={style.formGroup}>
                <label>Тариф</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  required
                  placeholder="Введите сумму в бел. руб."
                />
              </div>
              {serviceId !== "package" && <div className={style.formGroup}>
                <label>Описание</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                  placeholder="Введите текст"
                />
              </div>}
              
              {serviceId === "package" && <div className={style.formGroup}>
                <label>Тип пакета</label>
                <div className={style.dropdown}>
                  <input
                    type="text"
                    value={packageTypes.find(p => p.id === formData.type)?.name || ''}
                    readOnly
                    onClick={() => setShowPackageTypes(!showPackageTypes)}
                    placeholder="Выберите тип пакета"
                    required
                  />
                  {showPackageTypes && (
                    <div className={style.dropdownContent}>
                      {packageTypes.map((pkg) => (
                        <div
                          key={pkg.id}
                          className={style.dropdownItem}
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
              </div> }
              
              {serviceId === "package" &&  <div className={style.formGroup}>
                <label>Услуги</label>
                <div className={style.servicesContainer}>
                  {formData.services.map(service => (
                    <div key={service.id} className={style.serviceItem}>
                      <span>{service.name}</span>
                      <button 
                        type="button" 
                        className={style.removeServiceBtn}
                        onClick={() => removeService(service.id)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    className={style.addServiceBtn}
                    onClick={() => setShowServiceTypes(true)}
                  >
                    + Добавить услугу
                  </button>
                  
                  {showServiceTypes && (
                    <div className={style.servicesDropdown}>
                      {data.filter(item => item.packageId === null).map(service => (
                        <button
                          key={service.id}
                          type="button"
                          className={style.serviceOption}
                          onClick={() => addService(service.id)}
                          disabled={formData.services.some(s => s.id === service.id)}
                        >
                          {service.description}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>}

              
              <div className={style.formActions}>
                <button
                  type="button"
                  className={style.cancelBtn}
                  onClick={resetForm}
                >
                  Отмена
                </button>
                <button 
                  type="submit" 
                  className={style.submitBtn}
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