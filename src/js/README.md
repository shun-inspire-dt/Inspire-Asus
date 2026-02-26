# `src/js` — 前端 JS/TS 模組說明

此目錄包含專案所有前端 TypeScript 邏輯，依用途分為三個子目錄：

```
src/js/
├── components/common/   # UI 元件的 JS 行為封裝
├── data/                # 靜態資料 / 型別定義
└── helpers/             # 工具函數與 hooks
```

---

## `components/common/` — UI 行為封裝

### `collapse/useBsDropDown.ts`

> **實際被 import**：`@js/components/common/collapse/useBsDropDown`

| 匯出 | 說明 |
| --- | --- |
| `useBsDropDown(element, options?)` | 建立並回傳 Bootstrap `Dropdown` 實例的工廠函數 |

**用途**：將 Bootstrap Dropdown 的建立包裝成單行呼叫，並同時引入對應的 SCSS。

---

### `goTop.ts`

> **實際被 import**：`@js/components/common/goTop`

| 匯出 | 說明 |
| --- | --- |
| `GoTop(selector, option?)` | 為指定元素纁定「回到頁首」點擊事件 |

**用途**：Header 等「回頂部」按鈕使用。點擊後呼叫 `window.scrollTo`，預設平滑滾動至頂部。

---

### `input/toggleGroup.ts`

> **實際被 import**：`@js/components/common/input/toggleGroup`

| 匯出 | 說明 |
| --- | --- |
| `ToggleGroup` | 區塊切換控制類別 |

**ToggleGroup 公開方法**

| 方法 | 說明 |
| --- | --- |
| `constructor(selectors, options?)` | 以 CSS 選擇器初始化，`options.wrapInForm` 可指定表單以支援 `reset` 事件 |
| `allShow()` | 顯示所有區塊（加上 `active` class） |
| `allHide()` | 隱藏所有區塊（移除 `active` class） |
| `check()` | 纁定 radio / checkbox `change` 事件，切換對應區塊 |
| `click(updateUrlQuery?)` | 纁定 `[data-toggle]` 點擊事件，可選擇性同步 URL `?tab=` query |

**用途**：諮詢表單（`inquery`）、會員頁等需要依選項顯示/隱藏不同區塊的場景。

**HTML data 屬性**

| 屬性 | 用途 |
| --- | --- |
| `data-toggle-container` | 標記 ToggleGroup 的根容器 |
| `data-toggle-item` | 標記受控的顯示/隱藏區塊 |
| `data-toggle="#target"` | 標記觸發元素，值為目標區塊的 CSS 選擇器 |
| `data-tab` | 自訂 URL query 用的 tab 名稱（`click()` 搭配 `updateUrlQuery=true` 時使用） |

---

### `modal/modal.ts`

> **實際被 import**：`@js/components/common/modal/modal`

| 匯出 | 說明 |
| --- | --- |
| `Modal` | Bootstrap Modal 封裝類別 |

**Modal 公開方法**

| 方法 | 說明 |
| --- | --- |
| `constructor(modal, options?)` | 初始化，建立 Bootstrap Modal 實例 |
| `show()` | 顯示 Modal（自動隱藏目前其他已開啟的 Modal） |
| `hide()` | 隱藏 Modal |
| `toggle()` | 切換顯示/隱藏 |
| `switch(related)` | 切換到另一個 Modal（隱藏自身、顯示目標） |
| `on(Event, callback, options?)` | 纁定事件（支援 Bootstrap 原生事件 + 自定義擴展事件） |
| `addMethod()` | 注冊預建自定義事件派送（`showOn`、`hideOff`、`fire`） |

**支援事件（`myEvents`）**

`hide` · `hidden` · `hidePrevented` · `show` · `shown` · `close` · `clickOutside` · `showOn` · `hideOff` · `switch`

**用途**：`Toast`、各種確認 Modal（驗證碼、影片播放）的底層。

---

### `offcanvas/offcanvas.ts`

> **實際被 import**：`@js/components/common/offcanvas/offcanvas`

| 匯出 | 說明 |
| --- | --- |
| `Offcanvas` | Bootstrap Offcanvas 封裝類別 |

**Offcanvas 公開方法**

| 方法 | 說明 |
| --- | --- |
| `constructor(offcanvas, options?)` | 初始化，建立 Bootstrap Offcanvas 實例 |
| `show()` | 顯示 Offcanvas |
| `hide()` | 隱藏 Offcanvas |
| `toggle()` | 切換顯示/隱藏 |
| `switch(related)` | 切換到另一個 Offcanvas（500ms 後 dispose 自身） |
| `on(Event, callback, options?)` | 纁定事件（支援 Bootstrap 原生事件 + 自定義擴展事件） |
| `addMethod()` | 注冊 `showOn` / `hideOff` 自定義事件處理 |

