"use client";

import { useEffect } from "react";

/**
 * BootstrapClient component for initializing Bootstrap JavaScript functionality.
 * This component uses the useEffect hook to load the Bootstrap JavaScript bundle.
 * @returns {null} Returns null, as this component doesn't render any visible content.
 */
function BootstrapClient(): null {
  // Use the useEffect hook to run the Bootstrap JavaScript initialization
  useEffect(() => {
    // Require the Bootstrap JavaScript bundle using CommonJS syntax
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  // Return null, as this component doesn't render any visible content
  return null;
}

// Export the BootstrapClient component as the default export
export default BootstrapClient;
