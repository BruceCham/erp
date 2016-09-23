# angular readme
###### 1、bootstrap结构：依赖于global目录下的bootstrap样式和angularjs，业务级的app.min-*.css app.min-*.js
###### 2、angular ui结构：依赖于global目录下的angularjs和angular-ui.js *.css
####关于压缩 值得注意的是，一般书写时按照简写的格式为：
```javascript
angular.module("MyMod").controller("MyCtrl", function($scope, $timeout) {  
});
```
####但是压缩js会破快AngularJS文件所需的依赖注入，以至于无法工作，因此压缩前你需要将代码手动修改为下面的形式：
```javascript
angular.module("MyMod").controller("MyCtrl", ["$scope", "$timeout", function($scope, $timeout) {  
}]);
```

######js文件压缩为一行 先合并再执行压缩流
######js一个文件为一行 先压缩流再执行合并
