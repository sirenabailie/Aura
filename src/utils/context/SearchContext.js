import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState(''); // Global search query state

  // Use useMemo to memoize the value object
  const value = useMemo(() => ({ searchQuery, setSearchQuery }), [searchQuery, setSearchQuery]);

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

// Add PropTypes validation for children
SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
