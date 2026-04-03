import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateLocaliteDto {
  @IsString()
  city: string;

  @IsString()
  country: string;

  @IsOptional()
  @IsArray()
  expertise?: string[];

  @IsString()
  bio: string;

  @IsOptional()
  @IsArray()
  languages?: string[];
}

export class UpdateLocaliteDto {
  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsArray()
  expertise?: string[];

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsArray()
  languages?: string[];

  @IsOptional()
  @IsString()
  verificationStatus?: string;
}
