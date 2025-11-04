/** Data */
import { pages, pagesCss, components, componentsCss } from './helpers.js';

export default function (
    /** @type {import('plop').NodePlopAPI} */
    plop
) {
    plop.setGenerator('basic', {
        prompts: [
            {
                type: 'input',
                name: 'Astro',
                message: '準備建立組件，請問建立誰？:',
                default: 'page'
            }
        ],
        actions: (status) => {
            if (status?.Astro === 'page') {
                const result = [...new Set(pages), ...new Set(pagesCss)];
                return result;
            }
            if (status?.Astro === 'cp') {
                const result = [...new Set(components), ...new Set(componentsCss)];
                return result;
            }
            return [];
        }
    });
}
