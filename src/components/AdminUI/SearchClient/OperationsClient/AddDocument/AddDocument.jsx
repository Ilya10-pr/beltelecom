import { useState } from 'react';
import style from './AddDocument.module.css'; // Создадим этот файл
import { useForm } from 'react-hook-form';

const AddDocument = ({setIsOpen}) => {
  const [showCategories, setShowCategories] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const categories = ["Договор",
    "Приложение",
    "Свидетельство о льготе",
    "Свидетельство о браке",
    "Свидетельство о сметри",
    "Свидетельство",
    "Другое"
];

  const { 
    register, 
    handleSubmit, 
    reset,
    setValue,
    watch,
    formState: { errors } 
  } = useForm();

  const documentType = watch("documentType");

  const onSubmit = (data) => {
    const formData = {
      ...data,
      file: selectedFile
    };
    console.log(formData);
    setIsOpen(false);
    resetForm();
  };

  const resetForm = () => {
    reset();
    setSelectedFile(null);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
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
                <label>Название</label>
                <input
                  type="text"
                  {...register("title", { 
                    required: true
                  })}
                  className={errors.title ? style.error : ''}
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
                    onChange={handleFileChange}
                    required
                    className={!selectedFile ? style.error : ''}
                  />
                  <span className={style.selectFile}>Выбрать документ</span>
                </label>
                {!selectedFile && (
                  <span className={style.message}>Выберите файл документа</span>
                )}
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
