const ext = import.meta.env.BASE_URL === '/./' ? '.html' : '';
const index = import.meta.env.BASE_URL === '/./' ? 'index' : '';

export { ext, index };
