type MenuItem = {
    id: number;
    parentId: number;
    path: string;
    active: boolean;
    children: Array<MenuItem>;
}

export default MenuItem;
