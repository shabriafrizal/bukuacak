# Bukuacak

Bukuacak is a small web app for discovering books by chance. Press **Acak Buku** and
get a random recommendation, or browse the whole collection with filters for genre,
year, keyword and sort order.

It is the front end for the [Bukuacak API](https://github.com/shabriafrizal/bukuacak-api)
and is built with React, Vite and Tailwind CSS.

## Live

- App: <https://bukuacak.shabsolute.tech> (also reachable at <https://bukuacak.vercel.app>)
- API: <https://srv.shabriafrizal.art/bukuacak/api/v1>

## Features

- **Random book** — one click, one recommendation, optionally narrowed by genre,
  year or keyword.
- **Collection browser** — filter by genre/year/keyword, sort by newest, oldest,
  title, or price, with pagination and a result counter.
- **Book detail page** — cover, author, publisher, ISBN, price, page count, and a
  link to the store.
- **API documentation** — every endpoint is listed with a copyable example.
- **Small niceties** — per-page SEO tags and Open Graph data, keyboard-accessible
  filters and pagination, lazy-loaded covers with a fallback image, skeleton
  loaders, and clear error states when the API is unreachable.

## Tech stack

| Layer      | Choice                                   |
| ---------- | ---------------------------------------- |
| UI         | React 18                                 |
| Routing    | React Router 7                           |
| Build tool | Vite 6                                   |
| Styling    | Tailwind CSS 3 + custom Poppins webfont  |
| Linting    | ESLint 9 (flat config)                   |

## Getting started

Requirements: **Node.js 18 or newer** and npm.

```bash
git clone https://github.com/shabriafrizal/bukuacak.git
cd bukuacak
npm install
npm run dev
```

Vite prints the dev URL, by default <http://localhost:5173>.

## Configuration

The app works with no configuration: it points at the hosted API by default.
To use your own API instance, copy `.env.example` to `.env` and change the values.

| Variable            | Default                                          | Purpose                                        |
| ------------------- | ------------------------------------------------ | ---------------------------------------------- |
| `VITE_API_BASE_URL` | `https://srv.shabriafrizal.art/bukuacak/api/v1`  | Base URL of the Bukuacak API.                  |
| `VITE_SITE_URL`     | `https://bukuacak.shabsolute.tech`                    | Public origin used for canonical/OG URLs.      |

Both are read in `src/config/api.js` and `src/config/seo.js`.

## Scripts

| Command           | What it does                                      |
| ----------------- | ------------------------------------------------- |
| `npm run dev`     | Start the Vite dev server with HMR.               |
| `npm run build`   | Build the production bundle into `dist/`.         |
| `npm run preview` | Serve the production build locally.               |
| `npm run lint`    | Run ESLint over the project.                      |

## Project structure

```
src/
├── config/
│   ├── api.js          # API base URL, URL builder, fetchJson + ApiError
│   └── seo.js          # Site URL, name and default description/image
├── routes/
│   ├── Acak.jsx        # Random book page (home)
│   ├── Buku.jsx        # Collection browser with filters + pagination
│   ├── Detail.jsx      # Single book page
│   ├── API.jsx         # API documentation page
│   ├── Tentang.jsx     # About page
│   └── NotFound.jsx    # 404 page
├── BookGrid.jsx        # Book card used in the collection grid
├── BookDetail.jsx      # Book detail layout
├── BookAcakDetail.jsx  # Random book reveal card
├── Seo.jsx             # Per-page document head management
└── ...                 # Filters, pagination, navbar, footer, loader
```

## API

Base URL: `https://srv.shabriafrizal.art/bukuacak/api/v1`

| Endpoint                                                                | Description                          |
| ----------------------------------------------------------------------- | ------------------------------------ |
| `GET /book?sort=&page=&year=&genre=&keyword=`                            | List books, with optional filters.   |
| `GET /book/{_id}`                                                        | One book by id.                      |
| `GET /book?_id={_id}`                                                    | One book by id as a query parameter. |
| `GET /random_book?year=&genre=&keyword=`                                 | One random book.                     |
| `GET /stats/genre`                                                       | Number of books per genre.           |

`sort` accepts `newest`, `oldest`, `titleAZ`, `titleZA`, `priceLowHigh`,
`priceHighLow`.

## Deployment

`vercel.json` rewrites every path to `index.html` so client-side routes work on
direct visits. Import the repository in Vercel (framework: Vite, build command
`npm run build`, output directory `dist`) and set the environment variables from
the table above if you need non-default values.

## Contributing

Issues and pull requests are welcome.

1. Fork the repository and create a branch: `git checkout -b feature/my-change`.
2. Make the change and run `npm run lint && npm run build`.
3. Commit, push, and open a pull request describing the change.

## License

MIT — see [LICENSE](LICENSE).
