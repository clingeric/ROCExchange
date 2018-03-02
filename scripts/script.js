Vue.component('roc-footer', {
    template:
        `<div id="foot">
        <a id="foot-content" href="https://www.github.com/clingeric/ROCSwap">J Development</a> | &copy; 2018. All Rights Reserved.
    </div>`
})

Vue.component('roc-nav', {
    props: ['roc-nav-item'],
    template:
        `<ul class="nav nav-tabs navbar-dark navbar-expand-md justify-content-between">
            <a id="brand" class="navbar-brand">ROCSwap</a>
    <button id="responsiveNav" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarContent">
        {{ roc-nav-item }}
    </div>
</ul>`
})

Vue.component('roc-nav-content', {
    props: ['roc-nav-item'],
    template:
        `<li v-for="item in roc-nav-content" class="nav-item">
    <a class="nav-link" :href="item.link">{{ item.text }}</a>
</li>`
})

Vue.component('terms-of-service', {
    template: '\
      <div v-once>\
        <h1>Terms of Service</h1>\
        ... a lot of static content ...\
      </div>\
    '
})

Vue.component('share-confirmation', {
    template:
        `<div class="modal fade text-center" id="confirmation" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="confirmationTitle">Availability Posted</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <h3>Thanks for using ROCExchange</h3>
                <h4>Your pass' availability has been successfully posted. Please update availability when you share it with
                    someone.
                </h4>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>`
})

Vue.component('borrow-modal', {
    props: ['fname', 'lname', 'phone', 'email', 'id'],
    template:
        `<div class="modal fade text-center" :id="'modal' + id" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitleOne">Borrow Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h2>Name: {{ fname }} {{ lname }}</h2>
                    <h3>Phone: {{ phone }}</h3>
                    <h3>Email: {{ email }}</h3>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>`
})

Vue.component('borrow-card', {
    props: ['price', 'availability', 'id'],
    template:
        `<div class="borrow_card">
                <div>
                    <img class="borrow_image" src="../media/img/roc.gif">
                </div>
                <div class="borrow_body text-center">
                <h4>{{ availability }}</h4>
                <h5>{{ price }}</h5>
                <button type="button" class="btn btn-primary" data-toggle="modal" :data-target="'#modal' + id">Borrow</button>
            </div>
        </div>`
})

var app1 = new Vue({
    el: '#app1',
    data: {
        navItems: [
            { id: 0, text: 'HOME', link: '/index.html' },
            { id: 1, text: 'SHARE', link: '/share.html' },
            { id: 2, text: 'BORROW', link: '/borrow.html' },
            { id: 3, text: 'ACCOUNT', link: '/account.html' },
            { id: 4, text: 'ABOUT', link: '/about.html' },
        ],
        currentURL: window.location.pathname
    }
})

var app2 = new Vue({
    el: '#app2',

})

var app3 = new Vue({
    el: '#app3',
    data: {
        users: [
            { id: 0, fName: 'Dan', lName: 'Smith', phone: '8014222222', email: 'dan@byu.edu', availableFrom: '5/23/19', availableTo: '7/7/19', price: '$0' },
            { id: 1, fName: 'Kendrick', lName: 'Lamar', phone: '8014224321', email: 'k.@byu.edu', availableFrom: '6/7/19', availableTo: '7/5/19', price: '$3' },
            { id: 2, fName: 'Vince', lName: 'Staples', phone: '8014228360', email: 'norfnorf@byu.edu', availableFrom: '5/2/19', availableTo: '5/7/19', price: '$6' },
            { id: 3, fName: 'Kanye', lName: 'West', phone: '8014228221', email: 'yeezy@byu.edu', availableFrom: '7/3/19', availableTo: '7/7/19', price: '$0' },
            { id: 4, fName: 'Tupac', lName: 'Shakur', phone: '8014229932', email: 'tupac@byu.edu', availableFrom: '2/7/19', availableTo: '3/7/19', price: '$3' },
            { id: 5, fName: 'Chance', lName: '', phone: '8014227979', email: 'chancethestudent@byu.edu', availableFrom: '6/7/19', availableTo: '7/7/19', price: '$2' },
            { id: 6, fName: 'Lecrae', lName: '', phone: '8014221167', email: 'lecrae@byu.edu', availableFrom: '5/4/19', availableTo: '5/7/19', price: '$2' },
            { id: 7, fName: 'Danny', lName: 'Glover', phone: '8014223005', email: 'childish@byu.edu', availableFrom: '6/12/19', availableTo: '6/17/19', price: '$3' }
        ],
        addedFName: '',
        addedLName: '',
        addedPhone: '',
        addedEmail: '',
        addedAvailableFrom: '',
        addedAvailableTo: '',
        addedPrice: '',
        submitted: false,
    },
    methods: {
        addUser: function () {
            this.addedPrice = '$' + this.addedPrice 
            this.users.push({ id: this.users.length, fName: this.addedFName, lName: this.addedLName, phone: this.addedPhone, email: this.addedEmail, availableFrom: this.addedAvailableFrom, availableTo: this.addedAvailableTo, price:this.addedPrice });
            this.addedFName= '';
            this.addedLName= '';
            this.addedPhone= '';
            this.addedEmail= '';
            this.addedAvailableFrom= '';
            this.addedAvailableTo= '';
            this.addedPrice= '';
            this.users = this.users.sort(function(a,b) {return (a.availableFrom > b.availableFrom) ? 1 : ((b.availableFrom > a.availableFrom) ? -1 : 0);} );
            this.submitted = true;
        },
        resetForm: function() {
            this.submitted = false;
        }
    },
})

var app4 = new Vue({
    el: '#app4',
    data: {
        qa: [
            { id: 0, question: 'Do I have to pay to use the ROCSwap?', answer: 'No. ROCSwap is a free service available for all BYU students to enjoy BYU sports. If there is a cost associated with a pass, that is to be paid to the student letting you borrow his or her pass, not to the ROCSwap website.' },
            { id: 1, question: 'Why did you start ROCSwap?', answer: 'I think BYU sports are fun, and that everyone should be able to go to as many BYU events as they\'d like to. But sometimes the cost of the ROC pass and busy schedules get in the way of being able to go to as many events as you\'d like. So if you\'re in the group of those who can\'t afford a ROC pass, you can borrow one for a low cost or free. If you\'re in the group of those who can\'t attend a game because you\'re busy, then you can share your pass for a cost or free. This way everyone can get full use out of everyone\'s ROC passes.' },
            { id: 2, question: 'Is the ROCSwap associated with BYU?', answer: 'No. This is a personal project that has absolutely no connection to BYU, BYU Athletics, or any official BYU organization.' },
            { id: 3, question: 'How do I borrow a pass?', answer: 'After creating an account on the ROCSwap website, you will select a pass that you\'d like to borrow from the list of available passes. After you\'ve selected a pass, you can then contact the poster and arrange for payment and pick-up of the pass with your own discretion. ROCSwap is not responsible for any damages, losses, or problems associated with purchasing, picking-up, or using ROC passes.' },
        ]
    }
})

var app5 = new Vue({
    el: '#app5',
    data: {

    }
})

var app6 = new Vue({
    el: '#app6',
    data: {
        currentUser: ''
    },
})

var app6 = new Vue({
    el: '#app7',
})
