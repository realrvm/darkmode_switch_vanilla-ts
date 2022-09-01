import "./style.css";

document.addEventListener("DOMContentLoaded", function () {
  class Darkmode {
    private readonly darkmodeSwitch: HTMLButtonElement;

    constructor() {
      this.darkmodeSwitch = document.querySelector(
        "header > .darkmode"
      ) as HTMLButtonElement;

      if (this.getDarkmodeCookie()) {
        this.darkmodeSwitch.classList.add("active");
        document.body.classList.add("darkmode");
      }

      this.darkmodeSwitch.addEventListener("click", (element: MouseEvent) => {
        element.preventDefault();
        this.darkmodeSwitch.classList.toggle("active");
        document.body.classList.toggle("darkmode");

        if (document.body.classList.contains("darkmode")) {
          this.setDarkmodeCookie("darkmode", "true", 262800000, "/", false);
        } else this.removeDarkmodeCookie();
      });
    }

    setDarkmodeCookie(
      key: string,
      value: string,
      time: number,
      path: string,
      secure = false
    ): void {
      const expires = new Date();
      expires.setTime(expires.getTime() + time);
      const pathValue = path ? `path=${path};` : "";
      const isSecure = secure ? ";secure" : "";

      document.cookie = `${key}=${value};${pathValue}expires=${expires.toUTCString()}${isSecure}`;
    }

    getDarkmodeCookie(): string | null {
      const keyValue = document.cookie.match("(^|;) ?darkmode=([^;]*)(;|$)");

      return keyValue ? keyValue[2] : null;
    }

    removeDarkmodeCookie(): void {
      document.cookie = "darkmode=; Max-Age=0; path=/";
    }
  }

  new Darkmode();
});
