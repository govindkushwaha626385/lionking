import React, { useEffect, useState } from "react";
import { server } from "../../server";
import styles from "../../styles/styles";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";

const ProfileContent = ({ active }) => {
  // const { id } = useParams();
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  if (!id) {
    navigate("/login");
  }

  const [data, setData] = useState({});

  const fetchData = async (id) => {
    try {
      const responce = await axios.get(`${server}/student/${id}`);
      if (responce.data.success) {
        setData(responce.data.data.student);
        // console.log(responce.data.data.student);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData(id);
  }, []);
  const [error, setError] = useState(false);
  const [name, setName] = useState(data && data.name);
  const [email, setEmail] = useState(data && data.email);
  const [phone_no, setPhone_no] = useState(data && data.phone_no);
  const [password, setPassword] = useState("");
  const [institute_name, setInstitute_name] = useState(
    data && data.institute_name
  );
  const [course, setCourse] = useState(data && data.course);

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/^[a-zA-Z0-9]+@gmail\.com$/.test(email))
      newErrors.email =
        "Email must be a valid @gmail.com address with only letters and numbers before '@'";
    else if (email.length < 14) newErrors.email = "Please enter valid email";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters long";
    else if (
      !/[a-zA-Z]/.test(password) ||
      !/\d/.test(password) ||
      !/[^a-zA-Z\d]/.test(password)
    )
      newErrors.password =
        "Password must contain at least one letter, one number, and one special character";

    if (!phone_no) newErrors.phoneNo = "Phone number is required";
    else if (phone_no.length < 10 || phone_no.length > 10)
      newErrors.phoneNo = "Please enter valid phone number";

    if (!institute_name) newErrors.instituteName = "Institute name is required";
    else if (institute_name.length < 5)
      newErrors.instituteName =
        "Institute name must be at least 5 characters long";

    if (!course) newErrors.course = "Course is required";
    else if (course.length < 5)
      newErrors.course = "Course must be at least 5 characters long";
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length === 0) {
        console.log("Form data submitted:", {
          name,
          email,
          password,
          phone_no,
          institute_name,
          course,
        });
        // Add your form submission logic here
        const responce = await axios.put(
          `${server}/student/update-profile/${id}`,
          {
            name,
            email,
            password,
            phone_no,
            institute_name,
            course,
          }
        );
        if (responce.data.success) {
          toast.success(responce.data.message);
          setName(responce.data.data.student.name);
          setEmail(responce.data.data.student.email);
          setInstitute_name(responce.data.student.institute_name);
          setPhone_no(responce.data.data.student.phone_no);
          setCourse(responce.data.data.student.course);
        }
      } else {
        setError(validationErrors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      {/* profile */}
      {active === 1 && (
        <>
          <br />
          <br />
          <div className="w-full px-5">
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              aria-required={true}
            >
              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="email"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Enter your password</label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={phone_no}
                    onChange={(e) => setPhone_no(e.target.value)}
                  />
                </div>

                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Institute Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={institute_name}
                    onChange={(e) => setInstitute_name(e.target.value)}
                  />
                </div>

                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Course</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                  />
                </div>
              </div>
              <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
            </form>
          </div>
        </>
      )}

      {/* Change Password */}
      {active === 3 && (
        <div>
          <ChangePassword id={id} />
        </div>
      )}
    </div>
  );
};

const ChangePassword = (id) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [error, setError] = useState(false);
  const [errors, setErrors] = useState({});
  id = id.id;

  const validateForm = () => {
    const newErrors = {};
    if (!oldPassword) newErrors.password = "Old password is required";
    else if (oldPassword.length < 8)
      newErrors.oldPassword = "Password must be at least 8 characters long";
    else if (
      !/[a-zA-Z]/.test(oldPassword) ||
      !/\d/.test(oldPassword) ||
      !/[^a-zA-Z\d]/.test(oldPassword)
    )
      newErrors.oldPassword =
        "Password must contain at least one letter, one number, and one special character";

    if (!newPassword) newErrors.password = "New password is required";
    else if (newPassword.length < 8)
      newErrors.newPassword = "Password must be at least 8 characters long";
    else if (
      !/[a-zA-Z]/.test(newPassword) ||
      !/\d/.test(newPassword) ||
      !/[^a-zA-Z\d]/.test(newPassword)
    )
      newErrors.newPassword =
        "Password must contain at least one letter, one number, and one special character";

    if (!confirmPassword) newErrors.password = "Confirm password is required";
    else if (confirmPassword.length < 8)
      newErrors.confirmPassword = "Password must be at least 8 characters long";
    else if (
      !/[a-zA-Z]/.test(confirmPassword) ||
      !/\d/.test(confirmPassword) ||
      !/[^a-zA-Z\d]/.test(confirmPassword)
    )
      newErrors.confirmPassword =
        "Password must contain at least one letter, one number, and one special character";
    return newErrors;
  };

  const passwordChangeHandler = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      if (newPassword !== confirmPassword) {
        toast.error("New Password and Confirm new Password should be same");
      } else {
        const responce = await axios.put(`${server}/student/update-password`, {
          oldPassword,
          newPassword,
          id,
        });

        if (responce.data.success) {
          toast.success("Password changed successfully");
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
        } else {
          toast.error(responce.data.message);
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
        }
      }
    } else {
      setErrors(validationErrors);
    }
  };
  return (
    <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className=" w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Enter your old password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            {errors.oldPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.oldPassword}</p>
            )}
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your new password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
            )}
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your confirm password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
            <input
              className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileContent;
