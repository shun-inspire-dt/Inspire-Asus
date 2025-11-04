module.exports = {
    plugins: [
        require.resolve("prettier-plugin-astro"),
    ],
    tabWidth: 4,
    semi: true,
    bracketSpacing: true,
    printWidth: 130,
    singleQuote: true,
    trailingComma: 'none',
    overrides: [
        {
            files: "*.astro",
            options: {
                parser: "astro",
            },
        },
    ],
}
