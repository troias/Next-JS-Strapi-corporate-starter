// const dynamicInstaDomain = media_url.replace(/^[^.]*/, 'instagram.fakl1-3.fna.fbcdn.net')
// `${dynamicInstaDomain = instaDomain.replace(/^[^.]*/, 'instagram.fakl1-3.fna.fbcdn.net'}` ,
// console.log(dynamicInstaDomain)
// const instaDomain = `instagram.fakl1-3.fna.fbcdn.net`

module.exports = {
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
  },
  images: {
    domains: ["instagram.fakl1-2.fna.fbcdn.net", "localhost", "images.unsplash.com", "instagram.fakl1-4.fna.fbcdn.net", "instagram.fakl1-3.fna.fbcdn.net" ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}
