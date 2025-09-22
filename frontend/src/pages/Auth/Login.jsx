import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import loginImage from "../../components/images/login.jpg";
import { useTranslation } from "react-i18next";
import "./login.css"; // Import the CSS file

import i18n from "../../i18n";
import { translateText } from "../../Utils/translate";



const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }));
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.message);
    }
  };

  const [translatedLabels, setTranslatedLabels] = useState({
  login: "",
  email: "",
  emailPlaceholder: "",
  password: "",
  passwordPlaceholder: "",
  loggingIn: "",
  newUser: "",
  register: "",
});

useEffect(() => {
  const translateLabels = async () => {
    if (i18n.language === "kh") {
      const login = await translateText("Login", "kh");
      const email = await translateText("Email Address", "kh");
      const emailPlaceholder = await translateText("Enter your email address", "kh");
      const password = await translateText("Password", "kh");
      const passwordPlaceholder = await translateText("Enter your password", "kh");
      const loggingIn = await translateText("Logging in...", "kh");
      const newUser = await translateText("New User", "kh");
      const register = await translateText("Register", "kh");

      setTranslatedLabels({
        login,
        email,
        emailPlaceholder,
        password,
        passwordPlaceholder,
        loggingIn,
        newUser,
        register,
      });
    } else {
      setTranslatedLabels({
        login: "",
        email: "",
        emailPlaceholder: "",
        password: "",
        passwordPlaceholder: "",
        loggingIn: "",
        newUser: "",
        register: "",
      });
    }
  };

  translateLabels();
}, [i18n.language]);


  return (
    <div className="login-section">
      <section className="login-container">
        <div className="login-form">
          <h1 className="text-2xl font-semibold mb-4">
            {/* {t("Login")} */}
              {i18n.language === "kh" ? translatedLabels.login || t("Login") : t("Login")}
            </h1>

          <form
            onSubmit={submitHandler}
            className="container w-[40rem] focus:outline-none"
            action=""
          >
            <div className="my-[2rem]">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black focus:outline-none"
              >
                {/* {t("Email Address")} */}
                {i18n.language === "kh" ? translatedLabels.email || t("Email Address") : t("Email Address")}

              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 border rounded w-full focus:outline-none"
                // placeholder={t("Enter your email address")}
                placeholder={i18n.language === "kh" ? translatedLabels.emailPlaceholder || t("Enter your email address") : t("Enter your email address")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-[2rem]">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black focus:outline-none"
              >
                {/* {t("Password")} */}
                {i18n.language === "kh" ? translatedLabels.password || t("Password") : t("Password")}

              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 border rounded w-full focus:outline-none"
                // placeholder={t("Enter your password")}
                placeholder={i18n.language === "kh" ? translatedLabels.passwordPlaceholder || t("Enter your password") : t("Enter your password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
            >
              {/* {t(`${isLoading ? "Logging in..." : "Login"}`)} */}
              {i18n.language === "kh"
    ? isLoading
      ? translatedLabels.loggingIn || t("Logging in...")
      : translatedLabels.login || t("Login")
    : t(isLoading ? "Logging in..." : "Login")}

            </button>

            {isLoading && <Loader />}
          </form>

          <div className="mt-4">
            <p className="text-black">
              {/* {t("New User")}?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : `/register`}
                className="text-green-500 hover:underline"
              >
                {t("Register")}
              </Link> */}
              {i18n.language === "kh" ? translatedLabels.newUser || t("New User") : t("New User")}?
             <Link
                 to={redirect ? `/register?redirect=${redirect}` : `/register`}
                  className="text-green-500 hover:underline"
              >
                {i18n.language === "kh" ? translatedLabels.register || t("Register") : t("Register")}
              </Link>

            </p>
          </div>
        </div>
        {/* <img src={loginImage} alt="Login" className="login-image" /> */}
      </section>
    </div>
  );
};

export default Login;
