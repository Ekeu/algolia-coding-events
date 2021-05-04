import md5 from 'md5';
import cookie from 'cookie';

export const generateGravatar = (email) => {
  const hashedEmail = md5(email.toLowerCase().trim());
  return `https://www.gravatar.com/avatar/${hashedEmail}?d=identicon`;
};
export const parseCookies = (req) => {
  return cookie.parse(req ? req.headers.cookie || '' : '');
};
export const returnImage = (event) => {
  let imageSRC;
  if (event.image) {
    if (event.image.formats.medium) {
      imageSRC = event.image.formats.medium.url;
    } else {
      imageSRC = event.image.formats.thumbnail.url;
    }
  } else {
    imageSRC = '/assets/images/codingLab-default-bg-event.png';
  }

  return imageSRC
};
