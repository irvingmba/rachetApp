import Polyglot from "node-polyglot";

const phrases = {
  en: {
    login:{
      title: "Sign in",
      toRegister: "Don't you have an account? Sign up",
      fUser: "Username",
      fPassword: "Password",
      submit: "Sign in",
      hint: "Already have an account? Sign in"
    },
    registry: {
      title: "Sign up",
      fName: "Name",
      fUser: "Username",
      fEmail: "Email Address",
      fBirthday: "Birthday",
      fPassword: "Password",
      fConfPass: "Confirm password",
      submit: "Sign up"
    },
  },
  fr: {
    login: {
      title: "Se connecter",
      toRegister: "Vous n'avez pas de compte? S'inscrire",
      fUser: "Nom d'utilisateur",
      fPassword: "Mot de passe",
      submit: "se connecter",
      hint: "Vous avez déjà un compte? se connecter"
    },
    registry: {
      title: "S'inscrire",
      fName: "Nom",
      fUser: "Nom d'utilisateur",
      fEmail: "Adresse e-mail",
      fBirthday: "Anniversaire",
      fPassword: "Mot de passe",
      fConfPass: "Confirmez le mot de passe",
      submit: "S'inscrire"
    },
  },
  ar: {
    login: {
      title: "تسجيل الدخول",
      toRegister: "أليس لديك حساب؟ سجل",
      fUser: "اسم المستخدم",
      fPassword: "كلمه السر",
      submit: "تسجيل الدخول",
      hint: "هل لديك حساب؟ تسجيل الدخول"
    },
    registry: {
      title: "سجل",
      fName: "اسم",
      fUser: "اسم المستخدم",
      fEmail: "عنوان البريد الإلكتروني",
      fBirthday: "عيد الميلاد",
      fPassword: "كلمه السر",
      fConfPass: "تأكيد كلمة المرور",
      submit: "سجل"
    },
  },
};

const polyOptions:Polyglot.PolyglotOptions = {
  phrases
};

const polyglot = new Polyglot(polyOptions);

export { polyglot };