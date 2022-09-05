import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { Input } from './Input';
export const FirstStory = {
    storyName: 'Input',
    args: {
        noBorder: true,
        startAdornment: 'startAdornment',
        endAdornment: 'endAdornment',
        style: {},
    },
};

export default {
    title: 'COMPONENTS/Input',
    component: Input,
} as ComponentMeta<typeof Input>;
