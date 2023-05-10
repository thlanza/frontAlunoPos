import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { getModalidadesAction, umaModalidadeAction } from '../../redux/slices/modalidades/modalidadeSlices';
import * as Yup from 'yup';
import makeAnimated from 'react-select/animated';
import { useFormik } from 'formik';
import { matricularAction, matricularGoogleAction } from '../../redux/slices/alunos/alunosSlices';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';

const animatedComponents = makeAnimated();

const formSchema = Yup.object({
  primeiroNome: Yup.string().required("Primeiro nome é requerido."),
  sobrenome: Yup.string().required("Sobrenome é requerido."),
  email: Yup.string().email("Deve ser um email válido.").required("Email é requerido."),
  senha: Yup.string().required("Senha é requerida."),
  image: Yup.string().required("Imagem é requerida."),
  modalidade: Yup.string().required("Modalidade é requerido."),
});

const Registrar = () => {
  const [pronto, configurarPronto] = useState(false);
  const [nome, configurarNome] = useState("");
  const [email, configurarEmail] = useState("");
  const [profilePic, configurarProfilePic] = useState("");
  const [logado, configurarLogado] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getModalidadesAction())
  }, []);

  const responseGoogle = async (response) => {
    console.log(response);
    let obj = jwtDecode(response.credential);
    let data = JSON.parse(JSON.stringify(obj));
    console.log(data);
    const { name, picture, email } = data;   
    console.log(name, picture, email);
    configurarNome(name);
    configurarEmail(email);
    configurarProfilePic(picture);
    configurarLogado(true);
  }

  const responseFailure = (error) => {
    console.log(error.message);
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
        primeiroNome: nome ? nome?.split(" ")[0] : '',
        sobrenome: nome ? nome?.split(" ")[1] : '',
        email: email ? email: '',
        senha: '',
        image: profilePic ? profilePic : '',
        modalidade: ''
    },
    onSubmit: values => {
      if(nome) {
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
    <div className='flex justify-center'>
      <form 
        onSubmit={formik.handleSubmit}
        className='sm:w-1/2 my-gradient flex flex-col'>
        <div className='flex items-center justify-center'>
        <h1 className='font-spartan flex text-white m-6 text-4xl'>{logado ? 'Preencha os dados restantes.': 'Bem-vindo! Preencha os dados a seguir para a matrícula'}</h1>
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
              placeholder='Coloque aqui seu email'
              value={formik.values.email}
              onChange={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
          />
        </div>
           <div className='m-3'>
           <p className='font-bakbak text-left text-white'>Modalidades  <span className='text-red-500'>{formik.touched.modalidade && formik.errors.modalidade}</span> </p>    
           <Select 
           className='p-3 mb-1 react-select'
           id="custom"
           components={animatedComponents}
           placeholder="Selecione..."
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
           <div className='flex justify-center items-center'>
          {nome ?  null :    
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

          }
          </div>
        {loadingAlunos ? <button 
        disabled
        className='button-disabled m-5'>
          Matricular
        </button> : <button 
        type='submit'
        className='button-white m-5'>
          Matricular
        </button>}
        <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
        <GoogleLogin
                  buttonText='Matricular com Google'
                  onSuccess={responseGoogle}
                  onFailure={responseFailure}
                  className='google'
        />
    </GoogleOAuthProvider>
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