import { library } from '@fortawesome/fontawesome-svg-core';

import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faRedditAlien } from '@fortawesome/free-brands-svg-icons/faRedditAlien';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons/faGooglePlusG';
import { faTumblr } from '@fortawesome/free-brands-svg-icons/faTumblr';
import { faPinterestP } from '@fortawesome/free-brands-svg-icons/faPinterestP';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { faVk } from '@fortawesome/free-brands-svg-icons/faVk';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons/faFacebookMessenger';
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons/faTelegramPlane';
import { faMix } from '@fortawesome/free-brands-svg-icons/faMix';
import { faXing } from '@fortawesome/free-brands-svg-icons/faXing';

import { faCommentAlt } from '@fortawesome/free-solid-svg-icons/faCommentAlt';

const icons = [
  faFacebookF, faTwitter, faLinkedinIn, faGooglePlusG, faPinterestP, faRedditAlien, faTumblr,
  faWhatsapp, faVk, faFacebookMessenger, faTelegramPlane, faMix, faXing, faCommentAlt
];

library.add(...icons);