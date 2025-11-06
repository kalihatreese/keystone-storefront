export function verifyLicense(token) { return token?.startsWith("LIC-") ? { tier: "pro", valid: true } : { tier: "none", valid: false }; }
