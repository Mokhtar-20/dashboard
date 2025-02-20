export const tablesData = {
    users: {
        hasTitle: true,
        title: 'Users',
        hasAddButton: true,
        add_title: 'Add User',
        edit_title: 'Edit User',
        delete_title: 'delete this User',
        hasBackLink: true,
        backLink: '/manage/users',
        massage: 'User deleted successfully.',
        titles:['', 'image', 'name', 'email', 'phone', 'actions',''],
        column:['sort', 'avatar', 'name', 'email', 'phone', 'editPage','delete'],
    },
    products: {
        hasTitle: true,
        title: 'Products',
        hasAddButton: true,
        edit_title: 'Edit Product',
        add_title: 'Add Product',
        hasBackLink: true,
        backLink: '/manage/products',
        delete_title: 'delete this Product',
        massage: 'Product deleted successfully.',
        titles:['', 'image', 'Product name', 'price', 'description', 'actions',''],
        column:['sort', 'image', 'name', 'price', 'description', 'editPage','delete'],
    }
}
