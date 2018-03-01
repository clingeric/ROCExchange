Vue.component('roc-nav-item', {
    props: ['nav-item'],
    template:
        `<li class="nav-item">
            <a class="nav-link" href="pages/share.html">{{ nav-item.text }}</a>
        </li>`
})

Vue.component('roc-nav', {
    props: ['nav-content'],
    template:
    `<ul class="nav nav-tabs navbar-dark navbar-expand-md justify-content-between" >
    <a id="brand" class="navbar-brand">ROCSwap</a>
    <button id="responsiveNav" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarContent">
        {{ nav-content }}
    </div>
</ul>`
})

var app1 = new Vue({
    el: '#app-1',
    data: {
        navItems: [
            { id: 0, text: 'HOME', link: 'index.html' },
            { id: 1, text: 'SHARE', link: 'share.html' },
            { id: 2, text: 'BORROW', link: 'borrow.html' },
            { id: 3, text: 'ACCOUNT', link: 'account.html' },
            { id: 4, text: 'ABOUT', link: 'about.html' },
        ]
    }
})

var app2 = new Vue({
    el: '#app-2',
    
})