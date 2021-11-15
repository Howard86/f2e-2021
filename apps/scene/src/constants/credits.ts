export type CreditPerson = {
  type: string;
  name: string;
  url: string;
  imageUrl: string;
};

const CREDITS: CreditPerson[] = [
  {
    type: 'Designer',
    name: 'Hanali',
    url: 'https://2021.thef2e.com/users/6296432819610583959',
    imageUrl:
      'https://prod-f2e-images.thef2e.com/avatar/6296432819610583959.jpg',
  },
  {
    type: 'Engineer',
    name: 'Howard Tai',
    url: 'https://github.com/howard86',
    imageUrl: 'https://avatars.githubusercontent.com/u/42728066?v=4&size=40',
  },
];

export default CREDITS;
