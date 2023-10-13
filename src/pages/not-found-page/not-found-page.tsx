import { Link } from 'react-router-dom';
import './not-found-style.css';

export default function NoteFoundPage(): JSX.Element {
  return (
    <>
      <h1>404</h1>
      <h2>Page not found</h2>
      <Link to='/'>Go to the main page</Link>
    </>
  );
}
