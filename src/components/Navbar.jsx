import { useEffect, useState } from "react";
import { FaAlignRight } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { navLinks } from "../constants/data";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const NavItems = ({ activeSection }) => {
  const { t } = useTranslation();

  return (
    <ul className="flex flex-col items-center gap-4 sm:flex-row md:gap-6 relative z-20">
      {navLinks.map(({ id, href, key }) => {
        const isActive = activeSection === href;

        return (
          <motion.li
            key={id}
            className={`font-generalsans max-sm:hover:bg-black-500 max-sm:w-full max-sm:rounded-md py-2 max-sm:px-5 ${
              isActive ? "text-[#ff9720] font-bold" : "text-white"
            }`}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
        <motion.a
          href={href}
          className="text-lg md:text-base"
          style={{ color: isActive ? "#ff9720" : "white" }}
          whileHover={{ color: "#ff9720" }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {t(key)}
        </motion.a>

          </motion.li>
        );
      })}
    </ul>
  );
};


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("1");
  const { i18n } = useTranslation();
  const toggleLanguage = () => {
    const newLang = i18n.language === "es" ? "en" : "es";
    i18n.changeLanguage(newLang);
  };

  const handleSectionHighlight = () => {
  const sections = document.querySelectorAll("section[id]"); 

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        setActiveSection(`#${section.id}`);
      }
    });
  };
  useEffect(()=>{
    handleSectionHighlight();
  },[])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      //Close mobile menu on scroll.
      if (isOpen) {
        setIsOpen(false);
      }
      handleSectionHighlight();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };
  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isOpen
            ? "bg-[rgba(26,25,30,0.8)] bg-[#1a191e] border-b-2 border-[#185a9d] border-opacity-100 shadow-md"
            : "bg-transparent border-b-2 border-[#185a9d] border-opacity-0"
        }`}
      >
        <div className="mx-auto px-6 sm:px-8 md:px-10">
          <div className="flex justify-between reverse  items-center py-5">
                <button
              onClick={toggleLanguage}
              className="bg-gray-200 flex flex-row justify-items-center items-center gap-2 text-white text-sm border border-white px-3 py-1 rounded hover:bg-white hover:text-black transition"
            >
              <img src="icons/www.svg" width={24}/>
              <span className="text-black">{i18n.language === "es" ? "ES" : "EN"}</span>
            </button>
            <button
              onClick={toggleMenu}
              className="text-white hover:text-[#ff9720] focus:outline-none sm:hidden flex"
              aria-label="Open Menu"
            >
              {isOpen ? (
                <FaTimes color="white" size={25} />
              ) : (
                <FaAlignRight color="white" size={25} />
              )}
            </button>
            <nav className="sm:flex hidden">
            <NavItems activeSection={activeSection} />
            </nav>
          </div>
        </div>

        <div
          className={`absolute left-0 right-0 bg-[#1a191e] transition-all duration-300 ease-in-out overflow-hidden z-20 mx-auto sm:hidden block ${
            isOpen ? "max-h-screen" : "max-h-0"
          }`}
        >
          <nav className="p-5">
          <NavItems activeSection={activeSection} />
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
