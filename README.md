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

# ⚗️ Features

- 🔐 KEYS

> Key are the namespace for a single website eg: key: `so`
> Usage: type `so` and enter

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







