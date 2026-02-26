
# ASUS Astro 專案

本專案為 **Astro** 驅動的網站專案，搭配 **UnoCSS / TailwindCSS** 的 utility-first 寫法，以及部分 **Bootstrap** 元件（例如 Offcanvas、Collapse）來完成互動 UI。

## 技術棧

- **Framework**
  - Astro (`astro`)
- **Styling**
  - UnoCSS（含 transformer / shortcuts / theme）
  - TailwindCSS（專案亦有使用）
  - SCSS（多數元件樣式以 `.scss` 維護）
  - Bootstrap（Offcanvas/Collapse 等互動元件整合）
- **Tooling**
  - TypeScript
  - Prettier
  - Playwright（E2E）
  - Jest（單元測試環境）

## 安裝與開發

本專案使用 **pnpm**。

### 安裝

```bash
pnpm i
```

### 開發

```bash
pnpm dev
```

### Build / Preview

```bash
pnpm build
pnpm preview
```

## Scripts（package.json）

- **dev**：`astro --config dev.astro.config.mjs dev --host`
- **build**：`MODE=build astro --config build.astro.config.mjs build`
- **preview**：`MODE=build astro --config build.astro.config.mjs preview`
- **gitlab**：`MODE=deploy astro --config gitlab.astro.config.mjs build`
- **netlify**：`MODE=deploy astro --config netlify.astro.config.mjs build`
- **prettier**：格式化（包含 `.astro`）
- **tsc:check**：TypeScript 型別檢查

## 專案設定摘要

### Astro 設定

- `astro.config.mjs`
  - 整合 UnoCSS（`unocss/astro`）
  - Vite alias：
    - `~bootstrap` -> `node_modules/bootstrap`
    - `~~/` -> `src/`

- `dev.astro.config.mjs`
  - 開發環境使用 `astro.config.mjs` 的 `config`

- `build.astro.config.mjs`
  - build 輸出到 `build/` 或 `build.local/`
  - UnoCSS 增加 `transformerCompileClass`
  - 產物命名（js/css/assets）有自訂 `rollupOptions.output`

- `netlify.astro.config.mjs`
  - `output: 'server'` + `@astrojs/netlify` adapter

### TypeScript path alias

定義於 `tsconfig.json`：

- `@components/*` -> `src/components/*`
- `@layouts/*` -> `src/layouts/*`
- `@js/*` -> `src/js/*`
- `@scss/*` -> `src/scss/*`

## 頁面路由（`src/pages`）

以下列表以「檔案路徑 -> 實際路由」的方式整理（Astro 的 route 規則：`src/pages` 的檔案結構對應 URL path）。

### 根目錄（`src/pages/*.astro`）

- **`/`**：`src/pages/index.astro`：首頁（Banner、關於我們、解決方案、成功案例、合作夥伴、最新消息；含 Video modal / relative script）
- **`/aboutus`**：`src/pages/aboutus.astro`：關於我們（Banner + scroll spy 導覽；區塊：跨產業合作生態、競爭優勢）
- **`/contactus`**：`src/pages/contactus.astro`：聯絡我們表單（含驗證碼 modal、表單驗證 ScriptNext、cookies/fetchWithAuth 腳本）
- **`/inquery`**：`src/pages/inquery.astro`：諮詢表單（使用 `@components/pages/inquery/form.astro`，含驗證碼 modal 與 ScriptNext）
- **`/inquery-2`**：`src/pages/inquery-2.astro`：諮詢表單（同 `/inquery`，但以不同 display 參數呈現）
- **`/isv`**：`src/pages/isv.astro`：成為 ISV 夥伴表單（含驗證碼 modal 與 ScriptNext）
- **`/login`**：`src/pages/login.astro`：會員登入（member footer；含驗證碼 modal 與 ScriptNext）
- **`/register`**：`src/pages/register.astro`：會員註冊（member footer；含驗證碼 modal 與 ScriptNext）
- **`/register-callback`**：`src/pages/register-callback.astro`：註冊 callback（member footer；含驗證碼 modal 與 ScriptNext）
- **`/forget-password`**：`src/pages/forget-password.astro`：忘記密碼（member footer；含驗證碼 modal 與 ScriptNext）
- **`/forget-password-step-2`**：`src/pages/forget-password-step-2.astro`：忘記密碼 step 2（member footer；輸入/驗證流程第二步）
- **`/reset-password`**：`src/pages/reset-password.astro`：重設密碼（member footer；含驗證碼 modal 與 ScriptNext）
- **`/reset-password-step-2`**：`src/pages/reset-password-step-2.astro`：重設密碼 step 2（member footer；輸入/驗證流程第二步）
- **`/test`**：`src/pages/test.astro`：測試頁（示範 `FormValidator` + async validator；含 reset/submit）

