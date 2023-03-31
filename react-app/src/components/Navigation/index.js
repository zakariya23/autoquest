import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useHistory } from 'react-router-dom';


function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory()

  return (
    <nav>

      <ul>
        <li>
          <NavLink exact to="/">
          <img src={`https://media.discordapp.net/attachments/533035859214073877/1087508516635418705/image.png`} alt="Logo" className="logo" />
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/search">
          <img src={`https://icones.pro/wp-content/uploads/2021/06/icone-loupe-vert.png`} alt="Logo" className="logo" />
          </NavLink>
        </li>
        {isLoaded && (

               <li>
            <ProfileButton user={sessionUser} />
          </li>



        )}
      </ul>
    </nav>
  );
}

export default Navigation;
