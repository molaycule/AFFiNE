module.exports = {
    core: { builder: 'webpack5' },
    stories: ['../**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
    addons: ['@nrwl/react/plugins/storybook', '@storybook/addon-essentials'],
};
