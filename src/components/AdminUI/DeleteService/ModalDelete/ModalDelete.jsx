import { useState } from 'react';
import './ModalDelete.css';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteService, getAllServices } from '../../../../api/api';
import DeleteService from '../DeleteService';

const ModalDelete = ({setIsModalOpen, point}) => {
  const queryClient = useQueryClient()
  const {data, isLoading, isError, error} = useQuery({
    queryKey: ["service", point],
    queryFn: () => getAllServices(path)
  });
  const path = point === "package" ? "package" : "service"
  
  const handleDelete = async (id) => {
    try {
      await deleteService(path, id);
      queryClient.invalidateQueries(["service", point]); // Обновляем данные
    } catch (error) {
      console.error("Ошибка при удалении:", error);
    }
  };
  
  const handleClose = () => {
    setIsModalOpen(false);
  };
  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (isError) {
    console.error("Ошибка при загрузке данных:", error);
    return <div>Ошибка при загрузке данных</div>;
  }

  if (!data || data.length === 0) {
    return <div>Данные не найдены</div>;
  }

  return (

        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Выбор услуг</h2>
            
            <div className="services-list">
              {data.filter((item) => item.category === point).map((service) => (
                <div key={service.id} className="service-items">
                  <div 
                    className="service-header"
                  >
                    <span>{service.name}</span>
                    <button 
                      className="confirm-btn"
                      onClick={() => {
                        handleDelete(service.id);
                      }}
                    >
                      Удалить
                    </button>
                    {/* <svg 
                      className={`dropdown-icon ${expandedService === service.id ? 'expanded' : ''}`} 
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 10l5 5 5-5z" />
                    </svg> */}
                  </div>
                </div>
              ))}
            </div>

            <div className="modal-actions">
              <button 
                className="cancel-btn"
                onClick={() => handleClose()}
              >
                Отмена
              </button>
              
            </div>
          </div>
        </div>
        );
}

export default ModalDelete;