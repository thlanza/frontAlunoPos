import React from 'react'
import Logo from '../../components/Logo/Logo';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { logarAction, resetErro } from '../../redux/slices/alunos/alunosSlices';
import { useEffect } from 'react';

const formSchema = Yup.object({
  email: Yup.string().email("Deve ser um email válido.").required("Email é requerido."),
  senha: Yup.string().required("Senha é requerida."),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
        email: '',
        senha: ''
    },
    onSubmit: values => {
         dispatch(logarAction(values));
    },
    validationSchema: formSchema
  });

  useEffect(() => {
    dispatch(resetErro());
  }, []);


  const alunos = useSelector(state => state?.alunos);
  const { appErr, serverErr, loading, alunoLogado } = alunos;

  if (alunoLogado) navigate("/home");
  
  return (
    <div className='flex'>
      <form onSubmit={formik.handleSubmit} className='sm:w-1/2 my-height sm:flex flex-col'>
        <div className='flex items-center justify-center'>
        <h1 className='font-spartan flex text-white m-6 text-4xl'>Bem-vindo!</h1>
        </div>
        <div className='m-3'>
          {appErr || serverErr ? <h1 className='text-red-500 font-bold'>{appErr} {serverErr}</h1> : null}
          <p className='font-bakbak text-left font-bold'>Email</p>
          <input
            type="email"
            className="relative border-4 p-3 w-full rounded-lg placeholder:p-4" 
            placeholder='Coloque aqui seu email'
            value={formik.values.email}
            onChange={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
          />
        </div>
        <div className='m-3'>
          <p className='font-bakbak text-left font-bold'>Senha</p>
          <input 
              type="password"  
              className="border-4 p-3 w-full rounded-lg placeholder:p-4" 
              placeholder='Coloque aqui sua senha'
              value={formik.values.senha}
              onChange={formik.handleChange('senha')}
              onBlur={formik.handleBlur('senha')}
          />
        </div>
        <button type="submit" className='button-white m-5'>
          Logar
        </button>
        <h5 className='text-white m-5'>
          Não tem registro ainda? <Link className="text-gray-300 hover:underline" to="/registrar">Matricular</Link>
        </h5>
      </form>
      <div className='sm:w-1/2 my-height hidden sm:block'>
        <img className="my-height w-[100%] object-cover object-top" src="./gym-green.png" alt="" />
      </div>
    </div>
  )
}

export default Login