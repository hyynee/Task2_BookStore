import React, { useState } from 'react';
import { IoSearch } from 'react-icons/io5';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        // No API, so just log the search term for now
        console.log('Search term:', searchTerm);
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search aston villa"
                className="border rounded-full px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button type="submit" className="hover:text-black">
                <IoSearch className="size-5 text-gray-700" />
            </button>
        </form>
    );
};

export default Search;