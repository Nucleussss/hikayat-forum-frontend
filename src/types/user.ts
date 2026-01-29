export interface User {
	id: string;
	name: string;
	email: string;
	isActive: boolean;
	createdAt: Date;   // mapped from created_at
	updatedAt: Date;   // mapped from updated_at
}