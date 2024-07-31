export function getNumberAfterBrowse(pathname) {
    const parts = pathname.split('/');
  
    // Find the index of "browse"
    const browseIndex = parts.indexOf('browse');
  
    // If "browse" exists and there's a number after it, return that number
    if (browseIndex !== -1 && parts[browseIndex + 1]) {
      return parts[browseIndex + 1];
    }
  
    // Return null or undefined if "browse" is not found or if there's no number after it
    return null;
  }
  