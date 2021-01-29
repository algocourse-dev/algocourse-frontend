module.exports = {
    presets: [
        [
            'next/babel',
            {
                "preset-env": {},
                "transform-runtime": {},
                "styled-jsx": {},
                "class-properties": {}
            }
        ],
        '@babel/react',
        ['@babel/preset-env', {targets: {node: 'current'}}],
        '@babel/preset-typescript',
    ],
    "plugins": []
};
