module.exports = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  env: {
    GOOGLE_PLACES_API_KEY: process.env.GOOGLE_PLACES_API_KEY,
    NEXT_ALGOLIA_ADMIN_KEY: process.env.NEXT_ALGOLIA_ADMIN_KEY,
    NEXT_ALGOLIA_APP_ID: process.env.NEXT_ALGOLIA_APP_ID,
    NEXT_ALGOLIA_INDEX_NAME: process.env.NEXT_ALGOLIA_INDEX_NAME,
    NEXT_ALGOLIA_SEARCH_KEY: process.env.NEXT_ALGOLIA_SEARCH_KEY,
  },
};
