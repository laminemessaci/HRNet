import { FaBackward } from 'react-icons/fa';
import { Link } from 'react-router-dom';

/**
 * *Error Page
 * @returns {JSX.Element}
 */
const ErrorPage: React.FC = (): JSX.Element => {
  return (
    <main className=" bg-green-500 w-full h-screen flex justify-center flex-col">
      <p className="text-9xl text-white font-extrabold flex justify-center">
        404
      </p>

      <p className="text-2xl text-white font-extrabold flex justify-center">
        Oups ! The page you are requesting does not exist.
      </p>

      <Link
        className="text-lg text-white font-extrabold flex justify-center mt-11"
        to="/"
      >
        <FaBackward className="w-8 h-8 mx-2" /> Back to the home page
      </Link>
    </main>
  );
};

export default ErrorPage;
