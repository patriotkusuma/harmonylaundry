/** @type {import('next').NextConfig} */
const nextConfig = {
    logging: {
        fetches:{
            fullUrl: true
        }
    },
    images: {
        remotePatterns: [
        {
            protocol: "https",
            hostname: "admin.harmonylaundry.my.id",
            pathname: "/storage/**",
        },
        {
            protocol: "https",
            hostname: "harmonylaundrys.com",
        },
        {
            protocol: "https",
            hostname: "go.harmonylaundry.my.id",
        },
        ],
    },
    async redirects() {
        return [
            // 1. Membersihkan URL aneh akibat crawler (contoh: /blog/x/blog/x)
            {
                source: '/blog/:slug*/blog/:slug2*',
                destination: '/blog/:slug*',
                permanent: true,
            },
            // 2. Redirect dari URL lama (/posts/...) ke URL baru (/blog/...)
            {
                source: '/posts/:slug*',
                destination: '/blog/:slug*',
                permanent: true,
            }
        ];
    },
};

export default nextConfig;
