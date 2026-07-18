 
import React from 'react';
import { Navigate, useOutletContext } from 'react-router-dom';

const PremiumRouteGuard = ({ children }) => {
    const { subscriptionTier } = useOutletContext();

    // Check if the user has a premium subscription
    const hasPremiumAccess = subscriptionTier === 'premium';

    if (!hasPremiumAccess) {
        // Redirect to a "no access" or "upgrade" page if the user doesn't have premium access
        return <Navigate to="/upgrade" replace />;
    }

    // Render the children if the user has premium access
    return <>{children}</>;
};

export default PremiumRouteGuard;
