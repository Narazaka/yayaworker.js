YAYAWorker - WebWorker SHIORI subsystem YAYA
==========================

Install
--------------------------
```
npm install yayaworker.js
```

Usage
--------------------------
node.js
```javascript
var ShioriLoader = require("shioriloader");
var YAYAWorker = require("yayaworker.js");
```

browser
```javascript
<script src="browserfs.js"></script>
<script src="shioriloader.js"></script>
<script src="yayaworker-webworker-all.js"></script>
```

then
```javascript
var shiori = new YAYAWorker();
shiori.load(dirpath).then(...);

// or

ShioriLoader.shiori_detectors = [
  function(fs, dirpath, shiories) {
    return new Promise(function(resolve) { resolve(new shiories.yaya(fs)) });
  },
];

ShioriLoader
  .detect_shiori(fs, dirpath)
  .then((shiori) => shiori.load(dirpath))
  .then(...);
```

License
--------------------------

This is released under [MIT License](http://narazaka.net/license/MIT?2016).