### `ivy/`

- **`/ivy`**：`src/pages/ivy/index.astro`：合作夥伴列表（Banner + ArticlesList 篩選/排序 + 卡片列表）
- **`/ivy/*`**：`src/pages/ivy/[...id].astro`：合作夥伴明細（scroll spy：公司介紹/解決方案/最新消息；含 follower、video、relative script）

### `member/`

- **`/member`**：`src/pages/member/index.astro`：會員中心入口（目前為空版型，僅套用 member layout/footer）
- **`/member/basic-info`**：`src/pages/member/basic-info.astro`：基本資料（Body/Title 版型 + 表單；含驗證碼 modal 與 ScriptNext）
- **`/member/account-management`**：`src/pages/member/account-management.astro`：帳號管理（含更新 Email 流程相關 modal：send code / reset email；含 ScriptNext）
- **`/member/message-center`**：`src/pages/member/message-center.astro`：訊息中心（表格列表 + 排序工具；含 empty state table）
- **`/member/my-wishlist`**：`src/pages/member/my-wishlist.astro`：我的收藏清單（列表 + 排序工具）
- **`/member/order-aocc`**：`src/pages/member/order-aocc.astro`：我的諮詢夾（列表 table + 排序工具；含 empty state）
- **`/member/order-aocc/*`**：`src/pages/member/order-aocc/[...id].astro`：我的諮詢夾明細（以諮詢編號為路由；顯示諮詢內容並提供返回列表）
- **`/member/update-password`**：`src/pages/member/update-password.astro`：變更密碼（Body/Title 版型 + 表單；含驗證碼 modal 與 ScriptNext）

### `news/`

- **`/news`**：`src/pages/news/index.astro`：最新消息列表（Banner、精選/列表、篩選/排序；卡片列表；含 follower 與列表互動 scripts）
- **`/news/*`**：`src/pages/news/[...id].astro`：最新消息明細（Article + Relative；使用 `getStaticPaths` 預渲染固定筆數）

### `solution/`

- **`/solution`**：`src/pages/solution/index.astro`：解決方案列表（Banner + ArticlesList 篩選/排序 + 卡片列表；含 follower/video 與列表 scripts）
- **`/solution/*`**：`src/pages/solution/[...id].astro`：解決方案明細（Top/Feature/Relative/Back；含規格選項同步 follower、加入詢問車 toast、video；使用 `getStaticPaths` 預渲染固定筆數）

### `success/`

- **`/success`**：`src/pages/success/index.astro`：成功案例列表（Banner、文章區塊 + ArticlesList；含 follower 與列表 scripts）
- **`/success/*`**：`src/pages/success/[...id].astro`：成功案例明細（Article + Relative；使用 `getStaticPaths` 預渲染固定筆數）

## 頁面元件結構（`src/components/pages`）

每個路由群組在 `src/components/pages/<page>/` 下有各自的元件資料夾。以下依群組列出 folder tree 與每個元件的一句話說明。頁面共同依賴的 `common/*`、`modal/*` 元件集中在最後「共用元件」一節。

---

### `/`（首頁）`src/components/pages/index/`

```
index/
├── banner.astro        # 首頁 Hero Banner（大圖、標題、CTA 按鈕）[bundled <script>]
├── banner.scss
├── aboutus.astro       # 「Why ASUS Business?」區塊（卡片列表）
├── aboutus.ts          # aboutus 卡片資料（資料來源）
├── aboutus.scss
├── solutions.astro     # 「解決方案」區塊（卡片預覽列表）
├── solutions.scss
├── success.astro       # 「成功案例」區塊（卡片預覽列表）
├── success.scss
├── ivy.astro           # 「合作夥伴」區塊（卡片預覽列表）
├── ivy.scss
├── news.astro          # 「最新消息」區塊（卡片預覽列表）
└── news.scss
```

