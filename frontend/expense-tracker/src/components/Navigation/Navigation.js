import React from "react";
import styled from 'styled-components';
import avatar from '../../img/avatar.png';
import { menuItems } from "../../utils/menuItems";
import { signout } from "../../utils/Icons";

function Navigation({ active, setActive }) {
  return (
    <NavStyled>
      <div className="user-con">
        <img src={avatar} alt="avatar" />
        <div className="text">
          <h2>Karan</h2>
          <p>Your Money</p>
        </div>
      </div>
      <ul className="menu-items">
        {menuItems.map((item) => {
          return (
            <li 
              key={item.id}
              onClick={() => setActive(item.id)}
              className={active === item.id ? 'active' : ''}
            >
              {item.icon}
              <span>{item.title}</span>
            </li>
          );
        })}
      </ul>
      <div className="bottom-nav">
        <li>
          {signout} Sign Out
        </li>
      </div>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
  padding: 1.5rem 1rem;
  width: 300px; /* Adjusted width */
  height: 100%;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #FFFFFF;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem; /* Adjusted gap */

  .user-con {
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      width: 60px; /* Adjusted size */
      height: 60px; /* Adjusted size */
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border: 2px solid #FFFFFF;
      padding: .2rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }
    h2 {
      color: rgba(34, 34, 96, 1);
      font-size: 1.2rem; /* Adjusted font size */
    }
    p {
      color: rgba(34, 34, 96, .6);
      font-size: 0.9rem; /* Adjusted font size */
    }
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    li {
      display: flex; /* Changed to flex */
      align-items: center;
      margin: .5rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all .4s ease-in-out;
      color: rgba(34, 34, 96, .6);
      padding-left: 1rem;
      position: relative;
      i {
        color: rgba(34, 34, 96, 0.6);
        font-size: 1.4rem;
        transition: all .4s ease-in-out;
        margin-right: 1rem; /* Added margin-right for spacing */
      }
      span {
        flex: 1; /* Ensures text takes up remaining space */
      }
    }
  }

  .bottom-nav {
    li {
      display: flex; /* Ensures sign out aligns correctly */
      align-items: center;
      cursor: pointer;
      transition: all .4s ease-in-out;
      color: rgba(34, 34, 96, .6);
      padding-left: 1rem;
      i {
        color: rgba(34, 34, 96, 0.6);
        font-size: 1.4rem;
        transition: all .4s ease-in-out;
        margin-right: 1rem; /* Added margin-right for spacing */
      }
    }
  }

  .active {
    color: rgba(34, 34, 96, 1) !important;
    i {
      color: rgba(34, 34, 96, 1) !important;
    }
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: #222260;
      border-radius: 0 10px 10px 0;
    }
  }
`;

export default Navigation;
