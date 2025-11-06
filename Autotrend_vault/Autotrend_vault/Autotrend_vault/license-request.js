export function getLicenseKey(){
  if (typeof window==="undefined") return null;
  return localStorage.getItem("KSL_LICENSE") || null;
}
export function setLicenseKey(k){
  if (typeof window==="undefined") return;
  localStorage.setItem("KSL_LICENSE", k);
}
export function requireLicense(){
  const k = getLicenseKey();
  if(!k || !/^KSL-\d{10}$/.test(k)) throw new Error("License invalid or missing");
  return k;
}
