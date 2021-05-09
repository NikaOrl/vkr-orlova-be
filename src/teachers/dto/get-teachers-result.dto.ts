import { Teacher } from '../teachers.interface';

export type GetTeachersResultDto = Omit<Teacher, 'password'>[];
