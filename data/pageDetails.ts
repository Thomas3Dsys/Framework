interface pageDetails {
  title: string;
  url: string;
  breadcrumb: string[];
}
//todo: update to serialize from json

export const PageDetails = {
  login: {
    title: "Account Login",
    url: "index.php?route=account/login",
    breadcrumb: ["Account", "Login"],
  },
  logout: {
    title: "Account Logout",
    url: "index.php?route=account/logout",
    breadcrumb: ["Account", "Logout"],
  },
  registration: {
    title: "Register Account",
    url: "index.php?route=account/register",
    breadcrumb: ["Account", "Register"],
  },
} as const satisfies Record<string, pageDetails>;
