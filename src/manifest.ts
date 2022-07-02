import pkg from '../package.json'
import { isDev, port } from '../scripts/utils'

// TODO: Add return typedef
export async function getManifest(isFirefoxInArg = false) {
    // update this file to update this manifest.json
    // can also be conditional based on your need
    const optionPath = './dist/options/index.html'
    const popupPath = './dist/popup/index.html'
    const backgroundPath = './dist/background/index.global.js'
    const contentSecurityPolicy = isDev
        ? `script-src 'self' http://localhost:${port}; object-src 'self'`
        : undefined

    const icons = {
        16: './assets/img/logo16.png',
        48: './assets/img/logo48.png',
        128: './assets/img/logo128.png',
    }

    const shortCut = {
        [`_execute${isFirefoxInArg ? '_browser' : ''}_action`]: {
            suggested_key: {
                windows: 'Ctrl+Space',
                mac: 'Alt+Space',
            },
        },
    }

    const firefoxSpecific = {
        manifest_version: 2,
        browser_action: {
            default_icon: icons,
            default_popup: popupPath,
        },
        options_ui: {
            page: optionPath,
            open_in_tab: true,
            chrome_style: false,
        },
        background: {
            scripts: [backgroundPath],
            persistent: false,
        },
        browser_specific_settings: {
            gecko: {
                id: 'superkeys@gmail.com',
                strict_min_version: '42.0',
            },
        },
        content_security_policy: contentSecurityPolicy,
    }
    const chromeSpecific = {
        manifest_version: 3,
        action: {
            default_popup: popupPath,
        },
        options_page: optionPath,
        background: {
            service_worker: backgroundPath,
        },
        content_security_policy: {
            extension_pages: contentSecurityPolicy,
        },
    }

    const common = {
        name: pkg.displayName || pkg.name,
        version: pkg.version.substring(0, 5),
        description: pkg.description,
        content_scripts: [
            {
                matches: ['http://*/*', 'https://*/*'],
                js: ['./dist/content/index.global.js'],
            },
        ],
        icons,
        permissions: [
            'tabs',
            'storage',
            'search',
            'contextMenus',
            'notifications',
            'activeTab',
            'bookmarks',
            'history',
        ],

        commands: shortCut,
    }

    return {
        ...common,
        ...(isFirefoxInArg ? firefoxSpecific : chromeSpecific),
    }
}
