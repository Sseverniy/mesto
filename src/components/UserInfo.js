export class UserInfo {
  constructor({userNameSelector, userInfoSelector, userAvatarSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
    this._userAvatar= document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return [
      this._userName.textContent,this._userInfo.textContent
    ]
  }

  setUserInfo(name, info, avatar) {
    this._userName.textContent = name;
    this._userInfo.textContent = info;
    this._userAvatar.style.backgroundImage = `url(${avatar})`;
  }
};
