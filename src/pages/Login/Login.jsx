import { useFormik } from "formik";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { tokenCybersoft } from "src/constant";
import axios from "axios";
import './Login.scss'
import { loginSuccess } from 'src/redux/slices/Authentication';
import { useDispatch } from "react-redux";

const schemaLogin = Yup.object({
  email: Yup.string().email("Email chưa hợp lệ").required("Yêu cầu nhập email"),
  password: Yup.string()
    .required("Yêu cầu nhập mật khẩu")
    .min(6, "Mật khẩu tối thiểu 6 ký tự")
    .max(20, "Mật khẩu tối đa 20 ký tự"),

});
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: schemaLogin,
    onSubmit: async (values) => {
      try {
        console.log({ values });
        const resp = await axios.post(
          "https://airbnbnew.cybersoft.edu.vn/api/auth/signin",
          {
            password: values.password,
            email: values.email,
          }, 
          {
            headers: {
              tokenCybersoft: tokenCybersoft,
            },
          }
        );
        dispatch(loginSuccess(resp.data.content.tokenCybersoft));
        console.log({ resp });
        navigate("/");
      } catch (err) {
        if (err.response && err.response.status === 400) {
            const errorMessage = err.response.data.content;
            alert(errorMessage);
          } else {
            alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
          }
      }
    },
  });
  return (
    <section className="container">
      <h1 className="login-title text-center">Đăng nhập</h1>
      <form className='login-form' onSubmit={formik.handleSubmit}>
        <div className="row email-content">
          <div className="col-3"></div>
          <div className="col-6">
            <div >
              <label>Email</label>
              <br />
              <input type='text' name='email' {...formik.getFieldProps('email')} />
              {formik.errors.email && formik.touched.email && (
                <p>{formik.errors.email}</p>
              )}
            </div>
          </div>
          <div className="col-3"></div>
        </div>

        <div className="row password-content">
          <div className="col-3"></div>
          <div className="col-6">
            <div >
              <label>Password</label>
              <br />
              <div className="password-input-container">
                <input
                  type='password'
                  name='password'
                  {...formik.getFieldProps('password')}
                />
              </div>
              {formik.errors.password && formik.touched.password && (
                <p>{formik.errors.password}</p>
              )}
            </div>
          </div>
          <div className="col-3"></div>
        </div>

        <div className="row submit-handle">
          <div className="col-3"></div>
          <div className="col-6 d-flex justify-content-end">
            <NavLink to={'/register'} className='register-link'>
                Đăng ký ngay?
            </NavLink>
            <button className='btn-login' type='submit'>Đăng nhập</button>
          </div>
          <div className="col-3"></div>
        </div>



      </form>
    </section>
  );
}

export default Login;