額外共用元件：`common/article/relative.js.astro`（相關文章互動腳本）、`modal/video.astro`（影片播放 Modal）

---

### `/aboutus`（關於我們）`src/components/pages/aboutus/`

```
aboutus/
├── section01.astro     # 跨產業合作生態（卡片列表，資料來自 data01.ts）
├── section01.scss
├── section02.astro     # 競爭優勢（卡片列表，資料來自 data02.ts）
├── section02.scss
├── section03.astro     # 第三區塊（補充說明/CTA 區塊）
├── section03.scss
├── card.astro          # 共用卡片元件（section01/02 使用）
├── card2.astro         # 替代樣式卡片元件
├── data01.ts           # section01 資料
├── data02.ts           # section02 資料
├── nav.astro           # scroll spy 錨點導覽（已被 common/section/nav 取代，備用）
└── nav.scss
```

額外共用元件：`common/banner/banner.astro`（頁面 Banner）、`common/section/nav.astro`（scroll spy 上方 Tab 導覽）

---

### `/contactus`（聯絡我們）`src/components/pages/contactus/`

```
contactus/
├── form.astro          # 聯絡我們主表單（姓名、公司、職稱、Email、電話、留言、同意條款）
├── form.scss
└── script-inline.astro # 表單提交互動腳本（fetch API 送出、驗證碼觸發）
```

額外共用元件：`modal/comfirm-code.astro`（驗證碼 Modal）、`common/script/script-next.astro`（全域表單驗證腳本）、`common/script/cookies.astro`、`common/script/fetchWithAuth.astro`

---

### `/inquery` & `/inquery-2`（諮詢表單）`src/components/pages/inquery/`

```
inquery/
├── form.astro          # 諮詢主表單（接受 data prop；/inquery-2 多傳 display="flex"）[bundled <script>]
├── form.scss
├── card.astro          # 表單內產品/方案卡片元件
├── card.scss
├── data.ts             # 表單選項資料（產品類別等）
└── script-inline.astro # 表單提交互動腳本
```

額外共用元件：`modal/comfirm-code.astro`、`common/script/script-next.astro`、`common/script/cookies.astro`、`common/script/fetchWithAuth.astro`

---

### `/isv`（成為 ISV 夥伴）`src/components/pages/isv/`

```
isv/
├── form.astro          # ISV 申請主表單
├── form.scss
└── script-inline.astro # 表單提交互動腳本
```

額外共用元件：`modal/comfirm-code.astro`、`common/script/script-next.astro`、`common/script/cookies.astro`、`common/script/fetchWithAuth.astro`

---

### `/login`（登入）`src/components/pages/login/`

```
login/
├── form.astro          # 登入表單（帳號、密碼、記住我）
├── form.scss
└── script-inline.astro # 登入互動腳本（fetch 登入 API、錯誤提示）
```

額外共用元件：`modal/comfirm-code.astro`、`common/script/script-next.astro`、`common/script/cookies.astro`、`common/script/fetchWithAuth.astro`

---

### `/register`（註冊）`src/components/pages/register/`

```
register/
├── form.astro          # 會員註冊表單
├── form.scss
└── script-inline.astro # 註冊互動腳本
```

### `/register-callback`（註冊 callback）`src/components/pages/register-callback/`

```
register-callback/
├── form.astro          # 註冊 callback 顯示畫面（確認信送出等）
└── form.scss
```

> `script-inline.astro` 共用 `pages/register/script-inline.astro`

額外共用元件（`register` / `register-callback`）：`modal/comfirm-code.astro`、`common/script/script-next.astro`、`common/script/cookies.astro`、`common/script/fetchWithAuth.astro`

---

### `/forget-password` & `/forget-password-step-2`（忘記密碼）

```
forget-password/
├── form.astro          # 忘記密碼 step 1（輸入 Email）
├── form.scss
└── script-inline.astro # 送出 Email 互動腳本

forget-password-step-2/
├── form.astro          # 忘記密碼 step 2（驗證碼 + 新密碼）
└── form.scss
```

