const PASSWD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#\\$%\\^&\\*]).{8,128}$/;

  module.exports=PASSWD_REGEX