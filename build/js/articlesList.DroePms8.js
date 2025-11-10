import{c as createAstro,a as createComponent,m as maybeRenderHead,b as addAttribute,s as spreadAttributes,r as renderScript,e as renderTemplate,d as renderComponent,f as renderSlot}from"./astro/server.QBXP0SM9.js";import{d as $$Collapse,a as $$Button,e as $$Offcanvas,c as $$Link}from"./layouts.Bpyq1lYE.js";const $$Astro$e=createAstro("https://www.Asus.com.tw"),$$Follower=createComponent(((t,e,s)=>{const o=t.createAstro($$Astro$e,e,s);o.self=$$Follower;const{IDName:r="Follower",className:a,style:n,attribute:i={}}=o.props;return renderTemplate`${maybeRenderHead()}<div${addAttribute(r,"id")}${addAttribute([a,"follower"],"class:list")}${addAttribute(n,"style")}${spreadAttributes(i)}>
    <button type="button" title="Go Top" class="follower-button">
        <svg width="25" height="15" viewBox="0 0 25 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.0879 12.4816L12.4813 1.875L1.87469 12.4816" stroke="white" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
        <svg width="19" height="11" viewBox="0 0 19 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.9316 9.15317L9.15347 1.375L1.37529 9.15317" stroke="white" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </button>
</div>

${renderScript(t,"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/follower/follower.astro?astro&type=script&index=0&lang.ts")}`}),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/follower/follower.astro",void 0),$$Astro$d=createAstro("https://www.Asus.com.tw"),$$Title=createComponent(((t,e,s)=>{const o=t.createAstro($$Astro$d,e,s);o.self=$$Title;const{IDName:r,className:a,style:n,attribute:i={},Tag:d="h1",title:l="Title"}=o.props;return renderTemplate`${renderComponent(t,"Tag",d,{id:r,"class:list":[a,"section-title"],style:n,...i},{default:t=>renderTemplate`${l}`})}`}),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/section/title.astro",void 0),$$Astro$c=createAstro("https://www.Asus.com.tw"),$$Select=createComponent(((t,e,s)=>{const o=t.createAstro($$Astro$c,e,s);o.self=$$Select;const{id:r,data:a=[],className:n,required:i,disabled:d,name:l,value:c,placeholder:u="請選擇",title:p,size:$="md",status:m,validClass:h,validType:w,validLabel:g,customValidText:A,customInvalidText:v,onchange:b,attribute:f={},style:k={}}=o.props,y={"data-valid-class":h,"data-valid-type":w,"data-valid-label":g,"data-custom-valid-text":A,"data-custom-invalid-text":v},x=["control-input","control-select",{[`size-${$}`]:$},{[`status-${m}`]:m},n].filter(Boolean);return renderTemplate`${maybeRenderHead()}<select${addAttribute(r,"id")}${addAttribute(x,"class:list")}${addAttribute(l,"name")}${addAttribute(c,"value")}${addAttribute(i,"required")}${addAttribute(d,"disabled")}${addAttribute(k,"style")}${addAttribute(b,"onchange")}${addAttribute(p,"aria-label")}${spreadAttributes(f)}${spreadAttributes(y)}>
    ${renderSlot(t,s.index,renderTemplate`
        <option class="control-select-placeholder" value=""${addAttribute(!!c,"disabled")}${spreadAttributes(c?{}:{selected:""})}>
            ${u}
        </option>
    

    ${renderSlot(t,s.default,renderTemplate`
        ${a.map((t=>renderTemplate`<option${addAttribute(t.value,"value")}${addAttribute(c===t.value,"selected")}${spreadAttributes(t.attribute)}>
                    ${t.text}
                </option>`))}
    `)}
`)}</select>

${renderScript(t,"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/form/select/select.astro?astro&type=script&index=0&lang.ts")}`}),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/form/select/select.astro",void 0),$$Astro$b=createAstro("https://www.Asus.com.tw"),$$CustomSelect=createComponent(((t,e,s)=>{const o=t.createAstro($$Astro$b,e,s);o.self=$$CustomSelect;const{id:r,data:a=[],className:n,selectClassName:i,required:d,disabled:l,name:c,value:u,placeholder:p="請選擇",title:$,size:m="md",status:h,validClass:w,validType:g,validLabel:A,customValidText:v,customInvalidText:b,onchange:f,attribute:k={},selectAttribute:y={},style:x={},selectStyle:P={},custom:C=!0}=o.props;return renderTemplate`${maybeRenderHead()}<div${addAttribute([{"custom-select":C},n],"class:list")}${spreadAttributes(k)}${addAttribute(x,"style")}>
    ${renderComponent(t,"Select",$$Select,{id:r,data:a,className:[{"custom-origin-select":C},i],required:d,disabled:l,name:c,value:u,title:$,size:m,status:h,placeholder:p,validClass:w,validType:g,validLabel:A,customValidText:v,customInvalidText:b,onchange:f,attribute:y,style:P})}
</div>

${renderScript(t,"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/form/select/customSelect.astro?astro&type=script&index=0&lang.ts")}`}),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/form/select/customSelect.astro",void 0),$$Astro$a=createAstro("https://www.Asus.com.tw"),$$SortSelector=createComponent(((t,e,s)=>{const o=t.createAstro($$Astro$a,e,s);o.self=$$SortSelector;const{IDName:r,className:a,style:n,attribute:i={},data:d}=o.props;return renderTemplate`${maybeRenderHead()}<div${addAttribute(r,"id")}${addAttribute([a,"sort-selector"],"class:list")}${addAttribute(n,"style")}${spreadAttributes(i)}>
    <span class="sort-selector-label">排序：</span>
    ${renderComponent(t,"Select",$$CustomSelect,{status:"sort",size:"sm",data:d,style:{minWidth:"9.5rem"}})}
</div>`}),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/sort/sortSelector.astro",void 0),$$Astro$9=createAstro("https://www.Asus.com.tw"),$$Sort=createComponent(((t,e,s)=>{const o=t.createAstro($$Astro$9,e,s);o.self=$$Sort;const{IDName:r,className:a,style:n,attribute:i={},total:d,data:l}=o.props;return renderTemplate`${maybeRenderHead()}<div${addAttribute(r,"id")}${addAttribute([a,"sort"],"class:list")}${addAttribute(n,"style")}${spreadAttributes(i)}>
    <span class="sort-result">篩選結果: ${d} 結果</span>
    <div class="sort-selector-container">
        ${renderComponent(t,"SortSelector",$$SortSelector,{data:l})}
    </div>
</div>`}),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/sort/sort.astro",void 0),$$Astro$8=createAstro("https://www.Asus.com.tw"),$$NotificationIcon=createComponent(((t,e,s)=>{const o=t.createAstro($$Astro$8,e,s);o.self=$$NotificationIcon;const{IDName:r,className:a,size:n="16",status:i="solid",style:d,attribute:l={}}=o.props,c=["notification-icon",{[`size_${n}`]:n},{[`status-${i}`]:i},a].filter(Boolean);return renderTemplate`${maybeRenderHead()}<span${addAttribute(r,"id")}${addAttribute(c,"class:list")}${addAttribute(d,"style")}${spreadAttributes(l)}>
    <span>
        ${"13"===n&&renderTemplate`<svg width="2" height="9" viewBox="0 0 2 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.75 3.75C1.75 3.33579 1.41421 3 1 3C0.585786 3 0.25 3.33579 0.25 3.75V7.75C0.25 8.16421 0.585786 8.5 1 8.5C1.41421 8.5 1.75 8.16421 1.75 7.75V3.75Z" fill="var(--color-white, #fff)"></path>
                    <path d="M2 1C2 0.447715 1.55228 0 1 0C0.447715 0 0 0.447715 0 1C0 1.55228 0.447715 2 1 2C1.55228 2 2 1.55228 2 1Z" fill="var(--color-white, #fff)"></path>
                </svg>`}
        ${"16"===n&&renderTemplate`<svg width="2" height="9" viewBox="0 0 2 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1.75" y="5.5" width="1.5" height="5.5" rx="0.75" transform="rotate(-180 1.75 5.5)" fill="var(--color-white, #fff)"></rect>
                    <rect x="2" y="8.5" width="2" height="2" rx="1" transform="rotate(-180 2 8.5)" fill="var(--color-white, #fff)"></rect>
                </svg>`}
        ${"24"===n&&renderTemplate`<svg width="2" height="14" viewBox="0 0 2 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L1 8" stroke="var(--color-white, #fff)" stroke-width="2" stroke-linecap="round"></path>
                    <path d="M1 12L1 13" stroke="var(--color-white, #fff)" stroke-width="2" stroke-linecap="round"></path>
                </svg>`}
    </span>
</span>`}),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/icons/notification/notificationIcon.astro",void 0),$$Astro$7=createAstro("https://www.Asus.com.tw"),$$Notice=createComponent(((t,e,s)=>{const o=t.createAstro($$Astro$7,e,s);o.self=$$Notice;const{IDName:r,className:a,style:n,attribute:i={},text:d="選擇篩選條件會重整結果，並可能影響其他選項的可用性。"}=o.props;return renderTemplate`${maybeRenderHead()}<div${addAttribute(r,"id")}${addAttribute([a,"filter-notification"],"class:list")}${addAttribute(n,"style")}${spreadAttributes(i)}>
    ${renderComponent(t,"Icon",$$NotificationIcon,{size:"16",style:{"--color":"var(--color-blue-600, #0051A8)"}})}
    <span class="flex-1">${d}</span>
</div>`}),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/notice/notice.astro",void 0),$$Astro$6=createAstro("https://www.Asus.com.tw"),$$Checkbox=createComponent(((t,e,s)=>{const o=t.createAstro($$Astro$6,e,s);o.self=$$Checkbox;const{id:r,className:a,name:n,required:i,disabled:d,readonly:l,label:c,value:u,checked:p,title:$,rounded:m,validClass:h,validType:w,validLabel:g,customValidText:A,customInvalidText:v,setRequired:b,attribute:f={},aria:k={},style:y,indeterminate:x,alignment:P}=o.props,C={"data-valid-class":h,"data-valid-type":w?`${w}|checkbox`:void 0,"data-valid-label":g,"data-custom-valid-text":A,"data-custom-invalid-text":v};return renderTemplate`<!-- 複選框容器 - 支援標準和圓角樣式 -->${maybeRenderHead()}<div${addAttribute(["form-check",{"rounded-check":m,"indeterminate-check":x,"form-check-right":"right"===P},a],"class:list")}${addAttribute(y,"style")}>
    <!-- 複選框輸入元素 -->
    <input${addAttribute(r,"id")} class="form-check-input" type="checkbox"${addAttribute(u,"value")}${addAttribute(n,"name")}${addAttribute(d,"disabled")}${addAttribute(i,"required")}${addAttribute(p,"checked")} autocomplete="off"${spreadAttributes(l?{onclick:"return false;"}:{})}${addAttribute(b,"data-set-required")}${spreadAttributes(f)}${spreadAttributes(k)}${addAttribute($,"aria-label")}${spreadAttributes(C)}>
    <!-- 標籤文字 - 支援插槽內容或 label 屬性 -->
    <label class="form-check-label"${addAttribute(r,"for")}>
        ${renderSlot(t,s.default,renderTemplate`${c}`)}
    </label>
</div>

${renderScript(t,"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/form/checkboxs/checkbox.astro?astro&type=script&index=0&lang.ts")}`}),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/form/checkboxs/checkbox.astro",void 0),$$Astro$5=createAstro("https://www.Asus.com.tw"),$$Filter=createComponent(((t,e,s)=>{const o=t.createAstro($$Astro$5,e,s);o.self=$$Filter;const{IDName:r,className:a,style:n,attribute:i={},title:d,show:l,more:c,data:u=[]}=o.props,p=r||`filter-${Math.random().toString(36).substr(2,9)}`,$=`filter-input-${Math.random().toString(36).substr(2,9)}`;return renderTemplate`${renderComponent(t,"Collapse",$$Collapse,{IDName:p,className:a,style:n,attribute:i,title:d,show:l},{default:t=>renderTemplate`
    ${maybeRenderHead()}<div class="filter-content">
        ${u?.map(((e,s)=>renderTemplate`${renderComponent(t,"Checkbox",$$Checkbox,{id:`${$}-${s}`,label:e.label,value:e.value,checked:e.checked,disabled:e.disabled,style:{...c&&s>4?{display:"none"}:{}}})}`))}
        ${c&&renderTemplate`<div>
                    ${renderComponent(t,"Button",$$Button,{variant:"blue-outline",title:"更多",size:"sm",attribute:{"data-toggle":"toggle","data-target":"filter-collapse"}},{default:t=>renderTemplate`
                        更多
                    `})}
                </div>`}
    </div>
`})}

${renderScript(t,"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/collapse/filter.astro?astro&type=script&index=0&lang.ts")}`}),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/collapse/filter.astro",void 0),$$Astro$4=createAstro("https://www.Asus.com.tw"),$$Category=createComponent(((t,e,s)=>{const o=t.createAstro($$Astro$4,e,s);o.self=$$Category;const{IDName:r,className:a,style:n,attribute:i={},data:d=[]}=o.props;return renderTemplate`${maybeRenderHead()}<div${addAttribute(r,"id")}${addAttribute([a,"category"],"class:list")}${addAttribute(n,"style")}${spreadAttributes(i)}>
    ${renderComponent(t,"Notice",$$Notice,{})}
    <div data-filter>
        ${d?.map((e=>renderTemplate`${renderComponent(t,"Filter",$$Filter,{title:e.title,show:e.show,more:e.more,data:e.children})}`))}
    </div>
    ${renderComponent(t,"Button",$$Button,{variant:"blue",className:"category-back-button",size:"lg",title:"返回篩選",block:!0,attribute:{"data-toggle":"back","data-target":"[data-filter]"},style:{visibility:"hidden"}},{default:t=>renderTemplate`
        返回篩選
    `})}
</div>

${renderScript(t,"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/collapse/category.astro?astro&type=script&index=0&lang.ts")}`}),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/collapse/category.astro",void 0),$$Astro$3=createAstro("https://www.Asus.com.tw"),$$ArticleOffcanvas=createComponent(((t,e,s)=>{const o=t.createAstro($$Astro$3,e,s);o.self=$$ArticleOffcanvas;const{IDName:r="sectionArticle",className:a,style:n,attribute:i={},category:d}=o.props;return renderTemplate`${renderComponent(t,"MyOffcanvas",$$Offcanvas,{IDName:r,postion:"bottom",hideHeader:!0,className:["section-article-offcanvas",a],attribute:i,style:n},{default:t=>renderTemplate`
    ${maybeRenderHead()}<form action="" class="article-offcanvas-form">
        <div class="w-full flex items-baseline justify-between flex-none shrink-0 py-0.625rem px-1rem bg-white border-b border-gray-200">
            <strong class="font-roboto text-20 lh-125 font-medium">篩選結果</strong>
            ${renderComponent(t,"ALink",$$Link,{title:"清除全部"},{default:t=>renderTemplate`清除全部`})}
        </div>
        <div class="w-full flex-1 grow py-0.5rem px-1rem h-6.9375rem bg-white overflow-auto scrollbar">
            ${d?.map(((e,s)=>renderTemplate`${renderComponent(t,"Filter",$$Filter,{title:e.title,show:e.show,more:e.more,data:e.children,style:{...0===s?{"--collapse-border-width":"0"}:{}}})}`))}
        </div>
        <div class="w-full flex items-center justify-center gap-1rem flex-none shrink-0 p-1rem bg-white border-t border-gray-200 [&>button]:flex-1">
            ${renderComponent(t,"Button",$$Button,{type:"reset",size:"sm",variant:"blue-outline",title:"取消",block:!0,attribute:{"data-bs-dismiss":"offcanvas"}},{default:t=>renderTemplate`取消`})}
            ${renderComponent(t,"Button",$$Button,{type:"submit",size:"sm",variant:"blue",title:"提交",block:!0},{default:t=>renderTemplate`提交`})}
        </div>
    </form>
`})}`}),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/section/articleOffcanvas.astro",void 0),$$PaginationArrowDown12=createComponent(((t,e,s)=>renderTemplate`${maybeRenderHead()}<svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.75 0.75L5.625 4.875L10.5 0.75" stroke="var(--color-gray-900, #181818)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>`),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/icons/arrows/svg-astro/Pagination-Arrow-down-12.astro",void 0),$$PaginationArrowDown16=createComponent(((t,e,s)=>renderTemplate`${maybeRenderHead()}<svg width="15" height="7" viewBox="0 0 15 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.75 0.75L7.25 6.25L13.75 0.75" stroke="var(--color-gray-900, #181818)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>`),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/icons/arrows/svg-astro/Pagination-Arrow-down-16.astro",void 0),$$PaginationArrowDown24=createComponent(((t,e,s)=>renderTemplate`${maybeRenderHead()}<svg width="21" height="10" viewBox="0 0 21 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.75 0.75L10.25 9.25L19.75 0.75" stroke="var(--color-gray-900, #181818)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>`),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/icons/arrows/svg-astro/Pagination-Arrow-down-24.astro",void 0),$$PaginationArrowDown40=createComponent(((t,e,s)=>renderTemplate`${maybeRenderHead()}<svg width="32" height="14" viewBox="0 0 32 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.75 0.75L15.75 12.75L30.75 0.75" stroke="var(--color-gray-900, #181818)" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>`),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/icons/arrows/svg-astro/Pagination-Arrow-down-40.astro",void 0),$$PaginationArrowLeft12=createComponent(((t,e,s)=>renderTemplate`${maybeRenderHead()}<svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.875 10.5L0.75 5.625L4.875 0.75" stroke="var(--color-gray-900, #181818)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>`),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/icons/arrows/svg-astro/Pagination-Arrow-left-12.astro",void 0),$$PaginationArrowLeft16=createComponent(((t,e,s)=>renderTemplate`${maybeRenderHead()}<svg width="7" height="15" viewBox="0 0 7 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.25 13.75L0.75 7.25L6.25 0.75" stroke="var(--color-gray-900, #181818)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>`),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/icons/arrows/svg-astro/Pagination-Arrow-left-16.astro",void 0),$$PaginationArrowLeft24=createComponent(((t,e,s)=>renderTemplate`${maybeRenderHead()}<svg width="10" height="21" viewBox="0 0 10 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.25 0.75L0.75 10.25L9.25 19.75" stroke="var(--color-gray-900, #181818)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>`),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/icons/arrows/svg-astro/Pagination-Arrow-left-24.astro",void 0),$$PaginationArrowLeft40=createComponent(((t,e,s)=>renderTemplate`${maybeRenderHead()}<svg width="14" height="32" viewBox="0 0 14 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.75 30.75L0.75 15.75L12.75 0.75" stroke="var(--color-gray-900, #181818)" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>`),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/icons/arrows/svg-astro/Pagination-Arrow-left-40.astro",void 0),$$PaginationArrowRight12=createComponent(((t,e,s)=>renderTemplate`${maybeRenderHead()}<svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.75 10.5L4.875 5.625L0.75 0.75" stroke="var(--color-gray-900, #181818)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>`),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/icons/arrows/svg-astro/Pagination-Arrow-Right-12.astro",void 0),$$PaginationArrowRight16=createComponent(((t,e,s)=>renderTemplate`${maybeRenderHead()}<svg width="7" height="15" viewBox="0 0 7 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.75 13.75L6.25 7.25L0.75 0.75" stroke="var(--color-gray-900, #181818)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>`),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/icons/arrows/svg-astro/Pagination-Arrow-right-16.astro",void 0),$$PaginationArrowRight24=createComponent(((t,e,s)=>renderTemplate`${maybeRenderHead()}<svg width="10" height="21" viewBox="0 0 10 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.75 0.75L9.25 10.25L0.749999 19.75" stroke="var(--color-gray-900, #181818)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>`),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/icons/arrows/svg-astro/Pagination-Arrow-right-24.astro",void 0),$$PaginationArrowRight40=createComponent(((t,e,s)=>renderTemplate`${maybeRenderHead()}<svg width="14" height="32" viewBox="0 0 14 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.75 30.75L12.75 15.75L0.75 0.75" stroke="var(--color-gray-900, #181818)" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>`),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/icons/arrows/svg-astro/Pagination-Arrow-right-40.astro",void 0),$$PaginationArrowUp12=createComponent(((t,e,s)=>renderTemplate`${maybeRenderHead()}<svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5 4.875L5.625 0.75L0.75 4.875" stroke="var(--color-gray-900, #181818)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>`),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/icons/arrows/svg-astro/Pagination-Arrow-up-12.astro",void 0),$$PaginationArrowUp16=createComponent(((t,e,s)=>renderTemplate`${maybeRenderHead()}<svg width="15" height="7" viewBox="0 0 15 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.75 6.25L7.25 0.75L0.75 6.25" stroke="var(--color-gray-900, #181818)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>`),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/icons/arrows/svg-astro/Pagination-Arrow-up-16.astro",void 0),$$PaginationArrowUp24=createComponent(((t,e,s)=>renderTemplate`${maybeRenderHead()}<svg width="21" height="10" viewBox="0 0 21 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.75 9.25L10.25 0.75L19.75 9.25" stroke="var(--color-gray-900, #181818)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>`),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/icons/arrows/svg-astro/Pagination-Arrow-up-24.astro",void 0),$$PaginationArrowUp40=createComponent(((t,e,s)=>renderTemplate`${maybeRenderHead()}<svg width="32" height="14" viewBox="0 0 32 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M30.75 12.75L15.75 0.75L0.75 12.75" stroke="var(--color-gray-900, #181818)" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>`),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/icons/arrows/svg-astro/Pagination-Arrow-up-40.astro",void 0),$$Astro$2=createAstro("https://www.Asus.com.tw"),$$PaginationArrow=createComponent(((t,e,s)=>{const o=t.createAstro($$Astro$2,e,s);o.self=$$PaginationArrow;const{size:r="12",direction:a="down",color:n,width:i,className:d,style:l,...c}=o.props,u=["pagination-arrow",`pagination-arrow--${r}`,`pagination-arrow--${a}`,d].filter(Boolean).join(" "),p={"12-up":$$PaginationArrowUp12,"12-down":$$PaginationArrowDown12,"12-left":$$PaginationArrowLeft12,"12-right":$$PaginationArrowRight12,"16-up":$$PaginationArrowUp16,"16-down":$$PaginationArrowDown16,"16-left":$$PaginationArrowLeft16,"16-right":$$PaginationArrowRight16,"24-up":$$PaginationArrowUp24,"24-down":$$PaginationArrowDown24,"24-left":$$PaginationArrowLeft24,"24-right":$$PaginationArrowRight24,"40-up":$$PaginationArrowUp40,"40-down":$$PaginationArrowDown40,"40-left":$$PaginationArrowLeft40,"40-right":$$PaginationArrowRight40}[`${r}-${a}`],$={...i?{"--icon-width":(isNaN(i)?i:parseFloat(i)/16+"rem").toString()}:{},...n?{"--icon-color":"#"===n.charAt(0)?n:`var(--color-${n})`}:{},...l};return renderTemplate`${maybeRenderHead()}<span${addAttribute(u,"class")} data-pagination-arrow${addAttribute(r,"data-size")}${addAttribute(a,"data-direction")}${addAttribute($,"style")}${spreadAttributes(c)}>
    ${renderComponent(t,"SvgComponent",p,{})}
</span>`}),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/icons/arrows/paginationArrow.astro",void 0),$$Astro$1=createAstro("https://www.Asus.com.tw"),$$ShowMore=createComponent(((t,e,s)=>{const o=t.createAstro($$Astro$1,e,s);o.self=$$ShowMore;const{IDName:r,className:a,style:n,attribute:i={}}=o.props;return renderTemplate`${maybeRenderHead()}<div${addAttribute(r,"id")}${addAttribute([a,"show-more"],"class:list")}${addAttribute(n,"style")}${spreadAttributes(i)}>
    <button type="button" title="Show More"${addAttribute(["show-more-button"],"class:list")}>
        Show More
        ${renderComponent(t,"PaginationArrow",$$PaginationArrow,{size:"12",direction:"down",color:"blue-500"})}
    </button>
</div>`}),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/section/showMore.astro",void 0),$$Astro=createAstro("https://www.Asus.com.tw"),$$ArticlesList=createComponent(((t,e,s)=>{const o=t.createAstro($$Astro,e,s);o.self=$$ArticlesList;const{IDName:r,className:a,style:n,attribute:i={},title:d="",total:l=0,sortDate:c=[],category:u=[],mode:p="gray"}=o.props;return renderTemplate`${maybeRenderHead()}<div${addAttribute(r,"id")}${addAttribute([a,"section-articles-list",{"section-articles-dark-list":"gray"===p},{"section-articles-light-list":"white"===p}],"class:list")}${addAttribute(n,"style")}${spreadAttributes(i)}>
    <div class="container-fluid">
        ${renderComponent(t,"Title",$$Title,{title:d})}
        <div class="flex md:hidden items-end gap-0.5rem mb-1.5rem">
            <div class="grow">
                ${renderComponent(t,"SortSelector",$$SortSelector,{data:c})}
            </div>
            ${renderComponent(t,"Button",$$Button,{variant:"blue",size:"sm",title:"篩選",attribute:{"data-bs-toggle":"offcanvas","data-bs-target":`#${r}ArticleOffcanvas`,"aria-controls":`${r}ArticleOffcanvas`}},{default:t=>renderTemplate`
                篩選
            `})}
        </div>
        <div class="space-y-1.5rem">
            ${renderComponent(t,"Sort",$$Sort,{total:l,data:c})}
            <div class="flex flex-col md:flex-row md:gap-1.25rem">
                ${renderComponent(t,"Category",$$Category,{className:"article-category",data:u})}
                <div class="space-y-2rem">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-1.25rem">
                        ${renderSlot(t,s.default)}
                    </div>
                    ${renderComponent(t,"ShowMore",$$ShowMore,{})}
                </div>
            </div>
        </div>
    </div>
</div>
${renderComponent(t,"ArticleOffcanvas",$$ArticleOffcanvas,{IDName:`${r}Article`,category:u})}`}),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/section/articlesList.astro",void 0);export{$$ArticlesList as $,$$Follower as a,$$Title as b};