### `/reset-password` & `/reset-password-step-2`（重設密碼）

```
reset-password/
├── form.astro          # 重設密碼 step 1
├── form.scss
└── script-inline.astro # 重設密碼互動腳本

reset-password-step-2/
├── form.astro          # 重設密碼 step 2
└── form.scss
```

額外共用元件（密碼相關頁面）：`modal/comfirm-code.astro`；step-1 頁另有 `common/script/script-next.astro`、`common/script/cookies.astro`、`common/script/fetchWithAuth.astro`

---

### `/news`（最新消息）`src/components/pages/news/`

```
news/
├── articles.astro          # 精選消息區塊（Banner 下方精選卡片，水平版型）[bundled <script>]
├── card.astro              # 標準新聞卡片（日期、標題、分類、簡介、圖片）
├── card.scss
├── collectionCard.astro    # 收藏卡片（帶收藏按鈕）
├── collectionHarCard.astro # 水平收藏卡片
├── data.ts                 # 新聞列表假資料
├── filter.ts               # 篩選器選項資料（分類）
├── scipt-inline.astro      # 列表互動腳本（篩選/分頁/排序邏輯）
├── script.astro            # 舊版列表腳本
├── script.next.astro       # 新版列表腳本（目前使用）
└── [id]/
    ├── article.astro       # 新聞明細主體（標題、日期、內文）
    ├── article.scss
    ├── content.html        # 靜態 HTML 內文範本
    ├── relative.astro      # 相關新聞推薦區塊（Swiper）
    └── relative.scss
```

額外共用元件：`common/banner/banner.astro`、`common/article/articlesList.astro`（篩選/排序/分頁容器）、`common/follower/follower.astro`（詢問浮動按鈕）、`common/article/relative.js.astro`（相關文章 Swiper 腳本）

---

### `/solution`（解決方案）`src/components/pages/solutions/`

```
solutions/
├── card.astro              # 解決方案卡片（含 logo、圖片、簡介、playback 按鈕）[bundled <script>]
├── card.scss
├── data.ts                 # 解決方案列表假資料
├── filter.ts               # 篩選器選項資料
├── script-inline.astro     # 列表互動腳本
└── [id]/
    ├── top.astro           # 明細頁頂部（標題、大圖、基本資訊）
    ├── top.scss
    ├── head.astro          # 明細頁 head 子區塊
    ├── head.scss
    ├── left.astro          # 明細頁左欄（圖片/說明）[bundled <script>]
    ├── left.scss
    ├── right.astro         # 明細頁右欄（配置選項、加入諮詢夾）
    ├── right.scss
    ├── config.astro        # 產品規格/方案配置選項
    ├── feature.astro       # 特色功能區塊
    ├── feature.scss
    ├── relative.astro      # 相關解決方案推薦（Swiper）
    ├── relative.scss
    ├── follower.astro      # 浮動詢問/加入諮詢夾按鈕
    ├── follower.scss
    ├── toast.astro         # 加入諮詢夾成功 Toast 提示
    ├── toast.scss
    ├── back.astro          # 返回列表按鈕
    └── back.scss
```

額外共用元件：`common/banner/banner.astro`、`common/article/articlesList.astro`、`common/follower/follower.astro`、`modal/video.astro`、`common/article/relative.js.astro`

---

### `/success`（成功案例）`src/components/pages/success/`

```
success/
├── articles.astro          # 精選案例區塊（Banner 下方精選卡片）[bundled <script>]
├── data.ts                 # 成功案例假資料
├── filter.ts               # 篩選器選項資料
└── [id]/
    ├── article.astro       # 案例明細主體（標題、內文、品牌資訊）
    ├── article.scss
    ├── content.html        # 靜態 HTML 內文範本
    ├── relative.astro      # 相關案例推薦（Swiper）
    └── relative.scss
```

> 列表卡片複用 `pages/news/card.astro`（`showBreif={false}`）

額外共用元件：`common/banner/banner.astro`、`common/article/articlesList.astro`、`common/follower/follower.astro`、`common/article/relative.js.astro`

---

### `/ivy`（合作夥伴）`src/components/pages/ivy/`