**支援事件（`myEvents`）**

`hide` · `hidden` · `hidePrevented` · `show` · `shown` · `close` · `clickOutside` · `showOn` · `hideOff`

**用途**：Header 手機選單、搜尋 Offcanvas、會員側欄導覽 Offcanvas 的底層。

---

### `select/customSelect.ts`

> **實際被 import**：`@js/components/common/select/customSelect`

| 匯出 | 說明 |
| --- | --- |
| `setSelect(containers?)` | 初始化頁面上所有（或指定的）`.custom-select` 容器 |
| `closeAllSelect(currentElement?)` | 關閉所有自定義選擇器（排除指定元素） |
| `clearSelect(container)` | 清除容器內的自定義選擇器 DOM |

**用途**：將原生 `<select>` 包裝成具有鍵盤操作、ARIA 無障礙屬性及自定義樣式的下拉選單。支援連結型選擇器（`data-select-link`）與 `custom-select:update` 自定義事件同步。

**HTML data 屬性**

| 屬性 | 用途 |
| --- | --- |
| `data-select-link` | 標記為連結型選擇器（選項為 `<a>` 而非 `<div>`） |
| `data-disabled` | 標記選項為禁用狀態 |

---

### `swiper/swiper.ts`

> **實際被 import**：`@js/components/common/swiper/swiper`

| 匯出 | 說明 |
| --- | --- |
| `mySwiper(el, opts?)` | 立即建立 Swiper 實例，自動偵測 pagination / navigation DOM |
| `mySwiperListen(el, options?)` | 監聽 `build.swiper` 自定義事件後再建立 Swiper 實例，回傳 Promise |

**用途**：全站 Swiper 初始化入口。`mySwiperListen` 用於需要在執行時期動態傳入設定的情境（例如 slides 數量、breakpoints 由後端資料決定）。

**自定義事件**

| 事件 | 說明 |
| --- | --- |
| `build.swiper` | 在 Swiper 元素上 dispatch，`detail` 為 `Partial<SwiperOptions>`，用於延遲傳入設定 |

---

### `toast/toast.ts`

> **實際被 import**：`@js/components/common/toast/toast`（透過 `common/toast/toast.astro` 引用）

| 匯出 | 說明 |
| --- | --- |
| `Toast` | Toast 提示類別（底層使用 `Modal`） |
| `options` | Toast 設定選項型別 |
| `links` | Toast 按鈕連結型別 |

**Toast 公開方法**

| 方法 | 說明 |
| --- | --- |
| `constructor(selector?, timeout?)` | 初始化，可指定觸發按鈕與自動關閉時間（ms） |
| `fire(options?)` | 以程式方式開啟 Toast，支援 `title`、`text`、`icon`、`link`（雙按鈕）等選項 |
| `click()` | 纁定按鈕點擊事件開啟 Toast，回傳 Promise（關閉後 resolve） |
| `clickByAll()` | 批次纁定所有 `[data-toast][data-toast-trigger="click"]` 按鈕 |
| `on(Event, callback)` | 代理至底層 `Modal.on()` |
| `addMethod()` | 注冊 `fire` 自定義事件及關閉按鈕事件 |

**用途**：解決方案明細頁「加入諮詢夾」成功提示（`toast.astro`）。

---

## `data/` — 靜態資料

### `navs.ts`

> **實際被 import**：`@js/data/navs`

| 匯出 | 說明 |
| --- | --- |
| `NavsData` | 全站主導覽資料陣列，供 Header Nav 元件消費 |
| `NavsData` (type) | 頂層導覽項目型別（一級選單） |
| `NavsDataChild` (type) | 導覽子項目型別（二級選單，含 children 連結群組） |

---

## `helpers/` — 工具函數與 Hooks

### `env.ts`

> **實際被 import**：`@js/helpers/env`

| 匯出 | 說明 |
| --- | --- |
| `ext` | 靜態產出模式（GitLab Pages）下的頁面副檔名（`.html`），主機模式為空字串 |
| `index` | 靜態產出模式下首頁檔名（`index`），主機模式為空字串 |

**用途**：在需要動態組合 URL 的元件中，依建置模式決定連結格式。

---

### `helpers/hook/useCheckboxGroup.ts`

