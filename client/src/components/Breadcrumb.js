import React from 'react';
import { Link } from 'react-router-dom';

function Breadcrumb({ match }) {
  const urlArray = match.url.split('/'); // GET URL ARRAY
  const lastUrl = urlArray.at(-1).split('&&')[0]; // REMOVE THE LAST URL'S ID IN THE ARRAY
  const path = urlArray.slice(1, urlArray.length - 1); // REMOVE THE FIRST EMPTY URL
  path.push(lastUrl); // ADD THE LAST URL IN THE PATH ARRAY

  const getUrl = length => {
    let url = [];
    for (let i = 0; i < length; i++) {
      url.push(path[i]); // ADD PATH ELEMENT BASE ON THE LENGTH
    }
    return url.join('/'); // CREATE THE STRING OF THE URL SEPARATED BY '/'
  };

  return (
    <ul className='breadcrumb'>
      <li className='breadcrumb__item'>
        <Link to='/'>Home</Link>
      </li>
      {path &&
        path.map((p, index) => (
          <li className='breadcrumb__item' key={index}>
            <Link to={`/${getUrl(index + 1)}`}>{p}</Link>
          </li>
        ))}
    </ul>
  );
}

export default Breadcrumb;
