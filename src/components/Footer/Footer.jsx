import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="flex justify-center items-center py-4 font-primary text-gray-700 dark:text-gray-300 bg-normalbg dark:bg-black">
      Built with
      <FontAwesomeIcon
        icon={faHeart}
        className="text-primary dark:text-primary mx-1 animate-pulse"
        aria-hidden="true"
      />
      by
      <a
        href="https://github.com/Hosurshameer"
        target="_blank"
        rel="noreferrer"
        className="text-primary dark:text-primary font-semibold px-1 transition-colors duration-300 hover:text-dark dark:hover:text-[#0080a3]"
      >
        Sameer sandy
      </a>
    </footer>
  );
}