```
ivy/
├── data.ts                 # 合作夥伴列表假資料
├── filter.ts               # 篩選器選項資料
└── [id]/
    ├── info.astro          # 夥伴公司基本資訊區塊 [bundled <script>]
    ├── info.scss
    ├── article.astro       # 夥伴解決方案/文章區塊
    ├── article.scss
    ├── card.astro          # 文章內卡片元件
    ├── card.scss
    ├── follower.astro      # 浮動聯繫按鈕
    ├── follower.scss
    ├── relative.astro      # 相關夥伴/消息推薦（Swiper）
    ├── relative.scss
    ├── nav.astro           # 明細頁 scroll spy 錨點導覽（備用）
    └── nav.scss
```

> 列表卡片複用 `pages/news/card.astro`（不顯示 logo/label）

額外共用元件：`common/banner/banner.astro`、`common/article/articlesList.astro`、`common/follower/follower.astro`、`common/section/nav.astro`（scroll spy 導覽）、`modal/video.astro`、`common/article/relative.js.astro`

---

### `/member/*`（會員中心）`src/components/pages/member/`

#### 共用工具元件 `tools/`

```
member/tools/
├── body.astro              # 會員中心頁面骨架（側欄導覽 + 主內容區）
├── banner.astro            # 會員頁 Banner（顯示歡迎訊息）[bundled <script>]
├── banner.scss
├── acctSideNav.astro       # 側欄導覽容器 [bundled <script>]
├── acctSideNav.scss
├── acctSideNavTab.astro    # 側欄一級導覽 Tab 項目
├── acctSideNavTab.scss
├── acctSideSubNavTab.astro # 側欄二級子導覽 Tab 項目
├── acctSideSubNavTab.scss
├── navOffcanvas.astro      # 手機版側欄導覽 Offcanvas [bundled <script>]
├── navOffcanvas.scss
├── navs.ts                 # 側欄導覽項目資料
├── title.astro             # 頁面標題列（含排序按鈕、返回連結、右側文字）
├── sort.astro              # 分頁/排序工具列（top/bottom 兩種位置）
└── sort.scss
```

#### `/member/basic-info` `basic-info/`

```
basic-info/
├── form.astro              # 個人基本資料表單（姓名、生日、手機等）
├── form.scss
├── content.astro           # 表單內容區塊
├── content.scss
└── script-inline.astro     # 表單提交/更新互動腳本
```

#### `/member/account-management` `account-management/`

```
account-management/
├── form.astro              # 帳號管理表單（Email 顯示、帳號連結）
├── form.scss
├── content.astro           # 表單內容區塊
├── content.scss
└── script-inline.astro     # 帳號操作互動腳本（觸發更換 Email 流程）
```

額外 Modal：`modal/comfirm-code.astro`、`modal/update-email-send-code.astro`（發送驗證碼）、`modal/reset-email.astro`（確認更換 Email）

#### `/member/message-center` `message-center/`

```
message-center/
├── table.astro             # 訊息列表 Table（含 empty state）
├── table.scss
├── content.astro           # 單筆訊息展開內容
├── content.scss
├── MobileTd.astro          # 手機版 Table 行元件
└── data.ts                 # 訊息列表假資料與欄位定義
```

#### `/member/my-wishlist` `my-wishlist/`

```
my-wishlist/
├── list.astro              # 收藏清單列表
├── list.scss
├── content.astro           # 單筆收藏內容
└── content.scss
```

#### `/member/order-aocc` & `/member/order-aocc/*` `order-aocc/`

```
order-aocc/
├── content.astro           # 諮詢夾列表主體
├── content.scss
├── list.astro              # 列表項目元件
├── list.scss
├── tableLink.astro         # 帶連結的 Table 欄位元件
├── MobileTd.astro          # 手機版 Table 行元件
├── data.ts                 # 諮詢夾假資料與欄位定義
└── [id]/
    ├── content.astro       # 諮詢明細主體（顯示諮詢產品資訊）
    ├── content.scss
    ├── form.astro          # 諮詢明細補充表單（可修改備注等）
    └── form.scss
```

#### `/member/update-password` `update-password/`

