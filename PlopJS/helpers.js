/** Modules */
import fs from 'node:fs';
/** Data */
import { data as routerData } from './router.js';

export const IDName = (name) => {
    let realName = '';
    realName = name.replace('[...id]', 'Detail').replace('index', '').split('/');
    realName = realName.map((name) => name.charAt(0).toUpperCase() + name.slice(1)).join('');
    return realName;
};
export const getCPNamePath = (cp, prefix = '') => {
    const nameArr = cp.split('/');
    const name = nameArr[nameArr.length - 1].replace('.astro', '');
    const realName = name.charAt(0).toUpperCase() + name.slice(1);
    return `import ${prefix}${realName} from '${cp}';`;
};
export const pageURL = (path) => `../src/pages/${path}.astro`;
export const pageCssURL = (path) => `${path}.scss`;
export const CPURL = (path) => `../src/components/pages/${path}.astro`;
export const excludeFrom = ({ data, path, x }) => {
    if (data?.components?.includes(x)) return CPURL(`${path.replace('[...id]', '[id]')}/${x}`);
    if (data?.common?.includes(x)) return CPURL(`${path.replace('[...id]', '[id]')}/common/${x}`);
    return undefined;
};
export const CPResponse = ({ data, path, global }) => ({
    path,
    url: pageURL(path),
    css: pageCssURL(path),
    global,
    components: data.components?.map((x) => !!x && CPURL(`${path.replace('[...id]', '[id]')}/${x}`)),
    common: data.common?.map((x) => !!x && CPURL(`${path.replace('[...id]', '[id]')}/common/${x}`)),
    exclude: data.exclude?.map((x) => !!x && excludeFrom({ data, path, x }))
});
export const result = (data) => {
    return data
        .filter((x) => !!x.page?.path)
        .flatMap((x) => {
            const global = x.global?.map((g) => CPURL(`${x.page.path}/global/${g}`));
            if (x.hasOwnProperty('child')) {
                return [CPResponse({ data: x.page, path: `${x.page.path}/index`, global })].concat(
                    x.child.filter((y) => !!y.path).map((y) => CPResponse({ data: y, path: `${x.page.path}/${y.path}`, global }))
                );
            } else return CPResponse({ data: x.page, path: `${x.page.path}`, global });
        });
};

export const pages = result(routerData).map((x) => ({
    type: 'add',
    path: x.url,
    templateFile: './templates/page.hbs',
    abortOnFail: false,
    data: {
        ImportMyComponents:
            '/** Main Components */\n' +
            (x?.components
                ?.filter((y) => !x.exclude?.includes(y))
                .map((y) => getCPNamePath(y.replace('../src/components/', '@components/')))
                .join('\n') || ''),
        ImportCommonComponents:
            '/** Common Components */\n' +
            (x?.common
                ?.filter((y) => !x.exclude?.includes(y))
                .map((y) => getCPNamePath(y.replace('../src/components/', '@components/'), 'Common'))
                .join('\n') || ''),
        ImportGlobalComponents:
            '/** Global Components */\n' +
            (x?.global
                ?.filter((y) => !x.exclude?.includes(y))
                .map((y) => getCPNamePath(y.replace('../src/components/', '@components/'), 'Global'))
                .join('\n') || ''),
        ImportMyCss: '/** Style */\n' + `import '@scss/pages/${x.css}';`,
        IDName: `"${IDName(x.path)}"`
    }
}));

export const pagesCss = result(routerData).map((x) => ({
    type: 'add',
    path: `../src/scss/pages/${x.css}`,
    templateFile: './templates/scss.hbs',
    abortOnFail: false,
    data: {
        IDName: `#${IDName(x.path)} {}`
    }
}));

export const components = [
    ...new Set(result(routerData).flatMap((x) => [].concat(x.global, x.components, x.common).filter((x) => !!x)))
].map((x) => ({
    type: 'add',
    path: x,
    templateFile: './templates/components.hbs',
    abortOnFail: false,
    data: {
        ImportMyCss:
            '/** Style */\n' +
            `import './${x
                .replaceAll('.astro', '.scss')
                .split(/(\\|\/)/g)
                .pop()}';`
    }
}));

export const componentsCss = [
    ...new Set(result(routerData).flatMap((x) => [].concat(x.global, x.components, x.common).filter((x) => !!x)))
].map((x) => ({
    type: 'add',
    path: x.replaceAll('.astro', '.scss'),
    templateFile: './templates/scss.hbs',
    abortOnFail: false
}));

fs.writeFileSync('./PlopJS/log/result.js', `const data = ${JSON.stringify([...new Set(result(routerData))])}`, {
    encoding: 'utf8'
});
fs.writeFileSync('./PlopJS/log/components.js', `const data = ${JSON.stringify([...new Set(components)])}`, { encoding: 'utf8' });
fs.writeFileSync('./PlopJS/log/componentsCss.js', `const data = ${JSON.stringify([...new Set(componentsCss)])}`, {
    encoding: 'utf8'
});
fs.writeFileSync('./PlopJS/log/pages.js', `const data = ${JSON.stringify([...new Set(pages)])}`, { encoding: 'utf8' });
fs.writeFileSync('./PlopJS/log/pagesCss.js', `const data = ${JSON.stringify([...new Set(pagesCss)])}`, { encoding: 'utf8' });
