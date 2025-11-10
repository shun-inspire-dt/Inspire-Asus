import{c as createAstro,a as createComponent,d as renderComponent,e as renderTemplate,m as maybeRenderHead,u as unescapeHTML}from"./astro/server.QBXP0SM9.js";import{$ as $$Picture}from"./banner.CPJwz7T4.js";import{$ as $$A,c as $$Link}from"./layouts.Bpyq1lYE.js";const $$Astro$1=createAstro("https://www.Asus.com.tw"),$$Calendar=createComponent(((e,s,a)=>{const r=e.createAstro($$Astro$1,s,a);r.self=$$Calendar;const{IDName:t,className:n,style:o,attribute:i={},Tag:c="span",width:d="24",color:l}=r.props,m={"--icon-width":(isNaN(d)?d:parseFloat(d)/16+"rem").toString(),...l?{"--icon-color":"#"===l.charAt(0)?l:`var(--color-${l})`}:{},...o};return renderTemplate`${renderComponent(e,"Tag",c,{id:t,"class:list":[n,"calendar-icon"],style:m,...i},{default:e=>renderTemplate`
    ${maybeRenderHead()}<svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 2.09961H16.5C16.9971 2.09961 17.4004 2.50294 17.4004 3V17C17.4004 17.4971 16.9971 17.9004 16.5 17.9004H1.5C1.00294 17.9004 0.599609 17.4971 0.599609 17V3C0.59961 2.50294 1.00294 2.09961 1.5 2.09961Z" stroke="currentColor" stroke-width="1.2"></path>
        <line y1="6.9" x2="18" y2="6.9" stroke="currentColor" stroke-width="1.2"></line>
        <line x1="5.4" y1="3.9" x2="5.4" y2="0.6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"></line>
        <line x1="12.9" y1="3.9" x2="12.9" y2="0.6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"></line>
    </svg>
`})}`}),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/common/icons/arrows/calendar.astro",void 0),$$Astro=createAstro("https://www.Asus.com.tw"),$$Card=createComponent(((e,s,a)=>{const r=e.createAstro($$Astro,s,a);r.self=$$Card;const{IDName:t,className:n,style:o,attribute:i={},title:c="華碩商用電腦市佔開局奪冠！全新「AI雙機」強化企業數位戰力",label:d="科技與製造",breif:l="Welcome to Burger Bliss, where we take your cravings to a whole new!\nWelcome to Burger Bliss.",date:m="2025/11/07",logoImage:g="/assets/logos/Business-Vertical-Light",img:p="/assets/images/pages/Article-card-image.png",link:$="",width:w="100%",showDate:u=!0,showLabel:h=!0,showBreif:A=!0,showLogo:C=!0,imgBreakpoints:k=[{width:1280,img:"/assets/images/pages/Article-card-image",densities:{"1x":"/assets/images/pages/Article-card-image","1.5x":"/assets/images/pages/Article-card-image","2x":"/assets/images/pages/Article-card-image"}},{width:731,img:"/assets/images/pages/Article-card-image",densities:{"1x":"/assets/images/pages/Article-card-image","1.5x":"/assets/images/pages/Article-card-image","2x":"/assets/images/pages/Article-card-image"}},{width:0,img:"/assets/images/pages/Article-card-image",densities:{"1x":"/assets/images/pages/Article-card-image","1.5x":"/assets/images/pages/Article-card-image","2x":"/assets/images/pages/Article-card-image"}}]}=r.props,v={...w?{"--card-width":(isNaN(w)?w:parseFloat(w)/16+"rem").toString()}:{},...o};return renderTemplate`${renderComponent(e,"A",$$A,{IDName:t,link:$,className:[n,"news-card group"],style:v,attribute:i,title:c},{default:e=>renderTemplate`
    ${maybeRenderHead()}<div class="news-card-image-container">
        ${renderComponent(e,"Picture",$$Picture,{className:"news-card-image",img:p,alt:c,loading:"lazy",decoding:"async",breakpoints:k,noWebp:!0})}
    </div>
    <div class="news-card-content">
        ${u&&renderTemplate`<div class="news-card-date">
                    ${renderComponent(e,"Calendar",$$Calendar,{})}
                    <span class="news-card-date-text">
                        ${m}
                    </span>
                </div>`}
        <div class="news-card-head">
            ${c&&renderTemplate`<strong class="news-card-title">
                        ${c}
                    </strong>`}
            ${Boolean(h&&d)&&renderTemplate`<span class="news-card-label">${unescapeHTML(d)}</span>`}
            ${Boolean(A&&l)&&renderTemplate`<span class="news-card-breif">${unescapeHTML(l)}</span>`}
        </div>
        <div class="news-card-footer">
            ${C&&renderTemplate`<div class="news-card-logo">
                        ${renderComponent(e,"Picture",$$Picture,{img:g,alt:c,type:"svg",loading:"lazy",decoding:"async",noWebp:!0})}
                    </div>`}
            ${renderComponent(e,"ALink",$$Link,{link:$,className:"news-card-link",title:"了解更多",size:"16",showArrow:!0,Tag:"span"})}
        </div>
    </div>
`})}`}),"/Users/wangzhengshun/Desktop/shunshun/Project/Asus/Asus-astro/src/components/pages/news/card.astro",void 0);export{$$Card as $,$$Calendar as a};