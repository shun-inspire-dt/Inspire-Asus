# 後端快速替換檔案之腳本說明書

* 啟動腳本：
  * `npm run pull`
  * `yarn run pull`
  * `pnpm run pull`
腳本會本身會 run `git pull origin main && node ./server/fs/index.mjs` Git pull 加跑 `index.mjs` 這個檔案，
描述在 `package.json` 的 `script` 裡。

## Node JS 配置

* Node JS 確保 v16 以上
* 這次所使用之 modules：prompts、fs_extra、cheerio、prettier
* 沒有以上套件可直接安裝：`npm install -g prompts fs_extra cheerio prettier` (需要權限用`sudo`)

## 後端配置

`config.mjs` 有基本設定需要先設定，或是之後透過窗口設定，但必須`save`才能永久設定。
我已經有預先設定在檔案裡面。

```=javascript
export const OUTPUT_PROJECT_PATH = '/var/www/html/metamatch-backend';
export const OUTPUT_TEMPLATE_PATH = '/app/views/web/custom';
export const OUTPUT_PUBLIC_PATH = '/public/templates/custom';
export const OUTPUT_PUBLIC_PATH_PREFIX = '<?= $_webTemplateFrontFloder; ?>';
export const PUBLIC_FOLDER_BACKUP = false;
export const PUBLIC_FOLDER_DELETE = true;
export const BEAUTY_HTML = false;
```

* **OUTPUT_PROJECT_PATH**：專案的絕對位置。
* **OUTPUT_TEMPLATE_PATH**：專案 html 的絕對位置。
* **OUTPUT_PUBLIC_PATH**：專案 public 的絕對位置。
* **OUTPUT_PUBLIC_PATH_PREFIX**：html script src 路徑的 php 變數前綴。
* **PUBLIC_FOLDER_BACKUP**：是否在後端專案位置對舊檔案進行拷貝。
* **PUBLIC_FOLDER_DELETE**：是否先刪除檔案在覆蓋(true)，或是直接覆蓋(false)。
* **BEAUTY_HTML**：拷貝過去的整個 html 是否美化格式。

---

我有預先列出前端的頁面，你在補上後端的頁面。

* `id`為**必填**，`id`為對應前端檔案的`id`所用。
* 由於前端單頁可能在後端是多頁，取決於後端設計，所以以ID作為標準，即只要標示後端頁面是配哪一個前端頁面即可。
* inputFiles 會附上說明。

```=typescript
/** 為後端(對象)的 html */
export const outputFiles = [
    { id: string, link: string },
    ...
];
/** 為前端的 html */
export const inputFiles = [
    { id: string, link: string },
    ...
]
```

## 窗口

* 照片出處：<https://imgur.com/a/VFkXRlx>

1. 如果基本設定有設定，可以直接執行，如果沒有可以繼續以下問題。
![Alt text](https://lh3.googleusercontent.com/drive-viewer/AK7aPaAu0bwbWfwwMQIzalMDzl9fuAgg10hcbKACpRTPaRrprDoBGzhXQpx7xNUFjV7Jqs1sC1UQYYPKKgSFuQa4NO3x41VhIA=s2560)

1. 後端專案的靜態檔需不需要拷貝一份，起來資料夾名稱例如 => `bk-2023-11-03-18:9:20`。
![Alt text](https://lh3.googleusercontent.com/drive-viewer/AK7aPaAeTKZkE1sT8Z4wYwkq1uDII3b-6PrOn62XGUeDfMSEdNqgNqOLpAtO3hv6yxUoYGZtYUHEg3kVZaoZy5eFx4JhIphs=s2560)

1. 是否刪除檔案在覆蓋(yes)，或是直接覆蓋(no)，如果不刪除直接覆蓋，前端如果有刪除不必要的檔案，後端 `public` 會持續保留。
![Alt text](https://lh3.googleusercontent.com/drive-viewer/AK7aPaDsfHZ6pM_t4he58Nk1ruL4l-YPRkmVBHmRHoqRquKN4TNTqCuctuhlhuYdWi6o02CBPqN6UB5kccmJQidU6AjFORf6MA=s2560)

1. 是否需要 Format HTML
![Alt text](https://lh3.googleusercontent.com/drive-viewer/AK7aPaDPEqwMLXmpKDgPPlUtt5sDEFq1jr7t5tEAPSnswWDpra540Xh8JDiTSSArfVeubdQjbQqr_C2Gn1cGIunOcFw1SB8kCQ=s2560)

1. 專案路徑
![Alt text](https://lh3.googleusercontent.com/drive-viewer/AK7aPaC08UutcmD-5BlVG1ucrYaou-dIPuweN2bOiNGgbwmhTeYv627jINQ31yCtD4V-XhLVD_zry7n6ltahWo12bpV0B22ESg=s2560)

1. HTML 檔案路徑
![Alt text](https://lh3.googleusercontent.com/drive-viewer/AK7aPaARy8TKQlj-7rramM3SGhNyAWD848TGP3q0Sk3L92B0ivzo8b_EszCv4XNcYMJiYpFY5DMxBPUtNz2s9kDp8ULULhgpbg=s2560)

1. Public 檔案路徑
![Alt text](https://lh3.googleusercontent.com/drive-viewer/AK7aPaCAWR3OoCik1OhZ8KTl165BcBKZcCFh5A8rWkCnAVJRBeAz9DI-G2fgIyaNsigztsHtVoy238chUe8BBCmCzZR6E3I1=s2560)

1. src 載入腳本 php 路徑變數，例如：`<script type="module" src="<?= $_webTemplateFrontFloder; ?>/js/...."></script>`
![Alt text](https://lh3.googleusercontent.com/drive-viewer/AK7aPaARFidKia4GckpQrRiuCDepnbX-aRwh2Gms5utIjWI-700aqiXQkeNIgm4OpEU1HMNMVnS9YrV_qUJyEaZy8kQ2pDkV4w=s1600)

1. 是否 `save` 以便下次**直接執行**
![Alt text](https://lh3.googleusercontent.com/drive-viewer/AK7aPaCrOLbGJ1iOznqBOMgQ1AbAFbg-r16W6gMJf_SgfdUvFDCc8G7jJVEWyoGG2LHvGsGfoNsj8Cl_I5f4rrHBTB6tjnES=s1600)
