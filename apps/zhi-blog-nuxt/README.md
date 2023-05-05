# zhi-blog-nuxt

a blog based on siyuan-note api

## Quick start

### Use docker-compose for deploy <sup>recommended</sup>

```bash
docker compose up --build
```

### Development

Start the development server on http://localhost:3000

```bash
# Make sure you have `shamefully-hoist=true` in `.npmrc` before running pnpm install
nx dev zhi-blog-nuxt
```

### Production

Build the application for production:

```bash
nx build zhi-blog-nuxt
nx preview zhi-blog-nuxt
```

for vercel

```bash
nx vercelBuild zhi-blog-nuxt
```

for siyuan

```bash
nx siyuanBuild zhi-blog-nuxt
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
