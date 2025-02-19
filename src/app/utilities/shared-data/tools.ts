export const sidenavList = {
    tabs: [
        {
            icon: 'bi-people-fill',
            title: 'Users',
            route: '/manage/users', 
            logOut: false,
        },
        {
            icon: 'bi-basket3-fill',
            title: 'Products',
            route: '/manage/products', 
            logOut: false,
        },
        {
            icon: 'bi-door-closed-fill',
            title: 'Log Out',
            isDropDown: false,
            logOut: true,   
        }
    ]
}