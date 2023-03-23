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
    case '#/registro':{ 
      return divRoot.appendChild(components.registro()); 
  }
    default:{ 
        return divRoot.appendChild(components.registro()); 
    }
		// break;
  }
  // console.log(divRoot);
  // console.log(route)
};

export { changeView };