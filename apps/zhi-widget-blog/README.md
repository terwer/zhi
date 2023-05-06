# zhi-widget-blog

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
nx dev zhi-widget-blog
```

### Production

Build the application for production:

```bash
nx build zhi-widget-blog
nx preview zhi-widget-blog
```

for vercel

```bash
nx vercelBuild zhi-widget-blog
```

for siyuan

```bash
nx siyuanBuild zhi-widget-blog
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
