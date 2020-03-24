(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{1210:function(e,t,a){"use strict";var n=a(9),r=a(10),s=a(13),c=a(11),l=a(12),i=a(0),o=a.n(i),u=a(117),m=a(19);t.a=function(e,t){return function(a){return function(i){function p(a){var r;return Object(n.a)(this,p),r=Object(s.a)(this,Object(c.a)(p).call(this,a)),Object(u.b)(e,t),r}return Object(l.a)(p,i),Object(r.a)(p,[{key:"render",value:function(){var t=this;return o.a.createElement(m.a.Consumer,null,function(n){return n.store,n.storeState[e]?o.a.createElement(a,t.props):null})}}]),p}(o.a.PureComponent)}}},1215:function(e,t,a){"use strict";a.r(t);var n=a(9),r=a(10),s=a(13),c=a(11),l=a(12),i=a(0),o=a.n(i),u=a(1),m=a(52),p=a(33),d=a(16),h=a(141),f=a(19),E=a(1210),b=a(15),v=a(332),g=a(97),y="[USERS APP] GET USERS",S="[USERS APP] SET SEARCH TEXT",N="[USERS APP] TOGGLE IN SELECTED USERS",U="[USERS APP] SELECT ALL USERS",w="[USERS APP] DESELECT ALL USERS",j="[USERS APP] OPEN NEW USER DIALOG",P="[USERS APP] CLOSE NEW USER DIALOG",O="[USERS APP] OPEN EDIT USER DIALOG",A="[USERS APP] CLOSE EDIT USER DIALOG",C="[USERS APP] ADD USER",D="[USERS APP] UPDATE USER",x="[USERS APP] REMOVE USER",T="[USERS APP] REMOVE USERS",k="[USERS APP] CHANGE PAY STATUS";function I(e){var t="";switch(console.log(e.id),e.id){case"active":t="/auth/getActiveAccountData";break;case"inactive":t="/auth/getInactiveAccountData";break;case"closed":t="/auth/getClosedAccountData";break;case"restricted":t="/auth/getRestrictedAccountData";break;default:t="/auth/getAllAccountData"}return function(a){return g.a.get(t,{}).then(function(t){a({type:y,payload:t.data.doc,routeParams:e})})}}function R(e){return{type:S,searchText:e.target.value}}function _(e){return{type:N,userId:e}}function L(){return{type:U}}function M(){return{type:w}}function W(){return{type:j}}function H(){return{type:P}}function F(e){return{type:O,data:e}}function G(){return{type:A}}function q(e){return function(t,a){var n=a().usersApp.users.routeParams;return g.a.post("/auth/addAccountData",{newAccount:e}).then(function(e){return Promise.all([t({type:C})]).then(function(){return t(I(n))})})}}function B(e){return function(t,a){var n=a().usersApp.users.routeParams,r=g.a.post("/auth/updateAccountData",{user:e});return console.log(e),r.then(function(e){return Promise.all([t({type:D})]).then(function(){return t(I(n))})})}}function X(e){return function(t,a){var n=a().usersApp.users.routeParams;return g.a.post("/auth/removeAccountData",{accountId:e}).then(function(e){return Promise.all([t({type:x})]).then(function(){return t(I(n))})})}}function z(e){return function(t,a){var n=a().usersApp.users.routeParams;return g.a.post("/auth/removeAccountsData",{accountIds:e}).then(function(e){return Promise.all([t({type:T}),t({type:w})]).then(function(){return t(I(n))})})}}function J(e,t){return function(a,n){var r=n().usersApp.users.routeParams;return g.a.post("/auth/changePayStatus",{key:e,value:t}).then(function(e){return Promise.all([a({type:k})]).then(function(){return a(I(r))})})}}var V=function(e){function t(){var e,a;Object(n.a)(this,t);for(var r=arguments.length,l=new Array(r),i=0;i<r;i++)l[i]=arguments[i];return(a=Object(s.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(l)))).state={selectedUsersMenu:null,data:[]},a.getFilteredArray=function(e,t){var a=Object.keys(e).map(function(t){return e[t]});return 0===t.length?a:p.r.filterArrayByString(a,t)},a.openSelectedUserMenu=function(e){a.setState({selectedUsersMenu:e.currentTarget})},a.closeSelectedUsersMenu=function(){a.setState({selectedUsersMenu:null})},a.resetPassword=function(e){g.a.post("/auth/resetPassword",{accountId:e}),alert("Successfully reset password.")},a.handlePayChange=function(e){return function(t){a.props.changePayStatus(e,t.target.checked)}},a}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.users,n=t.searchText,r=t.selectedUserIds,s=t.selectAllUsers,c=t.deSelectAllUsers,l=t.toggleInSelectedUsers,i=t.openEditUserDialog,m=t.removeUsers,d=t.removeUser,h=this.getFilteredArray(a,n),f=this.state.selectedUsersMenu;return h||0!==h.length?o.a.createElement(p.a,{animation:"transition.slideUpIn",delay:300},o.a.createElement(v.b,{className:"-striped -highlight border-0",getTrProps:function(e,t,a){return{className:"cursor-pointer",onDoubleClick:function(e,a){t&&(console.log(t),i(t.original))}}},data:h,columns:[{Header:function(){return o.a.createElement(u.f,{onClick:function(e){e.stopPropagation()},onChange:function(e){e.target.checked?s():c()},checked:r.length===Object.keys(a).length&&r.length>0,indeterminate:r.length!==Object.keys(a).length&&r.length>0})},accessor:"",Cell:function(e){return o.a.createElement(u.f,{onClick:function(e){e.stopPropagation()},checked:r.includes(e.value._id),onChange:function(){return l(e.value._id)}})},className:"justify-center",sortable:!1,width:64},{Header:function(){return r.length>0&&o.a.createElement(o.a.Fragment,null,o.a.createElement(u.x,{"aria-owns":f?"selectedUsersMenu":null,"aria-haspopup":"true",onClick:e.openSelectedUserMenu},o.a.createElement(u.w,null,"more_horiz")),o.a.createElement(u.H,{id:"selectedUsersMenu",anchorEl:f,open:Boolean(f),onClose:e.closeSelectedUsersMenu},o.a.createElement(u.J,null,o.a.createElement(u.I,{onClick:function(){m(r),e.closeSelectedUsersMenu()}},o.a.createElement(u.E,null,o.a.createElement(u.w,null,"delete")),o.a.createElement(u.F,{inset:!0,primary:"Remove"})))))},accessor:"avatar",Cell:function(e){return o.a.createElement(u.b,{className:"",alt:"user photo",src:e.value&&""!==e.value?e.value:"assets/images/avatars/profile.jpg"})},className:"justify-center",width:64,sortable:!1},{Header:"User Name",accessor:"user_name",filterable:!0,className:"font-bold justify-center"},{Header:"Email Address",accessor:"email",filterable:!0,width:256,className:"font-bold justify-center"},{Header:"Role",accessor:"role",filterable:!0,className:"font-bold justify-center"},{Header:"Account Status",accessor:"account_status",className:"font-bold justify-center",filterable:!0},{Header:"Payment",width:80,Cell:function(t){return o.a.createElement(u.r,{className:"mt-8 mb-16",control:o.a.createElement(u.U,{checked:t.original.Pay,onChange:e.handlePayChange(t.original._id)})})}},{Header:"PaymentType",accessor:"PaymentType",filterable:!0},{Header:"PayedDate",width:160,Cell:function(e){return o.a.createElement("div",{className:"flex items-center"},e.original.PayedDate)}},{Header:"",width:160,Cell:function(t){return o.a.createElement("div",{className:"flex items-center"},o.a.createElement(u.x,{onClick:function(a){a.stopPropagation(),window.confirm("Are you sure to reset password to 'electrician'")&&e.resetPassword(t.original._id)}},o.a.createElement(u.w,null,"enhanced_encryption")),o.a.createElement(u.x,{onClick:function(e){e.stopPropagation(),window.confirm("Are you sure to delete it?")&&d(t.original._id)}},o.a.createElement(u.w,null,"delete")))}}],defaultPageSize:10,noDataText:"No users found"})):o.a.createElement("div",{className:"flex items-center justify-center h-full"},o.a.createElement(u.ab,{color:"textSecondary",variant:"h5"},"No users found"))}}]),t}(i.Component);var Y=Object(h.g)(Object(f.b)(function(e){var t=e.usersApp;return{users:t.users.entities,selectedUserIds:t.users.selectedUserIds,searchText:t.users.searchText,user:t.user}},function(e){return Object(d.c)({getUsers:I,toggleInSelectedUsers:_,selectAllUsers:L,deSelectAllUsers:M,openEditUserDialog:F,removeUsers:z,removeUser:X,changePayStatus:J},e)})(V)),K=function(e){function t(){return Object(n.a)(this,t),Object(s.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.props,t=e.setSearchText,a=e.searchText,n=e.pageLayout,r=e.mainTheme;return o.a.createElement("div",{className:"flex flex-1 items-center justify-between p-8 sm:p-24"},o.a.createElement("div",{className:"flex flex-shrink items-center sm:w-224"},o.a.createElement(u.v,{lgUp:!0},o.a.createElement(u.x,{onClick:function(e){return n().toggleLeftSidebar()},"aria-label":"open left sidebar"},o.a.createElement(u.w,null,"menu"))),o.a.createElement("div",{className:"flex items-center"},o.a.createElement(p.a,{animation:"transition.expandIn",delay:300},o.a.createElement(u.w,{className:"text-32 mr-12"},"account_box")),o.a.createElement(p.a,{animation:"transition.slideLeftIn",delay:300},o.a.createElement(u.ab,{variant:"h6",className:"hidden sm:flex"},"All Accounts")))),o.a.createElement("div",{className:"flex flex-1 items-center justify-center pr-8 sm:px-12"},o.a.createElement(m.MuiThemeProvider,{theme:r},o.a.createElement(p.a,{animation:"transition.slideLeftIn",delay:300},o.a.createElement(u.L,{className:"flex p-4 items-center w-full max-w-512 px-8 py-4",elevation:1},o.a.createElement(u.w,{className:"mr-8",color:"action"},"search"),o.a.createElement(u.y,{placeholder:"Search for anything",className:"flex flex-1",disableUnderline:!0,fullWidth:!0,value:a,inputProps:{"aria-label":"Search"},onChange:t}))))))}}]),t}(i.Component);var Q=Object(f.b)(function(e){var t=e.usersApp,a=e.fuse;return{searchText:t.users.searchText,mainTheme:a.settings.mainTheme}},function(e){return Object(d.c)({setSearchText:R},e)})(K),Z=a(29),$=function(e){function t(){return Object(n.a)(this,t),Object(s.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.props.classes;return o.a.createElement("div",{className:"p-16 lg:p-24 lg:pr-4"},o.a.createElement(p.a,{animation:"transition.slideLeftIn",delay:200},o.a.createElement(u.L,{elevation:1,className:"rounded-8"},o.a.createElement(u.m,null),o.a.createElement(u.C,null,o.a.createElement(u.D,{button:!0,component:Z.b,to:"/users/all",activeClassName:"active",className:e.listItem},o.a.createElement(u.w,{className:"list-item-icon text-16",color:"action"},"people"),o.a.createElement(u.F,{className:"truncate pr-0",primary:"All accounts",disableTypography:!0})),o.a.createElement(u.D,{button:!0,component:Z.b,to:"/users/active",activeClassName:"active",className:e.listItem},o.a.createElement(u.w,{className:"list-item-icon text-16",color:"action"},"check_circle"),o.a.createElement(u.F,{className:"truncate pr-0",primary:"Active accounts",disableTypography:!0})),o.a.createElement(u.D,{button:!0,component:Z.b,to:"/users/inactive",activeClassName:"active",className:e.listItem},o.a.createElement(u.w,{className:"list-item-icon text-16",color:"action"},"contact_support"),o.a.createElement(u.F,{className:"truncate pr-0",primary:"Inactive accounts",disableTypography:!0})),o.a.createElement(u.D,{button:!0,component:Z.b,to:"/users/closed",activeClassName:"active",className:e.listItem},o.a.createElement(u.w,{className:"list-item-icon text-16",color:"action"},"close"),o.a.createElement(u.F,{className:"truncate pr-0",primary:"Closed accounts",disableTypography:!0})),o.a.createElement(u.D,{button:!0,component:Z.b,to:"/users/restricted",activeClassName:"active",className:e.listItem},o.a.createElement(u.w,{className:"list-item-icon text-16",color:"action"},"access_time"),o.a.createElement(u.F,{className:"truncate pr-0",primary:"Restricted accounts",disableTypography:!0}))))))}}]),t}(i.Component);var ee=Object(m.withStyles)(function(e){return{listItem:{color:"inherit!important",textDecoration:"none!important",height:40,width:"calc(100% - 16px)",borderRadius:"0 20px 20px 0",paddingLeft:24,paddingRight:12,"&.active":{backgroundColor:e.palette.secondary.main,color:e.palette.secondary.contrastText+"!important",pointerEvents:"none","& .list-item-icon":{color:"inherit"}}}}},{withTheme:!0})(Object(h.g)(Object(f.b)(function(e){return{user:e.usersApp.user}},function(e){return Object(d.c)({},e)})($))),te=a(8),ae=a(227),ne=a.n(ae),re=a(226),se=a.n(re),ce={_id:"",user_name:"",email:"",role:"",account_type:"",PaymentType:"",PayedDate:""},le=function(e){function t(){var e,a;Object(n.a)(this,t);for(var r=arguments.length,l=new Array(r),i=0;i<r;i++)l[i]=arguments[i];return(a=Object(s.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(l)))).state=Object(te.a)({},ce),a.handleChange=function(e){a.setState(b.a.set(Object(te.a)({},a.state),e.target.name,"checkbox"===e.target.type?e.target.checked:e.target.value))},a.closeComposeDialog=function(){"edit"===a.props.userDialog.type?a.props.closeEditUserDialog():a.props.closeNewUserDialog()},a}return Object(l.a)(t,e),Object(r.a)(t,[{key:"componentDidUpdate",value:function(e,t,a){!e.userDialog.props.open&&this.props.userDialog.props.open&&(console.log(this.props.userDialog),"edit"===this.props.userDialog.type&&this.props.userDialog.data&&!b.a.isEqual(this.props.userDialog.data,t)&&this.setState(Object(te.a)({},this.props.userDialog.data)),"new"!==this.props.userDialog.type||b.a.isEqual(ce,t)||this.setState(Object(te.a)({},ce)))}},{key:"canBeSubmitted",value:function(){return this.state.user_name.length>0}},{key:"render",value:function(){var e=this,t=this.props,a=t.userDialog,n=t.addUser,r=t.updateUser,s=t.removeUser;return o.a.createElement(u.j,Object.assign({classes:{paper:"m-24"}},a.props,{onClose:this.closeComposeDialog,fullWidth:!0,maxWidth:"sm"}),o.a.createElement(u.a,{position:"static",elevation:1},o.a.createElement(u.Y,{className:"flex w-full"},o.a.createElement(u.ab,{variant:"subtitle1",color:"inherit"},"new"===a.type?"New User":"Edit User")),o.a.createElement("div",{className:"flex flex-col items-center justify-center pb-24"},o.a.createElement(u.b,{className:"w-96 h-96",alt:"user avatar",src:this.state.avatar&&""!==this.state.avatar?this.state.avatar:"assets/images/avatars/profile.jpg"}),"edit"===a.type&&o.a.createElement(u.ab,{variant:"h6",color:"inherit",className:"pt-8"},this.state.user_name))),o.a.createElement(u.l,{classes:{root:"p-24"}},o.a.createElement("div",{className:"flex"},o.a.createElement("div",{className:"min-w-48 pt-20"},o.a.createElement(u.w,{color:"action"},"account_circle")),o.a.createElement(u.ab,{variant:"subtitle1",color:"inherit",className:"min-w-160 pt-20"},"User Name"),o.a.createElement(u.X,{className:"mb-24",label:"User Name",autoFocus:!0,id:"user_name",name:"user_name",value:this.state.user_name,onChange:this.handleChange,variant:"outlined",required:!0,fullWidth:!0})),o.a.createElement("div",{className:"flex"},o.a.createElement("div",{className:"min-w-48 pt-20"},o.a.createElement(u.w,{color:"action"},"email")),o.a.createElement(u.ab,{variant:"subtitle1",color:"inherit",className:"min-w-160 pt-20"},"Email"),o.a.createElement(u.X,{className:"mb-24",label:"Email",id:"email",name:"email",value:this.state.email,onChange:this.handleChange,variant:"outlined",fullWidth:!0,required:!0})),o.a.createElement("div",{className:"flex"},o.a.createElement("div",{className:"min-w-48 pt-20"},o.a.createElement(u.w,{color:"action"},"accessibility")),o.a.createElement(u.ab,{variant:"subtitle1",color:"inherit",className:"min-w-160 pt-20"},"Role"),o.a.createElement(ne.a,{className:"mb-24",native:!0,value:this.state.role,onChange:this.handleChange,input:o.a.createElement(se.a,{name:"role",labelWidth:0,id:"role"}),fullWidth:!0},o.a.createElement("option",{value:"admin"},"admin"),o.a.createElement("option",{value:"staff"},"staff"),o.a.createElement("option",{value:"user"},"user"),o.a.createElement("option",{value:"guest"},"guest"))),o.a.createElement("div",{className:"flex"},o.a.createElement("div",{className:"min-w-48 pt-20"},o.a.createElement(u.w,{color:"action"},"people_outline")),o.a.createElement(u.ab,{variant:"subtitle1",color:"inherit",className:"min-w-160 pt-20"},"Account Status"),o.a.createElement(ne.a,{className:"mb-24",native:!0,value:this.state.account_status,onChange:this.handleChange,input:o.a.createElement(se.a,{name:"account_status",labelWidth:0,id:"account_status"}),fullWidth:!0},o.a.createElement("option",{value:"Active"},"Active"),o.a.createElement("option",{value:"Inactive"},"Inactive"),o.a.createElement("option",{value:"Closed"},"Closed"),o.a.createElement("option",{value:"Restricted"},"Restricted"))),o.a.createElement("div",{className:"flex"},o.a.createElement("div",{className:"min-w-48 pt-20"},o.a.createElement(u.w,{color:"action"},"email")),o.a.createElement(u.ab,{variant:"subtitle1",color:"inherit",className:"min-w-160 pt-20"},"PaymentType"),o.a.createElement(u.X,{className:"mb-24",label:"PaymentType",id:"PaymentType",name:"PaymentType",value:this.state.PaymentType,onChange:this.handleChange,variant:"outlined",fullWidth:!0,required:!0})),o.a.createElement("div",{className:"flex"},o.a.createElement("div",{className:"min-w-48 pt-20"},o.a.createElement(u.w,{color:"action"},"date")),o.a.createElement(u.ab,{variant:"subtitle1",color:"inherit",className:"min-w-160 pt-20"},"PayedDate"),o.a.createElement(u.X,{className:"mb-24",label:"PayedDate",id:"PayedDate",name:"PayedDate",value:this.state.PayedDate,onChange:this.handleChange,variant:"outlined",fullWidth:!0,required:!0}))),"new"===a.type?o.a.createElement(u.k,{className:"justify-between pl-16"},o.a.createElement(u.c,{variant:"contained",color:"primary",onClick:function(){n(e.state),e.closeComposeDialog()},disabled:!this.canBeSubmitted()},"Add")):o.a.createElement(u.k,{className:"justify-between pl-16"},o.a.createElement(u.c,{variant:"contained",color:"primary",onClick:function(){r(e.state),e.closeComposeDialog()},disabled:!this.canBeSubmitted()},"Save"),o.a.createElement(u.x,{onClick:function(){window.confirm("Are you sure to delete it?")&&(s(e.state._id),e.closeComposeDialog())}},o.a.createElement(u.w,null,"delete"))))}}]),t}(i.Component);var ie=Object(f.b)(function(e){return{userDialog:e.usersApp.users.userDialog}},function(e){return Object(d.c)({closeEditUserDialog:G,closeNewUserDialog:H,addUser:q,updateUser:B,removeUser:X},e)})(le),oe=a(40),ue={entities:[],searchText:"",selectedUserIds:[],routeParams:{},userDialog:{type:"new",props:{open:!1},data:null}},me=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ue,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case y:return Object(te.a)({},e,{entities:t.payload,routeParams:t.routeParams});case S:return Object(te.a)({},e,{searchText:t.searchText});case N:var a=t.userId,n=Object(oe.a)(e.selectedUserIds);return n=void 0!==n.find(function(e){return e===a})?n.filter(function(e){return e!==a}):Object(oe.a)(n).concat([a]),Object(te.a)({},e,{selectedUserIds:n});case U:var r=Object.keys(e.entities).map(function(t){return e.entities[t]}).map(function(e){return e._id});return Object(te.a)({},e,{selectedUserIds:r});case w:return Object(te.a)({},e,{selectedUserIds:[]});case j:return Object(te.a)({},e,{userDialog:{type:"new",props:{open:!0},data:null}});case P:return Object(te.a)({},e,{userDialog:{type:"new",props:{open:!1},data:null}});case O:return Object(te.a)({},e,{userDialog:{type:"edit",props:{open:!0},data:t.data}});case A:return Object(te.a)({},e,{userDialog:{type:"edit",props:{open:!1},data:null}});default:return e}},pe=Object(d.d)({users:me}),de=function(e){function t(){return Object(n.a)(this,t),Object(s.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.props.getUsers(this.props.match.params)}},{key:"componentDidUpdate",value:function(e,t){b.a.isEqual(this.props.location,e.location)||this.props.getUsers(this.props.match.params)}},{key:"render",value:function(){var e=this,t=this.props,a=t.classes,n=t.openNewUserDialog;return o.a.createElement(o.a.Fragment,null,o.a.createElement(p.l,{classes:{contentCardWrapper:"p-16 sm:p-24 pb-80",leftSidebar:"w-256 border-0",header:"min-h-72 h-72 sm:h-136 sm:min-h-136"},header:o.a.createElement(Q,{pageLayout:function(){return e.pageLayout}}),content:o.a.createElement(Y,null),leftSidebarContent:o.a.createElement(ee,null),sidebarInner:!0,onRef:function(t){e.pageLayout=t},innerScroll:!0}),o.a.createElement(p.a,{animation:"transition.expandIn",delay:300},o.a.createElement(u.o,{color:"primary","aria-label":"add",className:a.addButton,onClick:n},o.a.createElement(u.w,null,"person_add"))),o.a.createElement(ie,null))}}]),t}(i.Component);t.default=Object(E.a)("usersApp",pe)(Object(m.withStyles)(function(e){return{addButton:{position:"absolute",right:12,bottom:12,zIndex:99}}},{withTheme:!0})(Object(h.g)(Object(f.b)(function(e){var t=e.usersApp;return{users:t.users.entities,selectedUserIds:t.users.selectedUserIds,searchText:t.users.searchText,user:t.user}},function(e){return Object(d.c)({getUsers:I,openNewUserDialog:W},e)})(de))))}}]);