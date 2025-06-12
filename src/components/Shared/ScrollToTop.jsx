import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // Check if the current path is /services and if there's a 'category' query parameter
    const isServicesWithCategory = location.pathname === '/services' && new URLSearchParams(location.search).has('category');

    // Only scroll to top if not navigating to /services with a category filter
    if (!isServicesWithCategory) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); // Use 'instant' to avoid conflicting smooth scrolls
    }
  }, [location]); // Depend on location to re-run when URL changes

  return null;
} 