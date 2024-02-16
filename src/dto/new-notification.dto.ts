import { IsNotEmpty, IsString, IsDateString, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class NewNotificationDto {
    @IsString()
    style: string;

    @IsOptional()
    @IsString()
    url: string | null;

    @IsNotEmpty()
    @IsString()
    text: string;

    @IsBoolean()
    active: boolean;

    @IsDateString()
    date: Date;

    @IsNumber()
    user_id: number;

}
