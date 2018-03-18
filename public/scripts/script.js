Vue.component('beta-warning', {
    template:
        `
        <p id="beta-warning">
        <strong>THIS SITE IS IN BETA</strong>. Please DO NOT enter any private information like a real email address, phone number, name, or password. Added security will come in future updates. Thanks! :)
        </p>
        `})

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
    props: ['fname', 'lname', 'phone', 'email', 'id', 'current'],
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
    </div>`,
})

Vue.component('borrow-card', {
    props: ['price', 'availability', 'id'],
    template:
        `<div>
            <a data-toggle="modal" :data-target="'#modal' + id">
                <div class="borrow_card">
                   
                    <img class="borrow_image" src="../media/img/pass.JPG">
                </div>
            </a>
            <div class="borrow_body text-center">
                <h4>{{ availability }}</h4>
                <h5>$\{{ price }}</h5>
            </div>
        </div>
        `
})

var app1 = new Vue({
    el: '#app1',
    data: {
        navItems: [
            { id: 0, text: 'SWAP', link: '/swap.html' },
            { id: 1, text: 'ACCOUNT', link: '/account.html' },
            { id: 2, text: 'ABOUT', link: '/about.html' },
        ],
        currentURL: window.location.pathname
    },
    methods: {
        clearCurrentUser: function () {
            axios.delete('/api/user').then(response => {

            }).catch(err => {

            });
        },
        logout: function () {
            this.clearCurrentUser();
            window.location.replace('/index.html')
        }
    }
})

var app2 = new Vue({
    el: '#app2',

})

var app3 = new Vue({

    el: '#app3',
    created: function () {
        this.getPasses();
        this.getCurrentUser();
    },
    data: {
        passes: [],
        addedAvailableFrom: '',
        addedAvailableTo: '',
        addedPrice: '',
        submitted: false,
        currentUser: '',
        show: '',
    },
    computed: {
        filteredPasses: function () {
            if (this.show === 'dateLow')
                return this.passes.sort(function (pass1, pass2) {
                    return pass1.availableFrom - pass2.availableFrom
                });
            if (this.show === 'dateHigh')
                return this.passes.sort(function (pass1, pass2) {
                    return pass2.availableFrom - pass1.availableFrom
                });
            if (this.show === 'priceLow')
                return this.passes.sort(function (pass1, pass2) {
                    return parseInt(pass1.price) - parseInt(pass2.price)
                });
            if (this.show === 'priceHigh')
                return this.passes.sort(function (pass1, pass2) {
                    return parseInt(pass2.price) - parseInt(pass1.price)
                });
            return this.passes;
        },
    },
    methods: {
        getCurrentUser: function () {
            axios.get('/api/user').then(response => {
                this.currentUser = response.data;
                return true;
            }).catch(err => {

            });
        },
        priceHigh: function () {
            this.show = 'priceHigh';
        },
        priceLow: function () {
            this.show = 'priceLow';
        },
        dateHigh: function () {
            this.show = 'dateHigh';
        },
        dateLow: function () {
            this.show = 'dateLow';
        },
        addPass: function () {
            axios.post("api/passes", {
                fName: this.currentUser.fName,
                lName: this.currentUser.lName,
                phone: this.currentUser.phone,
                email: this.currentUser.email,
                availableFrom: this.addedAvailableFrom,
                availableTo: this.addedAvailableTo,
                price: this.addedPrice,
            }).then(response => {
                this.addedAvailableFrom = '';
                this.addedAvailableTo = '';
                this.addedPrice = '';
                this.submitted = true;
                this.getPasses();
                this.passes = this.passes.sort(function (a, b) { return (a.availableFrom > b.availableFrom) ? 1 : ((b.availableFrom > a.availableFrom) ? -1 : 0); });
                return true;
            }).catch(err => {

            });
        },
        resetForm: function () {
            this.submitted = false;
        },
        getPasses: function () {
            axios.get('api/passes').then(Response => {
                this.passes = Response.data;
                return true;
            }).catch(err => {

            });
        },
        removePass: function (id) {
            axios.delete('/api/passes/' + id).then(response => {
                this.getPasses();
                return true;
            }).catch(err => {

            })
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
    },
})

var app5 = new Vue({
    el: '#app5',
    data: {
        addedFName: '',
        addedLName: '',
        addedPhone: '',
        addedEmail: '',
        addedPassword: '',
        addedPassword2: '',
        currentUser: {},
    },
    created: function () {
        this.getCurrentUser();
    },
    methods: {
        editUser: function () {
            axios.put('api/users/' + this.currentUser.userId, {
                fName: this.addedFName,
                lName: this.addedLName,
                phone: this.addedPhone,
                email: this.addedEmail,
                password: this.addedPassword,
            }).then(response => {
                this.addedFName = '';
                this.addedLName = '';
                this.addedPhone = '';
                this.addedEmail = '';
                this.addedPassword = '';
                this.addedPassword2 = '';
                return true;
            }).catch(err => {
            });
        },
        getCurrentUser: function () {
            axios.get('/api/user').then(response => {
                this.currentUser = response.data;
                return true;
            }).catch(err => {

            });
        },
    },
})

var app6 = new Vue({
    el: '#app6',
    data: {
        addedEmail: '',
        addedPassword: '',
        found: false,
        users: [],
        addedFName: '',
        addedLName: '',
        addedPhone: '',
        currentUser: '',
    },
    created: function () {
        this.getUsers();
    },
    methods: {
        getUsers: function () {
            axios.get('api/users').then(response => {
                this.users = response.data;
                return true;
            }).catch(err => {

            });
        },
        setCurrentUser: function (currentUser) {
            axios.post('api/user', {
                userId: currentUser.userId,
                fName: currentUser.fName,
                lName: currentUser.lName,
                email: currentUser.email,
                phone: currentUser.phone
            }).then(response => {
                return true;
            }).catch(err => {

            });
        },
        login: function () {
            if (this.users.length > 0) {
                for (let user of this.users) {
                    if (user.email === this.addedEmail) {
                        this.found = true;
                        this.setCurrentUser(user);
                        break;
                    }
                    else {
                        this.found = false;
                    }
                }
            }
            if (this.found === true) {
                this.found = false;
                window.location.replace('/swap.html')

            }
            else {
                $('#signUpModal').modal('show');
            }
        },
    }
})

var app7 = new Vue({
    el: '#app7',
    data: {
        users: [],
        addedFName: '',
        addedLName: '',
        addedPhone: '',
        addedEmail: '',
        addedPassword: '',
        addedPassword2: '',
    },
    created: function () {
        this.getUsers();
        $('#success_alert').hide();
    },
    methods: {
        getUsers: function () {
            axios.get('api/users').then(response => {
                this.users = response.data;
                return true;
            }).catch(err => {

            });
        },
        signUp: function () {
            axios.post('api/users', {
                fName: this.addedFName,
                lName: this.addedLName,
                phone: this.addedPhone,
                email: this.addedEmail,
                password: this.addedPassword,
            }).then(response => {
                this.addedFName = '';
                this.addedLName = '';
                this.addedPhone = '';
                this.addedEmail = '';
                this.addedPassword = '';
                this.addedPassword2 = '';
                return true;

            }).catch(err => {

            });
            $('#signUpModal').modal('hide');
            $('#success_alert').show(10);
            app6.getUsers();
        }
    }
})