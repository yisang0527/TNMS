import { FooterLinks } from "./FooterLinks.jsx";
import {Link} from "react-router-dom"

function Footer() {
  return (
    <footer className="footer">
      <ul>
        {FooterLinks.map((v, i) => (
          <li key={i}>
            {v.external ? (
              <a href={v.link} target="_blank" rel="noopener noreferrer">
                {v.name}
              </a>
            ) : (
              <Link to={v.link}>{v.name}</Link>
            )}
          </li>
        ))}
      </ul>
    </footer>
  );
}

export default Footer;