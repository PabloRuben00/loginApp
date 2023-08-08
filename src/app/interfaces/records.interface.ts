export default interface Records{
    id?: string;
    operation_id: string;
    user_id: string;
    amount: number;
    user_balance: number;
    operation_response: boolean;
    date: Date;
}

export default interface Operation{
    id_operation?: string;
    type_operation: string;
    cost_operation: number;
}

export default interface User{
    id_user?:string;
    username: string;
    password: string;
    status: boolean;
}