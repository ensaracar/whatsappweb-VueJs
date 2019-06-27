var json = "../json/";
var users = 'https://randomuser.me/api/?results=10&nat=tr';
var apiURL = json+'talk_';

var app = new Vue({
    el: '#app',
    data: {
        users: [],
        activeUser : null,
        activeChat : false,
        user_conversation : '',
        search_clicked: false,
        search_input: '',
        chat_profile_picture: '',
        chat_user_info: '',
        toggle_share_dropdown: false,
        toggle_menu_dropdown_left: false,
        toggle_menu_dropdown_right: false,
    },
    filters : {
        capitalize: function (value) {
            if (!value) return '';
            value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
    },
    created: function () {
        //this.fetchData()
        this.$http.get(users).then(function (response) {
            //console.log(response.data);
            this.users = response.data.results;
            setTimeout(function () {
                $('.left').niceScroll({
                    cursorcolor:"#cccccc",
                    cursorwidth:"7px",
                    cursorborderradius:0,
                    cursoropacitymin:1,
                    cursorborder:'none',
                });
            },0)
        });
    },
    computed : {
        getFilter : function(){
            var vm = this;
            return vm.users.filter(function (user) {
                //console.log(user);
                var str = user.name.first + user.name.last + user.location.street;
                return str.match(vm.search_input.toLowerCase());
            });
        },
        chat_date: function () {
            var random = Math.floor(Math.random() * 15) + 7;
            moment.locale('tr');
            return moment().subtract(random, 'days').calendar();

        },
    },
    methods: {
        searchInputFocus : function (e) {
            !e ? this.search_clicked = true : this.search_clicked = false;
        },
        get_conversation : function (index, user) {
            //console.log(user);
            this.activeUser = index;
            this.activeChat = true;
            this.fetchChat(index);
            this.chat_profile_picture = user.picture.medium;
            this.chat_user_info = user.name.first + ' ' + user.name.last;
            setTimeout(function () {
                $('.right .box-body').niceScroll({
                    cursorcolor:"#b5afaa",
                    cursorwidth:"7px",
                    cursorborderradius:0,
                    cursorborder:'none',
                    cursoropacitymin:1,
                });
            },0)
        },
        /*
        fetchData: function () {
            var xhr = new XMLHttpRequest();
            var vm = this;
            xhr.open('GET', users);
            xhr.onload = function () {
                vm.users = JSON.parse(xhr.responseText);
                //console.log(vm.users);
            };
            xhr.send();
        },
        */
        fetchChat: function (index) {
            var xhr = new XMLHttpRequest();
            var vm = this;
            xhr.open('GET', apiURL+index+'.json');
            xhr.onload = function (e) {
                if(e.srcElement.status === 200){
                    user_conversation = JSON.parse(xhr.responseText);
                    //console.log(user_conversation);
                    vm.user_conversation = user_conversation;

                    // kaydır
                    $('.box-body').animate({ scrollTop: $('.box-body').outerHeight( true ) }, 25);
                }
            };
            xhr.send();
        }
    }

});

