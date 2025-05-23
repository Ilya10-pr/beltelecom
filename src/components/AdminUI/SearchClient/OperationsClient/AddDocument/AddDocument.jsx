import { useState } from 'react';
import style from './AddDocument.module.css';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateInfoUser } from '../../../../../api/api';
import { setDataClient } from '../../../../../store/client/client';
import { categories } from '../../../../../helpers/itemLink';
import toast from 'react-hot-toast';


const AddDocument = ({ client, setIsOpen}) => {
  const [showCategories, setShowCategories] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch()


  const { 
    register, 
    handleSubmit, 
    reset,
    setValue,
    watch,
    formState: { errors } 
  } = useForm();

  const documentType = watch("documentType");

  const onSubmit = async (data) => {
    try {
      const dataDocument = new FormData();
      dataDocument.append("file", selectedFile);
      dataDocument.append("data", JSON.stringify(data))
      const response = await updateInfoUser(client.id, dataDocument)
      if(!response) {
        toast.error("Ошибка, попробуйте позже...")
        return
      }
      toast.success("Документы добавлены!")
      dispatch(setDataClient(response))
      setIsOpen(false);
      resetForm();
      
    } catch (error) {
      console.log(error)
    }
  };

  const resetForm = () => {
    reset();
    setSelectedFile(null);
  };
 
  return (
        <div className={style.modalOverlay} onClick={() => setIsOpen(false)}>
          <div className={style.modalWindow} onClick={e => e.stopPropagation()}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className={style.item}>
                <label>Тип документа</label>
                <div className={style.dropdown}>
                  <input
                    type="text"
                    value={documentType || ''}
                    readOnly
                    onClick={() => setShowCategories(!showCategories)}
                    placeholder="Выберите тип документа"
                    className={errors.documentType ? style.error : ''}
                  />
                  {showCategories && (
                    <div className={style.dropdownContent}>
                      {categories.map((category) => (
                        <div
                          key={category}
                          className={style.dropdownItem}
                          onClick={() => {
                            setValue("documentType", category);
                            setShowCategories(false);
                          }}
                        >
                          {category}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <input
                  type="hidden"
                  {...register("documentType", { required: true })}
                />
              </div>

              <div className={style.item}>
                <label>Описание</label>
                <textarea
                  {...register("description")}
                />
              </div>
              <div className={style.item}>
                <label>Дата*</label>
                <input
                  type="date"
                  {...register("date", {required: false}) }
                />
              </div>
              <div className={style.item}>
                <label>
                  <input
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    required
                    className={!selectedFile ? style.error : ''}
                  />
                  <span className={style.selectFile}>Выбрать документ</span>
                </label>
                {!selectedFile && (
                  <span className={style.message}>Выберите файл документа</span>
                )}
              </div>
              <div className={style.item}>
                <label>Улица</label>
                <textarea
                  {...register("street")}
                />
              </div>
              <div className={style.item}>
                <label>Дом</label>
                <textarea
                  {...register("house")}
                  onKeyPress={(e) => {
                      const isValidChar = /^[0-9!@#$%^&*()_+\-=\]{};':"\\|,.<>?]*$/.test(e.key);
                      if (!isValidChar) {
                        e.preventDefault();
                      }
                    }}
                />
              </div>
              <div className={style.item}>
                <label>Квартира</label>
                <textarea
                  {...register("flat")}
                  onKeyPress={(e) => {
                      const isValidChar = /^[0-9!@#$%^&*()_+\-=\]{};':"\\|,.<>?]*$/.test(e.key);
                      if (!isValidChar) {
                        e.preventDefault();
                      }
                    }}
                />
              </div>

              <div className={style.formActions}>
                <button
                  className={style.cancel}
                  onClick={() => {
                    setIsOpen(false);
                    resetForm();
                  }}
                >
                  Отменить
                </button>
                <button type="submit" className={style.submit}>
                  Добавить
                </button>
              </div>
            </form>
          </div>
        </div>
  );
}

export default AddDocument;
