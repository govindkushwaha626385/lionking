import axios from "axios";
import React, { useEffect, useState } from "react";
// import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { server } from "../../server";
import { categoriesData } from "../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "react-toastify";

const OwnerDashboardCreateListing = () => {
  const navigate = useNavigate();
  const owner_id = localStorage.getItem("owner_id");
  if (!owner_id) {
    navigate("/owner-login");
  }
  // const id = owner_id;
  // const owner_id = id;

  const [file, setFile] = useState(null);
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState();
  const [state, setState] = useState("");
  const [priceDetails, setPriceDetails] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [gali_no, setGali_no] = useState();
  const [building_no, setBuilding_no] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [listings, setListings] = useState([]);
  const [isPremiumExist, setIsPremiumExist] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState({});

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!file) newErrors.file = "Image is required";
    if (!video) newErrors.video = "Video is required";

    if (!title) newErrors.title = "Title is required";
    else if (title.length < 10)
      newErrors.title = "Title should be minimum 10 characters long";

    if (!description) newErrors.description = "Description is required";
    else if (description.length < 50)
      newErrors.description =
        "Description should be minimum 50 characters long";
    else if (description.length > 400)
      newErrors.description =
        "Description should be maximum 400 characters long";

    if (!priceDetails) newErrors.priceDetails = "Price Dateils is required";
    else if (priceDetails.length < 10)
      newErrors.priceDetails =
        "Price Details should be minimum 10 characters long";

    if (!type) newErrors.type = "Type is required";

    if (!price) newErrors.price = "Price is required";
    else if (price < 0) newErrors.price = "Please enter valid price";

    if (!discountPrice) newErrors.discountPrice = "Discount Price is required";
    else if (discountPrice < 0)
      newErrors.discountPrice = "Please enter valid Valid Price";
    else if (discountPrice > price)
      newErrors.discountPrice =
        "Discount Price Should be less or equal than original price";

    if (!state) newErrors.state = "State is required";
    else if (state.length < 3) newErrors.state = "Please enter valid state";

    if (!city) newErrors.city = "City is required";
    else if (city.length < 3) newErrors.city = "Please enter valid city";

    if (!area) newErrors.area = "Area is required";
    else if (area.length < 5) newErrors.area = "Please enter valid area";

    if (gali_no) {
      if (gali_no > 20)
        newErrors.gali_no = "Please enter valid street details <= 20";
    }
    if (building_no) {
      if (building_no > 100)
        newErrors.building_no = "Please enter valid building details <= 100";
    }

    return newErrors;
  };

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const fetchListings = async (id) => {
    try {
      const responce = await axios.get(
        `${server}/listing/owner-all-listings/${id}`
      );
      if (responce.data.success) {
        setListings(responce.data.data.listings);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const checkPremiumExist = async (id) => {
    const responce = await axios.get(
      `${server}/subscription/isActiveSubscriptionExist/${id}`
    );
    // console.log("Data : ", responce.data);
    if (responce.data.success) {
      if (responce.data.isExist) {
        setIsPremiumExist(true);
        setSubscriptionData(responce.data.data.subscription);
      }
    }
  };
  useEffect(() => {
    fetchListings(owner_id);
    checkPremiumExist(owner_id);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // console.log("isPremiumExist : ", isPremiumExist);
      // console.log("Length : ", listings.length);

      // console.log("Subscription Data ", subscriptionData);

      if (!isPremiumExist && listings.length === 1) {
        toast.warn(
          "Free limit exceded! Please upgrade your subscription plan to add more products"
        );
      } else if (
        isPremiumExist &&
        listings.length === subscriptionData.maxlistings
      ) {
        toast.warn("Plan Limit exceded!");
      } else {
        if (!file) return;

        const formData1 = new FormData();
        formData1.append("file", file); //
        formData1.append("upload_preset", "homeaway");
        // console.log("Form data ", formData);
        const formData2 = new FormData();
        formData2.append("file", video);
        formData2.append("upload_preset", "homeaway");

        try {
          const response1 = await axios.post(
            "https://api.cloudinary.com/v1_1/dxullcmvf/image/upload",
            formData1
          );
          const response2 = await axios.post(
            "https://api.cloudinary.com/v1_1/dxullcmvf/video/upload",
            formData2
          );
          const image_url = response1.data.secure_url;
          const video_url = response2.data.secure_url;

          try {
            const responce = await axios.post(
              `${server}/listing/create-listing`,
              {
                title,
                description,
                type,
                price,
                state,
                city,
                area,
                gali_no,
                building_no,
                image_url,
                video_url,
                priceDetails,
                discountPrice,
                owner_id,
              },
              
            );
            if (responce.data.success) {
              // window.location.reload(true);
              toast.success(responce.data.message);
              navigate(`/owner-dashboard-listings`);
            }
          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          console.error("Upload failed:", error);
        }
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Listing</h5>
      {/* create product form */}
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={title}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title of listing..."
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>
        <br />
        <div>
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="8"
            type="text"
            name="description"
            value={description}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your listing description..."
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>
        <br />
        <div>
          <label className="pb-2">
            Type <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Choose a category">Choose a category</option>
            {categoriesData &&
              categoriesData.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))}
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type}</p>
          )}
        </div>
        <br />
        <div>
          <label className="pb-2">Original Price</label>
          <input
            type="number"
            name="price"
            value={price}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter your product price..."
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price}</p>
          )}
        </div>
        <br />
        <div>
          <label className="pb-2">
            Price (With Discount) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={discountPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Enter your product price with discount..."
          />
          {errors.discountPrice && (
            <p className="text-red-500 text-sm mt-1">{errors.discountPrice}</p>
          )}
        </div>
        <br />

        <div>
          <label className="pb-2">
            Price Details <span className="text-red-500">*</span>
          </label>
          <input
            name="priceDetails"
            value={priceDetails}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setPriceDetails(e.target.value)}
            placeholder="Enter price Details..."
          />
          {errors.priceDetails && (
            <p className="text-red-500 text-sm mt-1">{errors.priceDetails}</p>
          )}
        </div>
        <br />
        <div>
          <label className="pb-2">
            State <span className="text-red-500">*</span>
          </label>
          <input
            name="state"
            value={state}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setState(e.target.value)}
            placeholder="Enter state..."
          />
          {errors.state && (
            <p className="text-red-500 text-sm mt-1">{errors.state}</p>
          )}
        </div>
        <br />
        <div>
          <label className="pb-2">
            City <span className="text-red-500">*</span>
          </label>
          <input
            name="city"
            value={city}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city..."
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>
        <br />
        <div>
          <label className="pb-2">
            Area <span className="text-red-500">*</span>
          </label>
          <input
            name="area"
            value={area}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setArea(e.target.value)}
            placeholder="Enter area..."
          />
          {errors.area && (
            <p className="text-red-500 text-sm mt-1">{errors.area}</p>
          )}
        </div>
        <br />
        <div>
          <label className="pb-2">
            Gali <span className="text-red-500">* (Number)</span>
          </label>
          <input
            name="gali_no"
            type="number"
            value={gali_no}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setGali_no(e.target.value)}
            placeholder="Enter state..."
          />
          {errors.gali_no && (
            <p className="text-red-500 text-sm mt-1">{errors.gali_no}</p>
          )}
        </div>
        <br />
        <div>
          <label className="pb-2">
            Building Number <span className="text-red-500">*</span>
          </label>
          <input
            name="building_no"
            type="number"
            value={building_no}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setBuilding_no(e.target.value)}
            placeholder="Enter state..."
          />
          {errors.building_no && (
            <p className="text-red-500 text-sm mt-1">{errors.building_no}</p>
          )}
        </div>
        <br />

        {/* image input  */}
        <div>
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            accept="image/*"
            id="upload"
            className="hidden"
            onChange={handleImageChange}
          />

          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload" className="pb-2 cursor-pointer">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {file && (
              <img
                src={file}
                key={file}
                alt=""
                className="h-[120px] w-[120px] object-cover m-2"
              />
            )}
          </div>
          {errors.file && (
            <p className="text-red-500 text-sm mt-1">{errors.file}</p>
          )}
        </div>
        {/* video input  */}

        <div>
          <label htmlFor="video-upload" className="pb-2 cursor-pointer">
            Upload Video <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            accept="video/*"
            id="video-upload"
            className="hidden"
            onChange={handleVideoChange}
          />

          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="video-upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {video && (
              <video controls className="h-[120px] w-[120px] object-cover m-2">
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
          {errors.video && (
            <p className="text-red-500 text-sm mt-1">{errors.video}</p>
          )}
        </div>

        <br />
        <div>
          <input
            type="submit"
            value="Create"
            className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </form>
    </div>
  );
};

export default OwnerDashboardCreateListing;
