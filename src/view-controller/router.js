/* eslint-disable no-tabs */
import { components } from '../view/components.js';

const changeView = (route) => {
  const divRoot = document.getElementById('root');
  divRoot.innerHTML = '';
  switch (route) {
    case '#/home':{ 
        return divRoot.appendChild(components.home()); 
    }
    case '#/adios':{ 
        return divRoot.appendChild(components.adios()); 
    }
    default:{ 
        return divRoot.appendChild(components.home()); 
    }
		// break;
  }
  // console.log(divRoot);
  // console.log(route)
};

export { changeView };