import React from 'react';
import {BrowserRouter as Router, Routes as Switch, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Admin from './components/Admin';
import {auth} from './firebase';
import Reset from './components/Reset';

function App() {

  const [firebaseUser, setFirebaseUser] = React.useState(false);

  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        setFirebaseUser(user)
      } else {
        setFirebaseUser(null)
      }
    })
  }, [])

  return firebaseUser !== false ? (
    <Router>
      <div className="container">
        <Navbar firebaseUser={firebaseUser} />
        <Switch>
          <Route path='/login' element={<Login />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/reset' element={<Reset />} />
          <Route path='/' exact />
        </Switch>
      </div>
    </Router>
  ) : (
    <div className='container'>
      <span className="loader"></span>
    </div>
  )
}

export default App;
