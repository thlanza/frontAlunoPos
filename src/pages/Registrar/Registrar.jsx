import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { getModalidadesAction, umaModalidadeAction } from '../../redux/slices/modalidades/modalidadeSlices';
import * as Yup from 'yup';
import makeAnimated from 'react-select/animated';
import { useFormik } from 'formik';
import styled from 'styled-components';
import { matricularAction, matricularGoogleAction } from '../../redux/slices/alunos/alunosSlices';
import GoogleLogin from 'react-google-login';

const animatedComponents = makeAnimated();

const formSchema = Yup.object({
  primeiroNome: Yup.string().required("Primeiro nome é requerido."),
  sobrenome: Yup.string().required("Sobrenome é requerido."),
  email: Yup.string().email("Deve ser um email válido.").required("Email é requerido."),
  senha: Yup.string().required("Senha é requerida."),
  image: Yup.string().required("Imagem é requerida."),
  modalidade: Yup.string().required("Modalidade é requerido."),
});

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  border-color: 'red';
  transition: border 0.24s ease-in-out;
`;

const Registrar = ({ user }) => {
  const [pronto, configurarPronto] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getModalidadesAction())
  }, []);

  // const googleAuth = () => {
  //   window.open(
  //       `${process.env.REACT_APP_API_URL}/auth/google/callback`,
  //       "_self"
  //   )
  // };

  const responseGoogle = (response) => {
    console.log(response)
  }

  const responseFailure = (response) => {
    
  }

  
  const modalidadesList = useSelector(state => state?.modalidades);
  const { modalidades, appErr, serverErr, loading } = modalidadesList;
  const modalidadeEspecifica = useSelector(state => state?.modalidades?.modalidadeEspecifica, shallowEqual);
  
  const arrayModalidades = 
  modalidades?.map(element => {
    return { value: element.nomeModalidade, label: element.nomeModalidade, id: element._id }
  });

  const alunos = useSelector(state => state?.alunos);
  const { loading: loadingAlunos, appErr: appErrAlunos, serverErr: serverErrAlunos, alunoLogado } = alunos;
  

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
        primeiroNome: user ? user?.name.split(" ")[0] : '',
        sobrenome: user ? user?.name.split(" ")[1] : '',
        email: user ? user?.email: '',
        senha: '',
        image: user ? user?.picture : '',
        modalidade: ''
    },
    onSubmit: values => {
      if(user) {
        const data = {
          primeiroNome: values.primeiroNome,
          sobrenome: values.sobrenome,
          email: values.email,
          senha: values.senha,
          fotoDePerfil: values.image,
          modalidade: values.modalidade
        }
        dispatch(matricularGoogleAction(data));
      } else {
        dispatch(matricularAction(values));

      }   
    },
    validationSchema: formSchema
  });

  if (alunoLogado) navigate("/home");

  
  return (
    <div className='flex'>
      <form 
        onSubmit={formik.handleSubmit}
        className='sm:w-1/2 my-gradient flex flex-col'>
        <div className='flex items-center justify-center'>
        <h1 className='font-spartan flex text-white m-6 text-4xl'>Bem-vindo! Preencha os dados a seguir para a matrícula</h1>
        </div>
        <div className='m-3'>
          <p className='font-bakbak text-left font-bold text-white'>Primeiro Nome <span className='text-red-500'>{formik.touched.primeiroNome && formik.errors.primeiroNome}</span></p>
          <input
            type="text"
            className="relative border-4 p-3 w-full rounded-lg placeholder:p-4" 
            placeholder='Coloque aqui seu primeiro nome'
            value={formik.values.primeiroNome}
            onChange={formik.handleChange('primeiroNome')}
            onBlur={formik.handleBlur('primeiroNome')}
            />
        </div>
        <div className='m-3'>
          <p className='font-bakbak text-left font-bold text-white'>Sobrenome  <span className='text-red-500'>{formik.touched.sobrenome && formik.errors.sobrenome}</span> </p>
          <input 
              type="text"  
              className="border-4 p-3 w-full rounded-lg placeholder:p-4" 
              placeholder='Coloque aqui seu sobrenome'
              value={formik.values.sobrenome}
              onChange={formik.handleChange('sobrenome')}
              onBlur={formik.handleBlur('sobrenome')}
          />
        </div>
        <div className='m-3'>
          <p className='font-bakbak text-left font-bold text-white'>Senha <span className='text-red-500'>{formik.touched.senha && formik.errors.senha}</span> </p>
          <input 
              type="password"  
              className="border-4 p-3 w-full rounded-lg placeholder:p-4" 
              placeholder='Coloque aqui sua senha'
              value={formik.values.senha}
              onChange={formik.handleChange('senha')}
              onBlur={formik.handleBlur('senha')}
          />
        </div>
        <div className='m-3'>
          <p className='font-bakbak text-left font-bold text-white'>Email <span className='text-red-500'>{formik.touched.email && formik.errors.email}</span> </p>
          <input 
              type="text"  
              className="border-4 p-3 w-full rounded-lg placeholder:p-4" 
              placeholder='Coloque aqui sua senha'
              value={formik.values.email}
              onChange={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
          />
        </div>
           <div className='m-3'>
           <p className='font-bakbak text-left text-white'>Modalidades  <span className='text-red-500'>{formik.touched.modalidade && formik.errors.modalidade}</span> </p>    
           <Select 
           className='p-3 mb-1'
           components={animatedComponents}
           onChange={(e) => {
             formik.setFieldValue("modalidade", e.id)
             configurarPronto(true);
            dispatch(umaModalidadeAction(e.id))
           }}
           options={arrayModalidades}
           isSearchable
           />  
           </div>
           {appErr || serverErr || appErrAlunos || serverErrAlunos ? <span className='text-2xl border-4 border-red-500 bg-white p-5 text-red-500'>{appErr} {serverErr} {appErrAlunos} {serverErrAlunos}</span>: null}
           {pronto && (
            <div className='text-white'>
           <h1>O horário desta aula é {modalidadeEspecifica?.horario}</h1>
           <h1>Os dias desta aula são {modalidadeEspecifica?.dias?.join(", ")}</h1>
           </div>
           )
           }
          {user ?  null : 
          <Container>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(event) => {
                formik.setFieldValue('image', event.currentTarget.files[0])
              }}
            />
          </Container>
          }
        {loadingAlunos ? <button 
        disabled
        className='button-disabled m-5'>
          Matricular
        </button> : <button 
        type='submit'
        className='button-white m-5'>
          Matricular
        </button>}
        <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
            buttonText='Matricular com Google'
            onSuccess={responseGoogle}
            onFailure={responseFailure}
          />
        <h5 className='text-white m-5'>
          Já possui registro? <Link className="text-gray-300 hover:underline" to="/login">Logar</Link>
        </h5>
      </form>
      <div className='hidden sm:block sm:w-1/2'>
        <img className="w-[100%] object-cover object-top" src="./gym-green.png" alt="" />
      </div>
    </div>
  )
}

export default Registrar