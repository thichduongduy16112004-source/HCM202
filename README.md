# HCM202 — Độc lập dân tộc và chủ nghĩa xã hội

Website scrollytelling phục vụ bài thuyết trình môn HCM202. Dự án sử dụng React, TypeScript, Vite, Tailwind CSS và Framer Motion.

## Chạy trên máy

Yêu cầu: Node.js và npm.

```bash
npm ci
npm run dev
```

Kiểm tra nội dung và production build:

```bash
npm run validate:content
npm run build
npm run preview
```

## Triển khai bằng Vercel

Repository đã có `vercel.json`, vì vậy Vercel có thể import và build trực tiếp với các thông số:

- Framework Preset: `Vite`
- Root Directory: `.`
- Install Command: `npm ci`
- Build Command: `npm run build`
- Output Directory: `dist`
- Production Branch: `main`
- Environment Variables: không cần

Xem hướng dẫn từng bước tại [DEPLOYMENT.md](./DEPLOYMENT.md).
