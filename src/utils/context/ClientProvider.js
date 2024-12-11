'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { AuthProvider } from '@/utils/context/authContext';
import ViewDirectorBasedOnUserAuthStatus from '@/utils/context/ViewDirector';
import { SearchProvider } from '@/utils/context/SearchContext'; // Import SearchProvider for global search state management

/**
 * The ClientProvider component is used to encapsulate all client-side context providers and components
 * that rely on client-side React hooks, such as AuthProvider and SearchProvider.
 * It ensures proper management of client-side state and separation of client-side logic from server-side rendering.
 */
function ClientProvider({ children }) {
  return (
    <AuthProvider>
      <SearchProvider>
        {/* ViewDirectorBasedOnUserAuthStatus manages the view based on authentication state */}
        <ViewDirectorBasedOnUserAuthStatus>{children}</ViewDirectorBasedOnUserAuthStatus>
      </SearchProvider>
    </AuthProvider>
  );
}

// Prop validation for ClientProvider
ClientProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ClientProvider;
