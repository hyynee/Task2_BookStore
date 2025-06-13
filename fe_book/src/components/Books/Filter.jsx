import React, { useEffect, useState } from 'react';

const CheckBox = ({ label, selected, onChange = () => { } }) => (
    <label className="flex items-center gap-2 mb-2 cursor-pointer">
        <input
            type="checkbox"
            checked={selected}
            onChange={(e) => onChange(e.target.checked, label)}
            className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <span className="text-gray-700">{label}</span>
    </label>
);

const RadioButton = ({ label, selected, onChange = () => { } }) => (
    <label className="flex items-center gap-2 mb-2 cursor-pointer">
        <input
            type="radio"
            name="sortOptions"
            checked={selected}
            onChange={(e) => onChange(label)}
            className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
        />
        <span className="text-gray-700">{label}</span>
    </label>
);

const Filter = ({
    authors,
    priceRanges,
    minReviewsOptions,
    sortOptions,
    onFilterChange,
    openFilter,
    setOpenFilter,
    onClearFilters,
    currentFilters
}) => {
    const [selectedFilters, setSelectedFilters] = useState({
        authors: [],
        priceRanges: [],
        minReviews: [],
        sort: ''
    });

    useEffect(() => {
        const newSelectedFilters = {
            authors: currentFilters.author ? [currentFilters.author] : [],
            priceRanges: [],
            minReviews: currentFilters.minReviews ? [currentFilters.minReviews] : [],
            sort: ''
        };
        // Map price range từ currentFilters
        if (currentFilters.minPrice || currentFilters.maxPrice) {
            const minPrice = currentFilters.minPrice || 0;
            const maxPrice = currentFilters.maxPrice;
            if (maxPrice) {
                newSelectedFilters.priceRanges = [`$${minPrice} - $${maxPrice}`];
            } else {
                newSelectedFilters.priceRanges = [`$${minPrice} and above`];
            }
        }
        // Map sort option từ currentFilters
        if (currentFilters.sortBy === 'priceAsc') {
            newSelectedFilters.sort = 'Price: Low to High';
        } else if (currentFilters.sortBy === 'priceDesc') {
            newSelectedFilters.sort = 'Price: High to Low';
        } else if (currentFilters.sortBy === 'popularity') {
            newSelectedFilters.sort = 'Popularity';
        }
        setSelectedFilters(newSelectedFilters);
    }, [currentFilters]);

    const handleFilterChange = (type, value, checked) => {
        onFilterChange(type, value, checked);
    };

    const clearAllFilters = () => {
        onClearFilters();
    };


    const isAuthorSelected = (author) => {
        return currentFilters.author === author;
    };

    const isPriceRangeSelected = (range) => {
        if (!currentFilters.minPrice && !currentFilters.maxPrice) return false;
        const [min, max] = range.replace(/\$/g, '').split(' - ');
        const currentMin = currentFilters.minPrice;
        const currentMax = currentFilters.maxPrice;
        if (max === 'and above') {
            return currentMin == min && !currentMax;
        } else {
            return currentMin == min && currentMax == max;
        }
    };
    const isMinReviewsSelected = (count) => {
        return currentFilters.minReviews == count;
    };

    const isSortSelected = (option) => {
        if (option === 'Price: Low to High') {
            return currentFilters.sortBy === 'priceAsc';
        } else if (option === 'Price: High to Low') {
            return currentFilters.sortBy === 'priceDesc';
        } else if (option === 'Popularity') {
            return currentFilters.sortBy === 'popularity';
        }
        return false;
    };

    return (
        <div className="bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 min-lg:mt-16 sticky top-24">
            <div className={`flex items-center justify-between px-4 py-3 border-b border-gray-300 ${openFilter ? 'bg-gray-100' : ''}`}>
                <p className="text-base font-medium text-gray-800">Filters</p>
                <div className="text-xs cursor-pointer">
                    <span
                        onClick={() => setOpenFilter(!openFilter)}
                        className="lg:hidden text-blue-600 hover:text-blue-800"
                    >
                        {openFilter ? 'HIDE' : 'SHOW'}
                    </span>
                    <span
                        className="hidden lg:block text-red-600 hover:text-red-800"
                        onClick={clearAllFilters}
                    >
                        Clear All
                    </span>
                </div>
            </div>

            {/* Show */}
            <div className={`${openFilter ? 'h-auto' : 'h-0 lg:h-auto overflow-hidden transition-all duration-700'}`}>
                <div className="px-5 pt-5 pb-5 max-h-96 overflow-y-auto">

                    {/* Authors */}
                    {authors && authors.length > 0 && (
                        <div className="mb-6">
                            <p className="text-gray-700 font-medium mb-3">Authors</p>
                            {authors.map((author, index) => (
                                <CheckBox
                                    key={index}
                                    label={author}
                                    selected={isAuthorSelected(author)}
                                    onChange={(checked) => handleFilterChange('author', author, checked)}
                                />
                            ))}
                        </div>
                    )}

                    {/* Price Range */}
                    {priceRanges && priceRanges.length > 0 && (
                        <div className="mb-6">
                            <p className="text-gray-700 font-medium mb-3">Price Range</p>
                            {priceRanges.map((range, index) => (
                                <CheckBox
                                    key={index}
                                    label={range}
                                    selected={isPriceRangeSelected(range)}
                                    onChange={(checked) => handleFilterChange('priceRange', range, checked)}
                                />
                            ))}
                        </div>
                    )}

                    {/* Minimum Reviews */}
                    {minReviewsOptions && minReviewsOptions.length > 0 && (
                        <div className="mb-6">
                            <p className="text-gray-700 font-medium mb-3">Minimum Reviews</p>
                            {minReviewsOptions.map((count, index) => (
                                <CheckBox
                                    key={index}
                                    label={`${count}+ reviews`}
                                    selected={isMinReviewsSelected(count)}
                                    onChange={(checked) => handleFilterChange('minReviews', count, checked)}
                                />
                            ))}
                        </div>
                    )}

                    {/* Sort By */}
                    {sortOptions && sortOptions.length > 0 && (
                        <div className="mb-4">
                            <p className="text-gray-700 font-medium mb-3">Sort By</p>
                            {sortOptions.map((option, index) => (
                                <RadioButton
                                    key={index}
                                    label={option}
                                    selected={isSortSelected(option)}
                                    onChange={(value) => handleFilterChange('sort', value, true)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Filter;