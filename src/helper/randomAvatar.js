module.exports = () => {
  const source = [
    'https://res.cloudinary.com/dgext7ewd/image/upload/v1593480379/messenger_app/avatar/default/default-avatar-9_mwetwf_uhr1f1.png',
    'https://res.cloudinary.com/dgext7ewd/image/upload/v1593480379/messenger_app/avatar/default/default-avatar-10_iz0nfy_bzttfy.png',
    'https://res.cloudinary.com/dgext7ewd/image/upload/v1593480379/messenger_app/avatar/default/default-avatar-7_bptoqz_nfoa0a.png',
    'https://res.cloudinary.com/dgext7ewd/image/upload/v1593480379/messenger_app/avatar/default/default-avatar-8_tzlnmq_qmz7f7.png',
    'https://res.cloudinary.com/dgext7ewd/image/upload/v1593480379/messenger_app/avatar/default/default-avatar-6_hy6odx_ivtafo.png',
    'https://res.cloudinary.com/dgext7ewd/image/upload/v1593480379/messenger_app/avatar/default/default-avatar-4_kvblgd_m4hhpc.png',
    'https://res.cloudinary.com/dgext7ewd/image/upload/v1593480379/messenger_app/avatar/default/default-avatar-5_jvqma8_qijjha.png',
    'https://res.cloudinary.com/dgext7ewd/image/upload/v1593480379/messenger_app/avatar/default/default-avatar-3_dh1jvk_siwoky.png',
    'https://res.cloudinary.com/dgext7ewd/image/upload/v1593480379/messenger_app/avatar/default/default-avatar-2_poacpz_uwvzoe.png',
    'https://res.cloudinary.com/dgext7ewd/image/upload/v1593480379/messenger_app/avatar/default/default-avatar-1_e8giie_rwkex5.png',
  ];
  const randomIndx = Math.floor(Math.random() * source.length);
  return source[randomIndx];
};