```
update-password/
├── form.astro              # 變更密碼表單（舊密碼、新密碼、確認密碼）
├── form.scss
├── content.astro           # 表單內容區塊
├── content.scss
└── script-inline.astro     # 密碼更新互動腳本
```

---

## 共用元件一覽（`src/components/common/*` & `src/components/modal/*`）

以下為各頁面共同依賴的元件，不重複列在每個頁面中。

### `common/banner/`
```
banner/
├── banner.astro    # 通用頁面 Banner（背景圖、標題、dark/light mode）
└── banner.scss
```

### `common/article/`
```
article/
├── articlesList.astro      # 篩選/排序/分頁容器（包含 category filter、sort select、列表 slot）
├── articlesList.scss
├── relative.js.astro       # 相關文章 Swiper 初始化腳本（明細頁使用）[bundled <script>]
└── ...（其他輔助元件）
```

### `common/follower/`
```
follower/
├── follower.astro  # 浮動詢問/加入諮詢夾按鈕（右下角固定位置，捲動顯示）[bundled <script>]
└── follower.scss
```

### `common/section/`
```
section/
├── nav.astro       # Scroll Spy Tab 導覽（錨點切換，配合 useScrollSpy hook）[bundled <script>]
└── ...（section title、form、loading 等輔助元件）
```

### `common/script/`
```
script/
├── script-next.astro       # 全域表單驗證腳本（FormValidator、輸入互動）
├── cookies.astro           # Cookie 讀寫腳本
├── fetchWithAuth.astro     # 帶 JWT 驗證的 fetch 封裝腳本
└── ...（其他腳本）
```

### `modal/`
```
modal/
├── comfirm-code.astro          # 驗證碼輸入 Modal（表單送出前驗證）
├── video.astro                 # 影片播放 Modal（YouTube / 自訂影片）[bundled <script>]
├── update-email-send-code.astro# 更換 Email 第一步：發送驗證碼 Modal
└── reset-email.astro           # 更換 Email 第二步：確認新 Email Modal
```

## 元件目錄導覽（你最常會查的 4 個區塊）

以下表格以「檔案/資料夾」為單位，提供快速定位與責任說明。

### `src/components/offcanvas`

此目錄目前為空（`Empty directory`）。專案的 Offcanvas 主要實作在：

- `src/components/common/offcanvas/*`（通用 Offcanvas 基底）
- `src/components/header/offcanvas/*`（Header 手機選單/搜尋 Offcanvas）

### `src/components/header`

| 路徑 | 類型 | 負責內容 |
| --- | --- | --- |
| `header.astro` | Astro | Header 主入口：Logo、主導覽、搜尋/詢問車/會員入口、串接 header offcanvas |
| `header.scss` | SCSS | Header 整體樣式 |
| `headerTop.astro` | Astro | Header 上半部區塊（Left 區域） |
| `headerTop.scss` | SCSS | Header 上半部樣式 |
| `headerBottom.astro` | Astro | Header 下半部區塊（Right 區域） |
| `headerBottom.scss` | SCSS | Header 下半部樣式 |
| `nav.astro` | Astro | 主導覽渲染（支援 mega menu/dropdown），包含導覽互動腳本 |
| `nav.scss` | SCSS | 導覽樣式 |
| `megaMenu.astro` | Astro | MegaMenu 結構（配合 `nav.astro`） |
| `logo.astro` | Astro | Header Logo 元件 |
| `logo.scss` | SCSS | Header Logo 樣式 |
| `linkList.scss` | SCSS | Header link list 相關樣式 |
| `right.astro` | Astro | Header 右側區塊（可能作為 slot 容器/組合用） |
| `right.scss` | SCSS | Header 右側樣式 |
| `offcanvas/` | Dir | Header 手機版選單、搜尋等 Offcanvas 相關元件 |

#### `src/components/header/offcanvas/`

| 路徑 | 類型 | 負責內容 |
| --- | --- | --- |
| `offcanvas.astro` | Astro | Header Mobile Offcanvas：手機版多層級選單（整合 Collapse 與 common/offcanvas） |
| `offcanvas.scss` | SCSS | Header Mobile Offcanvas 樣式 |
| `search.astro` | Astro | Header Search Offcanvas（top 方向彈出） |
| `search.scss` | SCSS | 搜尋 Offcanvas 樣式 |
| `triggerButton.astro` | Astro | 漢堡選單按鈕（Bootstrap offcanvas trigger + active 狀態管理） |
| `triggerButton.scss` | SCSS | 漢堡按鈕樣式 |

