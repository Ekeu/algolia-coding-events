<div align="center">
  <a href="https://algolia-coding-events.vercel.app/">
    <img alt="codingLab" src="./public/assets/images/codingLab-logo.svg" height="150px" />
  </a>
</div>

<br />

<div align="center">
  <strong style="color:#7C3AED; font-family: 'Poppins'; font-size: 3em; letter-spacing: -4px;">CodingLab</strong>
  <br />
</div>

---

## What is it? 🧐

CodingLab is a project I developed from ground to step up my technical skills in `NextJS` and take part in [Algolia's Coding Contest](https://github.com/algolia/algolia-coding-contest). It's all about a simple project to create and publish events linked to software development.

---

## Stack Used

I used the following technologies:

1. [NextJS](https://nextjs.org/) as frontend framework
2. [Tailwind](https://tailwindui.com/) as my css framework
3. [Algolia's Autocomplet Search](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/autocomplete/js/).
4. [Strapi](https://strapi.io/) as my CMS
5. [Mapbox](https://www.mapbox.com/). To show events locations when selecting an event. Just wanted to try something else other than Google Maps
6. [Google Maps API](https://developers.google.com/maps). I mainly used the Places and Geocoding APIs
## Want to try it out?

You can see it working online by visiting [CodingLab](https://algolia-coding-events.vercel.app/)

##### OR

1. First get the Strapi Backend [here](https://github.com/Ekeu/algolia-coding-events-strapi-backend) and run it.

2. Create and add in your `.env.local` your Mapbox, Algolia and Google API keys

```env
NEXT_PUBLIC_GOOGLE_API_KEY='xxxxxxxxxx'
NEXT_PUBLIC_ALGOLIA_ADMIN_KEY='xxxxxxxxxx'
NEXT_PUBLIC_ALGOLIA_APP_ID='xxxxxxxxxx'
NEXT_PUBLIC_ALGOLIA_INDEX_NAME='xxxxxxxxxx'
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY='xxxxxxxxxx'
NEXT_PUBLIC_MAPBOX_API_TOKEN='xxxxxxxxxx'
```

3. Run the server

```npm
npm run dev

or

yarn dev
```

4. Open your browser and go to http://localhost:3000 to see the result.
