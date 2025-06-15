import React, { useEffect, useState } from 'react';
import { BsGear } from 'react-icons/bs';
import { HiOutlineShoppingBag, HiOutlineUser } from 'react-icons/hi';
import { HiBars3BottomRight } from 'react-icons/hi2';
import { IoClose } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import CartDraw from '../Layout/CartDraw';
import Search from './Search';

const Navbar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Books', path: '/books' },
        { name: 'Featured', path: '/featured' },
        { name: 'Bestsellers', path: '/bestsellers' },
    ];

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [drawerOpen, setCartDrawerOpen] = useState(false);
    const location = useLocation();

    const { user } = useSelector((state) => state.auth);
    const { cart } = useSelector(state => state.cart);
    console.log(cart)

    const cartItemsCount = cart?.items?.reduce((total, prod) => total + prod.quantity, 0) || 0;

    useEffect(() => {
        if (location.pathname !== '/') {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    const toggleNavDrawer = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleCardDrawer = () => {
        setCartDrawerOpen(!drawerOpen);
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled
                    ? 'bg-gray-800/90 shadow-md text-white backdrop-blur-lg py-3 md:py-4'
                    : 'bg-transparent py-4 md:py-6'
                    }`}
            >
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <span className={`text-2xl font-medium ${isScrolled ? 'text-amber-300' : 'text-white'}`}>
                        AnhHuy
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-4 lg:gap-8">
                    {navLinks.map((link, i) => (
                        <Link
                            key={i}
                            to={link.path}
                            className={`group flex flex-col gap-0.5 text-sm font-medium uppercase ${isScrolled ? 'text-amber-300' : 'text-white'
                                } hover:text-black`}
                        >
                            {link.name}
                            <div
                                className={`${isScrolled ? 'bg-gray-700' : 'bg-white'
                                    } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
                            />
                        </Link>
                    ))}
                </div>

                {/* Desktop Right */}
                <div className="flex items-center gap-4">
                    {user?.role === 'admin' && (
                        <Link to="/admin" className="hover:text-black">
                            <BsGear
                                className={`size-6 ${isScrolled ? 'text-amber-300' : 'text-white'}`}
                            />
                        </Link>
                    )}
                    <Link to="/profile" className="hover:text-black">
                        <HiOutlineUser
                            className={`size-6 ${isScrolled ? 'text-amber-300' : 'text-white'}`}
                        />
                    </Link>
                    <button
                        className="relative hover:text-black"
                        onClick={toggleCardDrawer}
                    >
                        <HiOutlineShoppingBag
                            className={`size-6 ${isScrolled ? 'text-amber-300' : 'text-white'}`}
                        />
                        {cartItemsCount > 0 && (
                            <span className="absolute -top-1 -right-2 bg-orange-400 text-white text-xs rounded-full px-2 py-0.5">
                                {cartItemsCount}
                            </span>
                        )}
                    </button>
                    <div className="overflow-hidden">
                        <Search />
                    </div>
                    <button
                        onClick={toggleNavDrawer}
                        className="md:hidden hover:text-black"
                    >
                        <HiBars3BottomRight
                            className={`size-6 ${isScrolled ? 'text-amber-300' : 'text-white'}`}
                        />
                    </button>
                </div>
            </nav>

            {/* Cart Drawer */}
            <CartDraw drawerOpen={drawerOpen} toggleCardDrawer={toggleCardDrawer} />

            {/* Mobile Menu */}
            <div
                className={`fixed top-0 left-0 h-full w-3/4 sm:w-1/2 md:w-1/3 bg-white shadow-lg z-50 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:hidden`}
            >
                <div className="flex justify-end p-4">
                    <button onClick={toggleNavDrawer}>
                        <IoClose className="size-6 text-gray-600" />
                    </button>
                </div>
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-4">Menu</h2>
                    <nav className="space-y-4">
                        {navLinks.map((link, i) => (
                            <Link
                                key={i}
                                to={link.path}
                                onClick={toggleNavDrawer}
                                className="block text-gray-600 hover:text-black"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Navbar;