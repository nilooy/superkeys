<div align="center">
    <img src="extension/assets/img/logo128.png" alt="Superkey logo" />
    </br>
    </br>
    <img src="https://www.superkeys.app/superkeys-text.png" alt="super key text logo"/>
    
 <h4 color="yellow">Superkeys is a browser extension which allow users to add short keys for websites and make search query in those sites.</h4>
 <p>Made with ❤️ <a target="_blank" href="https://twitter.com/nil_ooy">@nilooy 🧑‍💻</a></p>
    
[![Twitter URL](https://img.shields.io/twitter/url/https/twitter.com/superkeys_app.svg?style=social&label=Follow%20%40superkeys_app)](https://twitter.com/superkeys_app)


<p align="center" >
    <a href="https://chrome.google.com/webstore/detail/superkeys/pipnngenjgpmcofmeifehbaihdojajbc">
    <img width="120" src="https://img.shields.io/badge/%20-Chrome-orange?logo=google-chrome&logoColor=white" alt="Download for Chrome" />
    </a>
    <a href="https://addons.mozilla.org/en-US/firefox/addon/superkeys/">
    <img width="110" src="https://img.shields.io/badge/%20-Firefox-red?logo=mozilla&logoColor=white" alt="Download for Firefox" />
    </a>
</p>


<img src="https://www.superkeys.app/banner3.svg" alt="superkey banner" width="600"/>

</div>

# 🧐 What is Superkeys?
It's a browser extension to search + browse faster. Sometimes we need to look for solution on a same site over and over again and some specific pages and this extension can simplify this process with custom keys, search query url , subkeys and context menus. We will talk in details about these feature below.

> Example: John loves coding and he needs search on stackoverflow many times a day while coding. 
> So the normal process would be open a new tab, go to stackoverflow and search with the keyword he is looking for.
> With superkeys he pressed `Alt` + `Space` on keyboard and type `so how to center a div` and 💥

***

### 🌱 The extension will not collect or use your data, all your data will be saved and synced in your browser.

***

# ⚗️ Features

- 🔐 KEYS

> Key are the namespace for a single website eg: key: `so`
> Usage: type `so` and enter

> Search History Type: `#`

> Bookmarks Search Type: `@`

- 🌐 Search Query Url

> Each key can contain one single seaarch query url belong to the key above `so`, eg: `https://stackoverflow.com/search?q` 
> Usage: type `so how to center a div` and enter

- 🔀 Subkeys

> Each key can contain multiple Subkeys, let's add `pr` subkey with url `https://github.com/pulls` for key `gh`
> Usage: type `gh pr` and enter

- 🔖 Context Menu

> Each key containing 🌐 Search Query Url will be added to browser context menu,
> Usage: select any text on the browser and right click, from the context menu hover over to superkeys and you will see the list, select your preferred site to search on.

- ⬆️ Import Keys

> Keys can be imported by .json file with correct data structure.
> Go to `Import` from top bar, drop or click to upload to json file

- ⬇️ Export Keys

> Keys are selectable. You can also select all. After selection you can export the selected ones.
> Usage: select the keys you want to export, it will show `Export` on top bar, click it

# 🛂 Data Structure (All data types are :string)

```json
{
   "keyLists":[
      {
         "key":"gh",
         "separator":"",
         "url":"https://github.com",
         "queryUrl":"https://github.com/search?q",
         "querySeparator":"",
         "subKeys":[
            {
               "key":"pr",
               "url":"https://github.com/pulls"
            },
            {
               "key":"pr-need-review",
               "url":"https://github.com/pulls/review-requested"
            }
         ]
      }
   ]
}
```


# 🔧 Tools Used

- 🎨 [Preact](https://preactjs.com/)


- 🎨 [Tailwind.css](https://tailwindcss.com/)
- 🎨 [Daisy.ui](https://daisyui.com/)
- 🔨 Typescript
- 🧪 [Webext-polyfill](https://github.com/mozilla/webextension-polyfill)
- 👔 [Web-ext](https://www.npmjs.com/package/web-ext)
- 🏗️ [Vite.js](https://vitejs.dev)
- 🚀 [Release-it](https://github.com/release-it/release-it)

# 🚸 Development Guide

1. Install Dependencies
```sh
yarn
```
2. Start Dev Server
Default is firefox
```sh
yarn start
```

For Firefox
```sh
yarn dev:firefox
```
OR for chrome
```sh
yarn dev:chrome
```

> Any of these commands will open a instance of that browser with superkeys extension installed. 

3. Build all for prod 
```sh
yarn prod
```
> This will generate folder with version number inside release directory and will contain both firefox and chrome 's zip files.

### Important Notes
* src/manifest.ts > will generate manifest v2 for firefox and v3 for chrome, add your necessary configs there in manifest.ts file.
* Used `browser` from 'webextension-polyfill' instead of global `chrome` to get cross browser apis.

```js
import browser from 'webextension-polyfill'
```
* Pre-commit hooks can be enabled by running `node_modules/husky`

# 👥 Contribution
* 🐛 Bugs: Open issues if you find bugs or discussion
* 🧑‍💻 Development: Simply Fork and PR

***

# 📈 Roadmaps
1. Omnibox
2. Automation (Simple user defined content-scripts)
3. Show TopSites by Default
4. Open Apps with `management` api
5. Fetch results from available api for keys with search query turned on.

> Feel free to add more



***
> #### Appriciate for spending time read it. ❤
Hope to get a ⭐ on this repo and add me for more exciting projects [![Twitter URL](https://img.shields.io/twitter/url/https/twitter.com/nil_ooy.svg?style=social&label=%20%40nil_ooy)](https://twitter.com/nil_ooy)

 #### Share with other
 [![Twitter URL](https://img.shields.io/twitter/url/https/twitter.com/superkeys_app.svg?style=social&label=Share%20%40superkeys_app)](https://twitter.com/intent/tweet?text=Get+a+productivity+boost+%F0%9F%92%BB%E2%9C%A8%F0%9F%A7%AA%2C+give+this+extension+a+try+www.superkeys.app%0A%0AFollow+%40superkeys_app%0A&hashtags=productivity%2Cchrome%2Cfirefox%2Csuperkeys&ref_src=superkeys-option-page)




















