import { useEffect, useState } from 'react';
import style from  './AddTariffModal.module.css';
import { createPackage, createService, getAllServices } from '../../../../api/api';
import { useQuery } from '@tanstack/react-query';
import { staticSearch } from '../../../../helpers/itemLink';
import toast from 'react-hot-toast';
import { typeTitle } from '../../../../helpers/itemLink';

const AddTariffModal = ({serviceId, setIsModalOpen}) => {
  const [showPackageTypes, setShowPackageTypes] = useState(false);
  const [showServiceTypes, setShowServiceTypes] = useState(false);
  const {data } = useQuery({queryKey: ["serviceTypes"], queryFn: () => getAllServices("service")})
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    type: '',
    services: []
  });

  const tarrifs = staticSearch.find(t => t.id === serviceId)
  const type = typeTitle.find(type => type.id === serviceId)
  const addService = (serviceId) => {
    const service = data.find(s => s.id === serviceId);
    if (service && !formData.services.some(s => s.id === serviceId)) {
      setFormData({
        ...formData,
        services: [...formData.services, service],
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
    try {
      e.preventDefault();
      setIsModalOpen(false);
      if(serviceId === "package"){
        const response = await createPackage(formData)
        if(!response){
          toast.error("Ошибка, попробуйте позже...");
          return
        }
        toast.success("Успешно!")
        } else {
          formData.category = serviceId
          const response = await createService(formData)
          if(!response){
            toast.error("Ошибка, попробуйте позже...");
            return
          }
          toast.success("Успешно!")
        } 
    } catch (error) {
      console.log("Ошибка при добавлении:", error)
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
                  onKeyPress={(e) => {
                    const isValidChar = /^[0-9.,]+$/.test(e.key);
                    if (!isValidChar) {
                      e.preventDefault();
                    }
                  }}
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
              
              {tarrifs && <div className={style.formGroup}>
                <label>Тип {type.name}</label>
                <div className={style.dropdown}>
                  <input
                    type="text"
                    value={tarrifs.btnServices.find(p => p.name === formData.type)?.name || ''}
                    readOnly
                    onClick={() => setShowPackageTypes(!showPackageTypes)}
                    placeholder="Выберите тип пакета"
                    required
                  />
                  {showPackageTypes && (
                    <div className={style.dropdownContent}>
                      {tarrifs.btnServices.map((pkg) => (
                        <div
                          key={pkg.id}
                          className={style.dropdownItem}
                          onClick={() => {
                            setFormData({...formData, type: pkg.name});
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
                      <span>{service.description}</span>
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
                      {data.filter(item => item.category !== null).map(service => (
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