// export const setAuthCookie = (tokenName, tokenValue, days = 7) => {
//   const date = new Date();
//   date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
//   const expires = "; expires=" + date.toUTCString();
  
//   // Dynamically extract root domain to handle local dev vs production subdomains
//   const host = window.location.hostname;
//   const domainParts = host.split('.');
//   const domain = domainParts.length > 2 
//     ? `; domain=.${domainParts.slice(-2).join('.')}` 
//     : '';

//   document.cookie = `${tokenName}=${tokenValue}${expires}; path=/${domain}; Secure; SameSite=Lax`;
// };


export function setAuthCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  
  // The magic trick: Adding domain=.docapp.co.in makes it available to all subdomains
  // Enforcing Secure and SameSite=None/Lax helps with modern cross-site cookie policies
  document.cookie = `${name}=${value || ""}${expires}; path=/; domain=.docapp.co.in; SameSite=Lax; Secure`;
}