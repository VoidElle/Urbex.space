/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        formats: ["image/webp"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "www.silverdisc.co.uk",
                port: "",
                pathname: "/**/**/**/**/**",
            },
            {
                protocol: "https",
                hostname: "placehold.co",
                port: "",
                pathname: "/**/**/**/**/**",
            }
        ]
    }
};

export default nextConfig;
