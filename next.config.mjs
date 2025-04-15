/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        asyncWebAssembly: true,  // Enable WebAssembly support
        syncWebAssembly: true,   // Make sure WebAssembly files are bundled
      };
  
      return config;
    },
  };
  
  export default nextConfig;
  