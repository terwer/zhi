# zhi-blog

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
pnpm install -F zhi-blog
pnpm dev -F zhi-blog
```

### Production

Build the application for production:

```bash
pnpm build -F zhi-blog
pnpm preview -F zhi-blog
```

for vercel:

```bash
pnpm vercelBuild -F zhi-blog
```

for siyuan

```bash
pnpm siyuanBuild -F zhi-blog
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.