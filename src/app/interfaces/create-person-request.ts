export interface CreatePersonRequest {
    id: number;
    firstName: string;
    lastName: string;
    documentTypeId: number;
    documentNumber: string;
    email: string;
    active: boolean;
}
