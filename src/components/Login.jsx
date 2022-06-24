import React from 'react'
import { auth, db } from '../firebase'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const params = useNavigate()

    const [email, setEmail ] = React.useState('');
    const [pass, setPass ] = React.useState('');
    const [error, setError] = React.useState(null);

    const [esRegistro, setEsRegistro] = React.useState(true);

    const procesarDatos = e => {
        e.preventDefault();
        if(!email.trim()){
            // console.log('Ingrese email');
            setError('Ingrese email');
            return;
        }
        if(!pass.trim()){
            // console.log('Ingrese password');
            setError('Ingrese password');
            return;
        }
        if(pass.length < 6){
            // console.log('password mayor a 6 caracteres');
            setError('Password de 6 caracteres o más')
            return
        }

        console.log('pasando todas las validaciones');
        setError(null);

        if (esRegistro) {
            registrar()
        } else {
            login()
        }
    }

    const login = React.useCallback(async() => {
        try {
            const res = await auth.signInWithEmailAndPassword(email, pass);
            console.log(res.user);
            setEmail('');
            setPass('');
            setError(null);
            params('/admin');
        } catch (error) {
            console.log(error);
            if (error.code === 'auth/invalid-email'){
                setError('Email no válido')
            }
            if (error.code === 'auth/user-not-found'){
                setError('Email no registrado')
            }
            if (error.code === 'auth/wrong-password'){
                setError('Contraseña incorrecta')
            }
        }
    }, [email, pass, params])

    const registrar = React.useCallback(async() => {

        try {
            const res = await auth.createUserWithEmailAndPassword(email, pass)
            console.log(res.user);
            await db.collection('usuarios').doc(res.user.email).set({
                email: res.user.email,
                uid: res.user.uid
            });
            await db.collection(res.user.uid).add({
                name:'Tarea de ejemplo',
                fecha: Date.now()
            });
            setEmail('');
            setPass('');
            setError(null);
            params('/admin');
        } catch (error) {
            console.log(error.message);
            if (error.code === 'auth/invalid-email'){
                setError('Email no válido')
            }
            if (error.code === 'auth/email-already-in-use') {
                setError('Email ya utilizado')
            }
        }

    }, [email, pass, params])

  return (
    <div className='mt-5'>
        <h3 className='text-center'>
            {
                esRegistro ? 'Registro de Usuario' : 'Login de Acceso'
            }
        </h3>
        <hr/>
        <div className="row justify-content-center">
            <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                <form onSubmit={procesarDatos} className='d-grid'>
                    {
                        error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )
                    }
                    <input 
                        type="email" 
                        className="form-control mb-2" 
                        placeholder='Ingrese un email'
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />
                    <input 
                        type="password" 
                        className="form-control mb-2" 
                        placeholder='Ingrese un password'
                        onChange={e => setPass(e.target.value)}
                        value={pass}
                    />
                    <button
                        type='submit'
                        className="btn btn-dark btn-lg mb-2"
                    >
                        {
                            esRegistro ? 'Registrate' : 'Acceder'
                        }
                    </button>
                    <button
                        type='button'
                        className="btn btn-info btn-sm text-white"
                        onClick={() => setEsRegistro(!esRegistro)}
                    >
                        {
                            esRegistro ? '¿Ya estas registrado?' : '¿No tienes cuenta?'
                        }
                    </button>
                    {
                        !esRegistro ? (
                            <button
                                type='nutton'
                                className="btn btn-danger btn-sm mt-2"
                                onClick={() => params('/reset')}
                            >
                                Recuperar contraseña
                            </button>
                        ) : null
                    }
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login