### `src/components/footer`

| 路徑 | 類型 | 負責內容 |
| --- | --- | --- |
| `footer.astro` | Astro | Footer 主入口：桌機多欄連結、手機 Collapse、頁面 breadcrumb、版權資訊 |
| `footer.scss` | SCSS | Footer 樣式 |
| `data.ts` | TS | Footer 連結資料定義與資料內容 |
| `logo.astro` | Astro | Footer Logo（SVG） |
| `memberFooter.astro` | Astro | 會員頁專用 Footer（簡化版） |

### `src/components/common`

`common/` 為共用元件集合，通常被 pages/header/footer/layouts 引用。

| 路徑 | 類型 | 負責內容（摘要） |
| --- | --- | --- |
| `article/` | Dir | 文章/內容呈現元件（含列表、offcanvas、相對文章等） |
| `badges/` | Dir | Badge 元件 |
| `banner/` | Dir | Banner 元件與資料/工具（`banner.ts`） |
| `breadcrumb/` | Dir | 麵包屑元件 |
| `button/` | Dir | Button 系列（含變體樣式、toggle button/link） |
| `collapse/` | Dir | Collapse 元件（含 select、filter 等） |
| `css-variable.astro` | Astro | 匯出/注入 CSS 變數（很小的輔助元件） |
| `follower/` | Dir | follower 元件 |
| `form/` | Dir | 表單元件集合（Input/Select/Textarea/InputGroup/Validator 相關） |
| `icons/` | Dir | 大量 icon 元件（數量多，建議用搜尋定位） |
| `images/` | Dir | 圖片元件（例如 `picture.astro`） |
| `link/` | Dir | Link 元件（`a.astro`、`link.astro`、含 arrow svg） |
| `logo/` | Dir | 共用 Logo 與多款 SVG Astro 版型 |
| `megaMenu/` | Dir | MegaMenu 共用元件 |
| `meta/` | Dir | SEO/Schema/Analytics/Font/Icon 等 meta 元件 |
| `modal/` | Dir | Modal 共用元件 |
| `notice/` | Dir | Notice 元件 |
| `offcanvas/` | Dir | 共用 Offcanvas 基底（封裝 Bootstrap Offcanvas 結構與樣式） |
| `pagination/` | Dir | Pagination 元件 |
| `playBack/` | Dir | playback 元件 |
| `progress/` | Dir | progress 元件 |
| `script/` | Dir | 共用腳本注入（cookies/fetchWithAuth/script-next 等） |
| `section/` | Dir | Section/Title/Form/Loading 等版型元件 |
| `sort/` | Dir | sort 元件 |
| `swiper/` | Dir | Swiper 包裝元件 |
| `tables/` | Dir | tables 元件 |
| `tabs/` | Dir | tabs 元件 |
| `toast/` | Dir | toast 元件（含 triggerButton） |

#### `src/components/common/offcanvas/`

| 路徑 | 類型 | 負責內容 |
| --- | --- | --- |
| `offcanvas.astro` | Astro | 通用 Offcanvas 元件（封裝 Bootstrap offcanvas 結構、header/body slots、參數化位置/尺寸等） |
| `offcanvas.scss` | SCSS | Offcanvas 視覺樣式、CSS variables、scrollbar、backdrop |

#### `src/components/common/script/`（常用腳本）

| 路徑 | 類型 | 負責內容 |
| --- | --- | --- |
| `script.astro` | Astro | 內聯全域腳本（包含表單驗證 `FormValidator` 等基礎 JS） |
| `script-next.copy.astro` | Astro | 延伸/新版腳本（專案內有使用 copy 版本來調整行為） |
| `cookies.copy.astro` | Astro | Cookie 相關腳本 |
| `fetchWithAuth.copy.astro` | Astro | 帶驗證/授權的 fetch 封裝腳本 |
| `script-origin.copy.astro` | Astro | 舊版/來源版本腳本（保留用） |