> **實際被 import**：`@js/helpers/hook/useCheckboxGroup`

| 匯出 | 說明 |
| --- | --- |
| `useCheckboxGroup(options?)` | 初始化頁面上所有 `[data-checkbox-group]` 的主子 checkbox 雙向同步 |
| `CheckboxGroupOptions` | Hook 設定選項型別 |

**用途**：會員頁等有「全選 / 部分選」需求的 Table checkbox 群組，自動處理 `indeterminate` 狀態。

**HTML data 屬性**

| 屬性 | 用途 |
| --- | --- |
| `data-checkbox-group` | 標記 checkbox 群組的根容器 |
| `data-checkbox-main` | 標記主 checkbox（控制全選/全不選） |

---

### `helpers/hook/useScrollSpy.ts`

> **實際被 import**：`@js/helpers/hook/useScrollSpy`

| 匯出 | 說明 |
| --- | --- |
| `useScrollSpy(options?)` | 建立 ScrollSpy 實例，回傳含 `trigger()`、`scroll()`、`spy()` 的物件 |

**回傳方法**

| 方法 | 說明 |
| --- | --- |
| `trigger()` | 纁定所有 `[data-spy]` 元素的點擊事件，點擊後平滑滾動至目標錨點 |
| `scroll(target?, offset?, smoothScroll?)` | 程式呼叫：滾動到指定元素 |
| `spy()` | 啟動捲動監聽，自動更新 `[data-spy]` 的 `active` 狀態；回傳清理函數 |

**設定選項**

| 選項 | 型別 | 說明 |
| --- | --- | --- |
| `offsetRatio` | `number` | 位置乘數（預設 `1`） |
| `offset` | `number \| string \| HTMLElement` | 額外偏移量（支援數字、CSS 選擇器、DOM 元素） |
| `includeHeaderHeight` | `boolean` | 是否自動扣除 Header 高度 |
| `activeClass` | `string` | 替換預設 `active` class 的名稱 |
| `threshold` | `number` | 元素可見度閾值（`0.0`–`1.0`，預設 `0` 表示進入視窗即觸發） |
| `Element` | `HTMLElement` | `scroll()` 的預設目標元素 |

**HTML data 屬性**

| 屬性 | 用途 |
| --- | --- |
| `data-spy` | 標記觸發捲動的按鈕，值為目標錨點的 CSS 選擇器（或使用 `href`） |
| `data-target` | 替代 `href` 的目標選擇器 |
| `data-offset` | 覆蓋此按鈕的偏移量（數字 px 或 CSS 選擇器） |
| `data-smooth-scroll` | 設為 `"false"` 可停用平滑滾動 |

**用途**：「關於我們」、「合作夥伴明細」等需要 scroll spy 上方 Tab 導覽的頁面。

---

## 未被直接 import 但存在的模組

以下模組目前存在於 `src/js` 但尚未被任何頁面或元件直接 import（可能為備用或開發中）：

| 路徑 | 說明 |
| --- | --- |
| `components/common/collapse/useBsCollapse.ts` | Bootstrap Collapse 封裝 |
| `components/common/datepicker/datepicker.ts` | 日期選擇器封裝 |
| `helpers/function/index.ts` | 通用工具函數 |
| `helpers/function/pascal-case.ts` | 字串 PascalCase 轉換 |
| `helpers/hook/index.ts` | Hooks 彙整入口 |
| `helpers/hook/useAddress.ts` | 地址選擇 Hook（縣市/區鄉鎮聯動） |
| `helpers/hook/useClassWatcher.ts` | DOM class 異動監聽 Hook |
| `helpers/hook/useCollapse.ts` | 自定義 Collapse 行為 Hook |
| `helpers/hook/useFormValidator.ts` | 表單驗證 Hook |
| `helpers/hook/useNumber.ts` | 數字輸入格式化 Hook |
| `helpers/hook/useSameInfo.ts` | 表單欄位「同上」填入 Hook |
| `helpers/hook/useToggleBlocks.ts` | 區塊切換 Hook（輕量版） |
| `helpers/hook/useWebpDetect.ts` | WebP 格式偵測 Hook |
| `data/address/counties-tw.json` | 台灣縣市區鄉鎮資料（繁中） |
| `data/address/counties-en.json` | 台灣縣市區鄉鎮資料（英文） |
| `data/contactus.ts` | 聯絡我們表單靜態資料 |
| `data/privacy.ts` | 隱私權政策內容資料 |
| `data/social-media.ts` | 社群媒體連結資料 |
