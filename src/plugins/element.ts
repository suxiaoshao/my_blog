import Vue from 'vue'
import {
    Button,
    Card,
    Container,
    Pagination,
    Col,
    Row,
    Link,
    Header,
    Main,
    Dialog,
    Menu,
    Form,
    FormItem,
    Input,
    MenuItem,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Icon,
    Image,
    Loading,
    Popover,
    Avatar,
    Message,
    Notification
} from "element-ui";

Vue.use(Button)
Vue.use(Col)
Vue.use(Card)
Vue.use(Container)
Vue.use(Pagination)
Vue.use(Row)
Vue.use(Link)
Vue.use(Header)
Vue.use(Main)
Vue.use(Dialog)
Vue.use(Menu)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(MenuItem)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Icon)
Vue.use(Image)
Vue.use(Loading)
Vue.use(Popover)
Vue.use(Avatar)

Vue.prototype.$message=Message
Vue.prototype.$notify=Notification
