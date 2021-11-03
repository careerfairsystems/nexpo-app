
export const isDev = process.env.NODE_ENV === 'development';
export const isProd = !isDev;
export const backendUrl = isDev ? (process.env.BACKEND_URL || 'https://nexpo-nova.marfor.io/api') : 'https://nexpo.arkadtlth.se/api';
