import React from 'react'
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom'

const Reset = () => {

    const params = useNavigate();

    const [email, setEmail ] = React.useState('');
    const [error, setError] = React.useState(null);

    const procesarDatos = e => {
        e.preventDefault();
        if(!email.trim()){
            // console.log('Ingrese email');
            setError('Ingrese email');
            return;
        }

        setError(null);

        recuperar()
    }

    const recuperar = React.useCallback(async() => {
        try {
            await auth.sendPasswordResetEmail(email);
            console.log('correo enviado');
            params('/login')
        } catch (error) {
            console.log(error.message);
            setError(error.message)
        }
    }, [email, params])

  return (
    <div className='mt-5'>
        <h3 className='text-center'>
            Reiniciar Contraseña
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
                    <button
                        type='submit'
                        className="btn btn-dark btn-lg mb-2"
                    >
                        Reiniciar contraseña
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Reset