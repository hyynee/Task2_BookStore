# Hướng dẫn chạy dự án

## 1. Backend (`be_book`)

### Cài đặt dependencies

Vào thư mục backend:

```bash
cd be_book
yarn install
# hoặc nếu dùng npm:
# npm install
```

### Chạy server

- **Chạy chế độ phát triển (tự động reload khi code thay đổi):**
  ```bash
  yarn start:dev
  # hoặc
  npm run start:dev
  ```
- **Chạy chế độ thường:**
  ```bash
  yarn start
  # hoặc
  npm start
  ```
- **Chạy production (sau khi build):**
  ```bash
  yarn build
  yarn start:prod
  # hoặc
  npm run build
  npm run start:prod
  ```

> **Lưu ý:** Cần cài đặt Node.js (khuyên dùng >= 16) và yarn hoặc npm.

---

## 2. Frontend (`fe_book`)

### Cài đặt dependencies

Vào thư mục frontend:

```bash
cd fe_book
yarn install
# hoặc
# npm install
```

### Chạy ứng dụng

- **Chạy chế độ phát triển:**

  ```bash
  yarn dev
  # hoặc
  npm run dev
  ```

  Sau đó truy cập địa chỉ được in ra (thường là http://localhost:5173 hoặc http://localhost:3000).

- **Build production:**
  ```bash
  yarn build
  # hoặc
  npm run build
  ```
- **Xem thử bản build:**
  ```bash
  yarn preview
  # hoặc
  npm run preview
  ```

> **Lưu ý:** Cần cài đặt Node.js (khuyên dùng >= 16) và yarn hoặc npm.

---

## 3. Một số lưu ý chung

- Đảm bảo backend và frontend chạy trên các port khác nhau (mặc định backend là 3000, frontend là 5173).
- Nếu frontend cần kết nối tới backend, hãy kiểm tra lại biến môi trường hoặc file cấu hình API endpoint.
