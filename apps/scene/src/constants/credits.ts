export interface CreditPerson {
  imageUrl: string;
  name: string;
  type: string;
  url: string;
}

const CREDITS: CreditPerson[] = [
  {
    imageUrl:
      'https://prod-f2e-images.thef2e.com/avatar/6296432819610583959.jpg',
    name: 'Hanali',
    type: 'Designer',
    url: 'https://2021.thef2e.com/users/6296432819610583959',
  },
  {
    imageUrl: 'https://avatars.githubusercontent.com/u/42728066?v=4&size=40',
    name: 'Howard Tai',
    type: 'Engineer',
    url: 'https://github.com/howard86',
  },
];

export default CREDITS;
