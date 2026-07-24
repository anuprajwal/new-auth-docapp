export function setAuthCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }

  const hostname = window.location.hostname;
  let cookieString = `${name}=${encodeURIComponent(value || "")}${expires}; path=/`;

  // 1. Handle Domain: Only apply cross-subdomain if we are actually on docapp.co.in
  if (hostname.includes('docapp.co.in')) {
    cookieString += "; domain=.docapp.co.in";
  }

  // 2. Handle Security: Browsers BLOCK "Secure" cookies on plain http://
  // (Except for 'localhost', which modern browsers treat as securely partitioned)
  if (window.location.protocol === 'https:') {
    cookieString += "; Secure; SameSite=Lax";
  } else {
    // Fallback for local HTTP development networks (e.g., http://192.168.x.x)
    cookieString += "; SameSite=Lax";
  }

  console.log("Attempting to write cookie:", cookieString); // Debug log
  document.cookie = cookieString;
}