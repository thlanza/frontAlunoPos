import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useMediaQuery from '../../hooks/useMediaQuery';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pt from 'date-fns/locale/pt-BR';
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import { useState } from 'react';
import { uploadComprovanteAction } from '../../redux/slices/alunos/alunosSlices';
import { useDispatch } from 'react-redux';
registerLocale('pt', pt);

const formSchema = Yup.object({
    mes: Yup.number().required("Mês é requerido."),
    ano: Yup.number().required("Ano é requerido."),
    image: Yup.string().required("Imagem é requerida."),
  });


const NotificarPagamentos = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const dispatch = useDispatch();
    const [dataInicial, configurarDataInicial] = useState(new Date());
    const [msgErro, configurarMsgErro] = useState(null);
    const onChangeData = (date) => {
        configurarDataInicial(date)
        let data = new Date(dataInicial);
        let mes = data.getMonth() + 1;
        let ano = data.getFullYear();
        formik.setFieldValue('mes', mes);
        formik.setFieldValue('ano', ano);
    };
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            mes: '',
            ano: '',
            image: ''
        },
        onSubmit: values => {

            const comprovante = dispatch(uploadComprovanteAction(values)); 
            if (comprovante.error) {
                configurarMsgErro(comprovante.payload.message);
            } else {
                configurarMsgErro(null);
                alert("Upload do comprovante bem sucedido!")
            }
        },
        validationSchema: formSchema
      });
  return (
    <div>{isMobile ?
    (
      <form 
      className='flex flex-col justify-center items-start w-[40%]' 
      onSubmit={formik.handleSubmit}
      >
      {msgErro ? 
      <p className='outlined text-red-600 text-2xl mt-7 ml-5'>Ocorreu um erro nos nossos servidores. Tente novamente.</p>
      : <p className='outlined text-2xl mt-7 ml-2'>Faça upload do seu comprovante de pagamento:</p>}
      <div>
      <DatePicker 
                  selected={dataInicial} 
                  className='ml-2 mb-5 mt-6'
                  onChange={(date) => onChangeData(date)}
                  locale='pt'
                  data-cy="datePicker"
                  dateFormat="dd/MM/yyyy"
              />
      </div>
          <div className='ml-2 p-[8px] bg-[#fafafafa] border-4 border-black border-dashed'>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(event) => {
              formik.setFieldValue('image', event.currentTarget.files[0])
            }}
          />
        </div>
        <button 
      type='submit'
      className='button-white ml-10 m-5'>
        Enviar
      </button>
  </form>
    )
    :
    (
        <form 
        className='flex flex-col justify-start items-center' 
        onSubmit={formik.handleSubmit}
        >
        {msgErro ? 
        <p className='outlined text-red-600 text-2xl mt-7 ml-5'>Ocorreu um erro nos nossos servidores. Tente novamente.</p>
        : <p className='outlined text-2xl mt-7 ml-5'>Faça upload do seu comprovante de pagamento:</p>}
        <div>
        <DatePicker 
                    selected={dataInicial} 
                    className='mb-5 mt-2 react-date-picker'
                    // onChange={(date) => 
                    //     configurarDataInicial(date)} 
                    // formik.setFieldValue('image', event.currentTarget.files[0])
                    onChange={(date) => onChangeData(date)}
                    locale='pt'
                    dateFormat="dd/MM/yyyy"
                />
        </div>
            <div className='p-[20px] bg-[#fafafafa] border-4 border-black border-dashed'>

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(event) => {
                formik.setFieldValue('image', event.currentTarget.files[0])
              }}
            />
          </div>
          <button 
        type='submit'
        className='button-white m-5'>
          Enviar
        </button>
    </form>
    )}
    </div>
    
  )
}

export default NotificarPagamentos