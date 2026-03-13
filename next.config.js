/** @type {import('next').NextConfig} */
const repoName = process.env.NEXT_PUBLIC_BASE_PATH || '';
const useStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true';

const nextConfig = {
  output: useStaticExport ? 'export' : undefined,
  trailingSlash: true,
  basePath: repoName ? `/${repoName}` : '',
  assetPrefix: repoName ? `/${repoName}/` : '',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
