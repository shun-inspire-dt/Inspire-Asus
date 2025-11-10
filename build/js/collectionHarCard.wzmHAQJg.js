import{c as createAstro,a as createComponent,m as maybeRenderHead,b as addAttribute,s as spreadAttributes,f as renderSlot,e as renderTemplate,d as renderComponent,u as unescapeHTML}from"./astro/server.QBXP0SM9.js";import{$ as $$Picture}from"./banner.CPJwz7T4.js";import{$ as $$A,c as $$Link}from"./layouts.Bpyq1lYE.js";import{a as $$Calendar}from"./card.DxPfgYc1.js";const $$Astro$3=createAstro("https://www.Asus.com.tw"),$$Swiper=createComponent(((e,a,s)=>{const t=e.createAstro($$Astro$3,a,s);t.self=$$Swiper;const{IDName:r,className:i,swiperClassName:o,style:n,attribute:c={},pagination:l,navigation:d}=t.props;return renderTemplate`${maybeRenderHead()}<div${addAttribute(r?`${r}SwiperContainer`:void 0,"id")}${addAttribute(["swiper-container",i],"class:list")}${addAttribute(n,"style")}${spreadAttributes(c)}>
    ${d&&"outside"===d&&renderTemplate`<div class="swiper-buttons">
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
            </div>`}
    ${l&&"outside"===l&&renderTemplate`<div class="swiper-pagination"></div>`}
    <div${addAttribute(r?`${r}Swiper`:void 0,"id")}${addAttribute(["swiper",o],"class:list")}>
        ${l&&"inside"===l&&renderTemplate`<div class="swiper-pagination"></div>`}
        ${d&&"inside"===d&&renderTemplate`<div class="swiper-buttons">
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                </div>`}
        <div class="swiper-wrapper">
            ${renderSlot(e,s.default)}
        </div>
        ${renderSlot(e,s.outside)}
    </div>
</div>`}),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/swiper/swiper.astro",void 0),$$Astro$2=createAstro("https://www.Asus.com.tw"),$$NavigatiorArrow=createComponent(((e,a,s)=>{const t=e.createAstro($$Astro$2,a,s);t.self=$$NavigatiorArrow;const{IDName:r,className:i,style:o,attribute:n={},direction:c="left"}=t.props,l=r||`navigatior-arrow-${Math.random().toString(36).substr(2,9)}`;return renderTemplate`${maybeRenderHead()}<button${addAttribute(l,"id")} type="button"${addAttribute(["navigatior-arrow",i],"class:list")} title="navigator"${spreadAttributes(n)}${addAttribute({...o},"style")}>
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"${addAttribute({transform:{up:"rotate(-90deg)",down:"rotate(90deg)",left:"rotate(0deg)",right:"rotate(180deg)"}[c]},"style")}>
        <path d="M8.64994 2.0498L3.7002 6.99955L8.64994 11.9493" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
</button>`}),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/icons/arrows/navigatiorArrow.astro",void 0),$$Astro$1=createAstro("https://www.Asus.com.tw"),$$CollectionCard=createComponent(((e,a,s)=>{const t=e.createAstro($$Astro$1,a,s);t.self=$$CollectionCard;const{IDName:r,className:i,style:o,attribute:n={},title:c="華碩商用師電腦市佔開局奪冠！",label:l="科技與製造",breif:d="市調機構IDC最新報告，華碩商用電腦再次拿下2025年!",date:g="2025/11/07",logoImage:p="/assets/logos/Business-Vertical-Dark",img:m="/assets/images/pages/Article-card-image-1.png",link:$="",width:u="100%",showDate:w=!0,showLabel:A=!0,showBreif:v=!0,showLogo:h=!0,imgBreakpoints:b=[{width:1280,img:"/assets/images/pages/Article-card-image-1",densities:{"1x":"/assets/images/pages/Article-card-image-1","1.5x":"/assets/images/pages/Article-card-image-1","2x":"/assets/images/pages/Article-card-image-1"}},{width:731,img:"/assets/images/pages/Article-card-image-1",densities:{"1x":"/assets/images/pages/Article-card-image-1","1.5x":"/assets/images/pages/Article-card-image-1","2x":"/assets/images/pages/Article-card-image-1"}},{width:0,img:"/assets/images/pages/Article-card-image-1",densities:{"1x":"/assets/images/pages/Article-card-image-1","1.5x":"/assets/images/pages/Article-card-image-1","2x":"/assets/images/pages/Article-card-image-1"}}]}=t.props,C={...u?{"--card-width":(isNaN(u)?u:parseFloat(u)/16+"rem").toString()}:{},...o};return renderTemplate`${renderComponent(e,"A",$$A,{IDName:r,link:$,className:[i,"collection-card group"],style:C,attribute:n,title:c},{default:e=>renderTemplate`
    ${renderComponent(e,"Picture",$$Picture,{className:"collection-card-image",img:m,alt:c,loading:"lazy",decoding:"async",breakpoints:b,noWebp:!0})}
    ${maybeRenderHead()}<div class="collection-card-body">
        <div class="collection-card-overlay"></div>
        <div class="collection-card-content">
            ${w&&renderTemplate`<div class="collection-card-date">
                        ${renderComponent(e,"Calendar",$$Calendar,{color:"white"})}
                        <span class="collection-card-date-text">
                            ${g}
                        </span>
                    </div>`}
            <div class="collection-card-head">
                ${c&&renderTemplate`<strong class="collection-card-title">
                            ${c}
                        </strong>`}
                ${Boolean(A&&l)&&renderTemplate`<span class="collection-card-label">${unescapeHTML(l)}</span>`}
                ${Boolean(v&&d)&&renderTemplate`<span class="collection-card-breif">${unescapeHTML(d)}</span>`}
            </div>
            <div class="collection-card-footer">
                ${h&&renderTemplate`<div class="collection-card-logo">
                            ${renderComponent(e,"Picture",$$Picture,{img:p,alt:c,type:"svg",loading:"lazy",decoding:"async",noWebp:!0})}
                        </div>`}
                ${renderComponent(e,"ALink",$$Link,{link:$,className:"collection-card-link",title:"了解更多",size:"16",showArrow:!0,Tag:"span"})}
            </div>
        </div>
    </div>
`})}`}),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/pages/news/collectionCard.astro",void 0),$$Astro=createAstro("https://www.Asus.com.tw"),$$CollectionHarCard=createComponent(((e,a,s)=>{const t=e.createAstro($$Astro,a,s);t.self=$$CollectionHarCard;const{IDName:r,className:i,style:o,attribute:n={},title:c="華碩商用師電腦市佔開局奪冠！",label:l="科技與製造",breif:d="市調機構IDC最新報告，華碩商用電腦再次拿下2025年!",date:g="2025/11/07",logoImage:p="/assets/logos/Business-Vertical-Light",img:m="/assets/images/pages/Article-card-image-2.png",link:$="",width:u="100%",showDate:w=!0,showLabel:A=!0,showBreif:v=!0,showLogo:h=!0,showBottomBorder:b=!0,last:C=!1,imgBreakpoints:y=[{width:1280,img:"/assets/images/pages/Article-card-image-2",densities:{"1x":"/assets/images/pages/Article-card-image-2","1.5x":"/assets/images/pages/Article-card-image-2","2x":"/assets/images/pages/Article-card-image-2"}},{width:731,img:"/assets/images/pages/Article-card-image-2",densities:{"1x":"/assets/images/pages/Article-card-image-2","1.5x":"/assets/images/pages/Article-card-image-2","2x":"/assets/images/pages/Article-card-image-2"}},{width:0,img:"/assets/images/pages/Article-card-image-2",densities:{"1x":"/assets/images/pages/Article-card-image-2","1.5x":"/assets/images/pages/Article-card-image-2","2x":"/assets/images/pages/Article-card-image-2"}}]}=t.props,T={...u?{"--card-width":(isNaN(u)?u:parseFloat(u)/16+"rem").toString()}:{},...o};return renderTemplate`${renderComponent(e,"A",$$A,{IDName:r,link:$,className:[i,"collection-har-card group",{"collection-har-card-bottom-border":b&&!C},{"collection-har-card-last":C&&b}],style:T,attribute:n,title:c},{default:e=>renderTemplate`
    ${maybeRenderHead()}<div class="collection-har-card-image-container">
        ${renderComponent(e,"Picture",$$Picture,{className:"collection-har-card-image",img:m,alt:c,loading:"lazy",decoding:"async",breakpoints:y,noWebp:!0})}
    </div>
    <div class="collection-har-card-content">
        ${w&&renderTemplate`<div class="collection-har-card-date">
                    ${renderComponent(e,"Calendar",$$Calendar,{})}
                    <span class="collection-har-card-date-text">
                        ${g}
                    </span>
                </div>`}
        <div class="collection-har-card-head">
            ${c&&renderTemplate`<strong class="collection-har-card-title">
                        ${c}
                    </strong>`}
            ${Boolean(A&&l)&&renderTemplate`<span class="collection-har-card-label">${unescapeHTML(l)}</span>`}
            ${Boolean(v&&d)&&renderTemplate`<span class="collection-har-card-breif">${unescapeHTML(d)}</span>`}
        </div>
        <div class="collection-har-card-footer">
            ${h&&renderTemplate`<div class="collection-har-card-logo">
                        ${renderComponent(e,"Picture",$$Picture,{img:p,alt:c,type:"svg",loading:"lazy",decoding:"async",noWebp:!0})}
                    </div>`}
            ${renderComponent(e,"ALink",$$Link,{link:$,className:"collection-har-card-link",title:"了解更多",size:"16",showArrow:!0,Tag:"span"})}
        </div>
    </div>
`})}`}),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/pages/news/collectionHarCard.astro",void 0);export{$$CollectionCard as $,$$Swiper as a,$$NavigatiorArrow as b,$$CollectionHarCard as c};