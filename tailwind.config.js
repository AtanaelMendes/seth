import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
        './resources/js/**/*.jsx',
    ],

    theme: {
        container: {
            center: true
        },
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    safelist: [
        // 'absolute',
        // 'fixed',
        // 'block',
        // 'hidden',
        // 'fill-black',
        // 'font-bold',
        // 'bg-blue-500',
        // 'bg-red-500'
        // {pattern: /bg-blue-(\d{3})/, variants: ['sm', 'md', 'lg', 'xl']},
        // {pattern: /bg-red-(\d{3})/, variants: ['sm', 'md', 'lg', 'xl']},
    ],

    plugins: [forms],
};
