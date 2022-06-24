import React from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import Firestore from './Firestore';

const Admin = () => {

    const params = useNavigate();

    const [user, setUser] = React.useState(null)

    React.useEffect(() => {
        if(auth.currentUser){
            console.log('existe un usuario');
            setUser(auth.currentUser);
        } else {
            console.log('no existe el usuario');
            params('/login');
        }
    }, [params])

  return (
    <div className='mt-5'>
        <h3 className='text-center'>Ruta Protegida</h3>
        {
            user && (
                <Firestore user={user} />
            )
        }
    </div>
  )
}

export default Admin