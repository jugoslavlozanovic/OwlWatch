import {Link} from 'react-router-dom';
import "./main.scss";

export default function NotFoundPage () {
    return (
      <>        
          <p>Page not found.</p>
          <ul>
            <li>
              <Link to="/home">Click here </Link> to go to the main page.
            </li>
          </ul>        
      </>
    );
}