import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setScrolled(offset > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navigationItems = [
        {
            name: "Products",
            href: "#products",
            dropdownItems: ["Feature 1", "Feature 2", "Feature 3"]
        },
        {
            name: "Solutions",
            href: "#solutions",
            dropdownItems: ["Enterprise", "Business", "Startup"]
        },
        { name: "Pricing", href: "#pricing" },
        { name: "Contact", href: "#contact" }
    ];

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleDropdown = (index) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    return (
        <header>
            <div className="container mx-auto">
                <div className="flex items-center justify-between h-16 md:h-20">
                    <div className="flex-shrink-0">
                        <a href="https://flowbite.com/" class="flex items-center mb-2 border-gray-200 md:pe-4 md:me-4 md:border-e md:mb-0 dark:border-gray-600">
                            <img src="https://flowbite.com/docs/images/logo.svg" class="h-6 me-2" alt="Flowbite Logo" />
                            <span class="self-center text-lg font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                        </a>
                    </div>

                    <div className="hidden md:block">
                        <nav className="ml-10 flex items-center space-x-8">
                            {navigationItems.map((item, index) => (
                                <div key={item.name} className="relative">
                                    <button
                                        onClick={() => item.dropdownItems && toggleDropdown(index)}
                                        className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                                        aria-expanded={activeDropdown === index}
                                        aria-haspopup={item.dropdownItems ? "true" : "false"}
                                    >
                                        {item.name}
                                        {item.dropdownItems && (
                                            <FiChevronDown className="ml-1 h-4 w-4" />
                                        )}
                                    </button>
                                    {item.dropdownItems && activeDropdown === index && (
                                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                            <div
                                                className="py-1"
                                                role="menu"
                                                aria-orientation="vertical"
                                            >
                                                {item.dropdownItems.map((dropdownItem) => (
                                                    <a
                                                        key={dropdownItem}
                                                        href="#"
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        role="menuitem"
                                                    >
                                                        {dropdownItem}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            aria-expanded={isOpen}
                        >
                            {isOpen ? (
                                <FaTimes className="block h-6 w-6" />
                            ) : (
                                <FaBars className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    <nav className="px-2 pt-2 pb-3 space-y-1">
                        {navigationItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                                role="menuitem"
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;