## 含 Bundled `<script>` 的 Astro 元件

> Astro 的 `<script>` 標籤會由 Vite 打包、Tree-shaking，**不會直接暴露給外部**（不同於 `<script is:inline>`）。  
> 以下檔案內含此類 bundled script，修改時須注意對 JS bundle 的影響。

### `src/components/common/`

| 檔案 | 說明 |
| --- | --- |
| `article/relative.js.astro` | 相關文章 Swiper 初始化（`mySwiperListen`） |
| `article/relative.js copy.astro` | 同上備份版本 |
| `collapse/category.astro` | 分類 Collapse 展開/收合互動 |
| `collapse/collapse.astro` | 通用 Collapse 互動腳本 |
| `collapse/collapseSelect.astro` | Collapse 內 Select 選項互動 |
| `collapse/filter.astro` | 篩選器 Collapse 互動 |
| `follower/follower.astro` | 浮動按鈕顯示/隱藏（捲動偵測） |
| `form/checkboxs/checkbox.astro` | Checkbox 狀態管理腳本 |
| `form/checkboxs/choiceButton.astro` | ChoiceButton 選取互動 |
| `form/input/passwordInput.astro` | 密碼顯示/隱藏切換 |
| `form/select/customSelect.astro` | 自訂下拉選單互動 |
| `form/select/select.astro` | 原生 Select 事件封裝 |
| `form/spinbutton.astro` | 數量加減按鈕互動 |
| `icons/bookmark/Bookmark.example.astro` | Bookmark icon 範例（含事件） |
| `icons/header-menu/HeaderMenu.example.astro` | HeaderMenu icon 範例（含事件） |
| `modal/modal.astro` | 通用 Modal 顯示/隱藏互動 |
| `offcanvas/offcanvas.astro` | 通用 Offcanvas 顯示/隱藏互動 |
| `playBack/playBack.astro` | 影片播放觸發腳本 |
| `section/checkboxGroup.astro` | Section 內 CheckboxGroup 互動 |
| `section/form.astro` | Section 表單送出互動 |
| `section/nav.astro` | Scroll Spy 錨點偵測腳本 |
| `tabs/tabs.astro` | Tab 切換互動腳本 |
| `toast/toast.astro` | Toast 顯示/隱藏腳本 |

### `src/components/header/`

| 檔案 | 說明 |
| --- | --- |
| `header.astro` | Header 捲動行為、sticky 狀態 |
| `nav.astro` | 主導覽 hover/active 互動 |
| `offcanvas/search.astro` | 搜尋 Offcanvas 顯示/隱藏 |
| `offcanvas/triggerButton.astro` | 漢堡按鈕 active 動畫（監聽 Bootstrap offcanvas 事件） |

### `src/components/modal/`

| 檔案 | 說明 |
| --- | --- |
| `video.astro` | 影片 Modal 開啟/關閉及 iframe src 注入 |
| `video copy.astro` | 同上備份版本 |

### `src/components/pages/`

| 檔案 | 說明 |
| --- | --- |
| `index/banner.astro` | 首頁 Banner 動畫/CTA 互動 |
| `inquery/form.astro` | 諮詢表單選項互動（產品卡片選取） |
| `ivy/[id]/info.astro` | 夥伴資訊區塊展開/收合互動 |
| `member/tools/acctSideNav.astro` | 會員側欄導覽 active 狀態同步 |
| `member/tools/banner.astro` | 會員 Banner 動態資料載入 |
| `member/tools/navOffcanvas.astro` | 手機版側欄 Offcanvas 互動 |
| `news/articles.astro` | 精選消息卡片 Swiper 初始化 |
| `solutions/[id]/left.astro` | 解決方案明細左欄圖片切換互動 |
| `solutions/card.astro` | 解決方案列表卡片 hover/playback 互動 |
| `success/articles.astro` | 精選案例卡片 Swiper 初始化 |

## 備註

- `src/components/common/icons/` 內多為「單一 icon 專用元件」。若你要在通用的 `Icons` 元件（`src/components/common/icons/icons.astro`）裡新增可用 icon key，需要在該檔案中新增 `import` 並把對應元件掛到 `icons` mapping（等於維護一份 registry）。
