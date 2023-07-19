import React from "react";
import "./Register.scss";
import * as Yup from "yup";
import axios from "axios";
import { tokenCybersoft } from "src/constant";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";

const nameRegex = /^[a-zA-ZÀ-ỹ\s']+$/;
const phoneRegex = /^[0-9]{10}$/;

const schemaRegister = Yup.object({
  email: Yup.string().email().required("Mời nhập email"),
  userName: Yup.string()
    .matches(nameRegex, "Tên không hợp lệ")
    .required("Mời nhập tên"),
  password: Yup.string()
    .required("Mời nhập mật khẩu")
    .min(6, "Mật khẩu tối thiểu 6 ký tự")
    .max(20, "Mật khẩu tối đa 20 ký tự"),
  phone: Yup.string()
    .matches(phoneRegex, "Số điện thoại không hợp lệ")
    .required("Mời nhập số điện thoại"),
  birthday: Yup.date()
    .required("Mời nhập ngày sinh.")
    .max(new Date(), "Ngày sinh không hợp lệ")
    .test("valid-date", "Ngày sinh không hợp lệ.", (value) => {
      const today = new Date();
      const selectedDate = new Date(value);
      return selectedDate <= today;
    }),
});

function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      userName: "",
      phone: "",
      genderString: "male",
      birthday: "",
      role: "customer",
    },

    validationSchema: schemaRegister,

    onSubmit: async (values) => {
      try {
        const resp = await axios.post(
          "https://airbnbnew.cybersoft.edu.vn/api/auth/signup",
          {
            email: values.email,
            password: values.password,
            userName: values.userName,
            phone: values.phone,
            birthday: values.birthday,
            gender: values.genderString === "male" ? true : false,
            role: values.role,

          },
          {
            headers: {
              tokenCybersoft: tokenCybersoft,
            },
          }
        );
        console.log("resp signup", resp);
        navigate("/login");
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
      <form onSubmit={formik.handleSubmit} className="register-form">
        <h1 className="register-title text-center">Đăng ký</h1>
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6 ">
            <div className="regis-content">
              <label>Email</label>
              <br />
              <input
                type="text"
                name="email"
                {...formik.getFieldProps("email")}
              />
              {formik.errors.email && formik.touched.email && (
                <p>{formik.errors.email}</p>
              )}
            </div>
            <div className="regis-content">
              <label>Mật khẩu</label>
              <br />
              <div className="password-input-container">
                <input
                  type="password"
                  name="password"
                  {...formik.getFieldProps("password")}
                />
              </div>

              {formik.errors.password && formik.touched.password && (
                <p>{formik.errors.password}</p>
              )}
            </div>
            <div className="regis-content">
              <label>Họ tên</label>
              <br />
              <input
                type="text"
                name="userName"
                {...formik.getFieldProps("userName")}
              />
              {formik.errors.userName && formik.touched.userName && (
                <p>{formik.errors.userName}</p>
              )}
            </div>
            <div className="regis-content">
              <label>Số điện thoại</label>
              <br />
              <input
                type="text"
                name="phone"
                {...formik.getFieldProps("phone")}
              />
              {formik.errors.phone && formik.touched.phone && (
                <p>{formik.errors.phone}</p>
              )}
            </div>
            <div className="regis-content">
              <label>Ngày sinh</label>
              <br />
              <input
                type="date"
                name="birthday"
                {...formik.getFieldProps("birthday")}
              />
              {formik.errors.birthday && formik.touched.birthday && (
                <p>{formik.errors.birthday}</p>
              )}
            </div>

            <div className="regis-gender d-flex">
              <label>Giới tính</label>
              <div className="gender-input">
                <input
                  type="radio"
                  name="genderString"
                  value="male"
                  checked={
                    formik.getFieldProps("genderString").value === "male"
                  }
                  onChange={formik.getFieldProps("genderString").onChange}
                  onBlur={formik.getFieldProps("genderString").onBlur}
                  className="hidden-radio"
                />
                <label>Nam</label>

                <input
                  type="radio"
                  name="genderString"
                  value="female"
                  checked={
                    formik.getFieldProps("genderString").value === "female"
                  }
                  onChange={formik.getFieldProps("genderString").onChange}
                  onBlur={formik.getFieldProps("genderString").onBlur}
                  className="hidden-radio"
                />
                <label> Nữ </label>
              </div>
            </div>
            <div className="submit-handle d-flex justify-content-end">
              <button className="btn-submit" type="submit">  
                  Đăng ký
              </button>
            </div>
          </div>
          <div className="col-3"></div>
        </div>
      </form>
    </section>
  );
}

export default Register;
