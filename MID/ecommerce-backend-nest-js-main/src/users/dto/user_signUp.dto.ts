import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class userSignUpDto {
  @IsNotEmpty({ message: "Name Can't be Null" })
  @IsString({ message: 'Name Should be string' })
  name: string;

  @IsNotEmpty({ message: "Email Can't be Null" })
  @IsString({ message: 'Email Should be String' })
  @IsEmail({}, { message: 'Please Provide a valid Email' })
  @Matches(
    /^([a-zA-Z0-9._%+-]+)@(gmail|yahoo|outlook|aol|hotmail|lycos|mail)\.com$/,
    {
      message:
        'Email must be from a valid domain like @gmail.com, @yahoo.com, @outlook.com, @aol.com, @hotmail.com, @lycos.com, or @mail.com',
    },
  )
  email: string;

  @IsNotEmpty({ message: "Password Can't be Empty" })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  password: string;
}
