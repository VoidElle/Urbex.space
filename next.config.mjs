/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ["image/webp"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "www.silverdisc.co.uk",
                port: "",
                pathname: "/**/**/**/**/**",

            }
        ]
    }
};

export default nextConfig;
