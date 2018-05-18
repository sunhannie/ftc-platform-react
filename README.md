# ftc-platform-react
develop a page to instruct user to download

问题：假如没加入include，则不会编译到scss文件，就不会报错，我觉得是引用插件的问题

不加include，会调用main.scss，难道只会调用入口文件吗？后面引入的不能调用，是因为render是因为读出来的，不是render出来的？