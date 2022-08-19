const fakeUsers = {
  user1:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2aWRlbyI6eyJyb29tSm9pbiI6dHJ1ZSwicm9vbSI6InJvb20xIiwiY2FuUHVibGlzaCI6dHJ1ZSwiY2FuU3Vic2NyaWJlIjp0cnVlfSwiaWF0IjoxNjYwNTQ3NjIxLCJuYmYiOjE2NjA1NDc2MjEsImV4cCI6MTY2OTE4NzYyMSwiaXNzIjoiQVBJWXlIQ2ZrRGNTUGdkIiwic3ViIjoidXNlcjEiLCJqdGkiOiJ1c2VyMSJ9.jAgUKMlfSApAm72fl69PAAnnMyWOtl9cNYN9gLpJvls',
  user2:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2aWRlbyI6eyJyb29tSm9pbiI6dHJ1ZSwicm9vbSI6InJvb20xIiwiY2FuUHVibGlzaCI6dHJ1ZSwiY2FuU3Vic2NyaWJlIjp0cnVlfSwiaWF0IjoxNjYwNTQ3NzEzLCJuYmYiOjE2NjA1NDc3MTMsImV4cCI6MTY2OTE4NzcxMywiaXNzIjoiQVBJWXlIQ2ZrRGNTUGdkIiwic3ViIjoidXNlcjIiLCJqdGkiOiJ1c2VyMiJ9.wVavM23t6XVcqG5gc3_sBI-MKrKQk9o95ovGzEKN6zQ',
  user3:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2aWRlbyI6eyJyb29tSm9pbiI6dHJ1ZSwicm9vbSI6InJvb20xIiwiY2FuUHVibGlzaCI6dHJ1ZSwiY2FuU3Vic2NyaWJlIjp0cnVlfSwiaWF0IjoxNjYwNTQ3NzU3LCJuYmYiOjE2NjA1NDc3NTcsImV4cCI6MTY2OTE4Nzc1NywiaXNzIjoiQVBJWXlIQ2ZrRGNTUGdkIiwic3ViIjoidXNlcjMiLCJqdGkiOiJ1c2VyMyJ9.qG-voGnj43piKW7oQbVB7-eETHzOE_acqjRHEvqqmY4',
  user4:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2aWRlbyI6eyJyb29tSm9pbiI6dHJ1ZSwicm9vbSI6InJvb20xIiwiY2FuUHVibGlzaCI6dHJ1ZSwiY2FuU3Vic2NyaWJlIjp0cnVlfSwiaWF0IjoxNjYwNTQ3NzgxLCJuYmYiOjE2NjA1NDc3ODEsImV4cCI6MTY2OTE4Nzc4MSwiaXNzIjoiQVBJWXlIQ2ZrRGNTUGdkIiwic3ViIjoidXNlcjQiLCJqdGkiOiJ1c2VyNCJ9.ZnhhN_UgqtXqka3kF8pqZXP7ziumHy11k1OaPsOXjo4',
};

export const getFakeUserToken = (name: string) => {
  let token = '';
  switch (name) {
    case 'user1':
      token = fakeUsers['user1'];
      break;

    case 'user2':
      token = fakeUsers['user2'];
      break;

    case 'user3':
      token = fakeUsers['user3'];
      break;

    case 'user4':
      token = fakeUsers['user4'];
      break;

    default:
      token = fakeUsers['user4'];

      break;
  }

  return token;
};
