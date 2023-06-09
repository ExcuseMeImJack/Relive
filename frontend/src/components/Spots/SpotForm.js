import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import {
  thunkCreateSpot,
  thunkCreateSpotImage,
  thunkUpdateSpot,
} from "../../store/spots";
import "./spot-create.css";
import Loading from "../Loading";

const SpotForm = ({ spot, formType }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const [country, setCountry] = useState(spot.country);
  const [address, setAddress] = useState(spot.address);
  const [city, setCity] = useState(spot.city);
  const [state, setState] = useState(spot.state);
  const [description, setDescription] = useState(spot.description);
  const [spotName, setSpotName] = useState(spot.name);
  const [price, setPrice] = useState(spot.price);

  const [previewImage, setPreviewImage] = useState(null);
  const [spotImage1, setSpotImage1] = useState(null);
  const [spotImage2, setSpotImage2] = useState(null);
  const [spotImage3, setSpotImage3] = useState(null);
  const [spotImage4, setSpotImage4] = useState(null);
  const [spotImages, setSpotImages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [locationKeys, setLocationKeys] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);

  const currentLocationKey = location.key;
  // console.log(location);

  if (!locationKeys.includes(currentLocationKey)) {
    setLocationKeys([...locationKeys, currentLocationKey]);
  }

  useEffect(() => {
    const prevLocationKey = locationKeys[0];
    if (prevLocationKey !== currentLocationKey) {
      locationKeys.shift(0);
      setIsSubmitted(false);
      setCountry(spot.country);
      setAddress(spot.address);
      setCity(spot.city);
      setState(spot.state);
      setDescription(spot.description);
      setSpotName(spot.name);
      setPrice(spot.price);
      if (formType === "create") {
        setPreviewImage(null);
        setSpotImage1(null);
        setSpotImage2(null);
        setSpotImage3(null);
        setSpotImage4(null);
      }
    }
    // console.log(locationKeys); // [ "qqocnf", "qm6fsf" ]
    // console.log('PREV KEY: ', prevLocationKey) // qqocnf
    // console.log('CURR KEY: ', currentLocationKey) // qm6fsf
  }, [locationKeys]);

  useEffect(() => {
    const err = {};
    if (country.trim().length < 1) err.country = "Country is required";
    if (address.trim().length < 1) err.address = "Address is required";
    if (city.trim().length < 1) err.city = "City is required";
    if (state.trim().length < 1) err.state = "State is required";
    if (description.length < 30)
      err.description = "Description needs a minimum of 30 characters";
    if (spotName.trim().length < 1) err.spotName = "Name is required";
    if (price.length < 1) err.price = "Price is required";
    if (price.length > 0 && isNaN(parseInt(price))) err.price = "Price must be a number value";
    if (formType === "create") {
      if (!previewImage) err.previewImage = "Preview Image is required";
    }

    const images = {};

    if (previewImage) {
      images.previewImage = {
        file: previewImage,
        preview: true,
      };
    }

    if (spotImage1) {
      images.spotImage1 = {
        file: spotImage1,
        preview: false,
      };
    }

    if (spotImage2) {
      images.spotImage2 = {
        file: spotImage2,
        preview: false,
      };
    }

    if (spotImage3) {
      images.spotImage3 = {
        file: spotImage3,
        preview: false,
      };
    }

    if (spotImage4) {
      images.spotImage4 = {
        file: spotImage4,
        preview: false,
      };
    }
    setSpotImages(images);
    setErrors(err);
  }, [
    country,
    address,
    city,
    state,
    description,
    spotName,
    price,
    previewImage,
    spotImage1,
    spotImage2,
    spotImage3,
    spotImage4,
    formType,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (Object.values(errors).length < 1) {
      const newSpotInfo = {
        address,
        city,
        state,
        country,
        name: spotName,
        lat: 0,
        lng: 0,
        description,
        price: parseInt(price),
      };
      if (formType === "create") {
        const newSpot = await dispatch(thunkCreateSpot(newSpotInfo));
        const newSpotAdded = newSpot;
        setImageLoading(true);
        for (let key in spotImages) {
          await dispatch(
            thunkCreateSpotImage(newSpotAdded.id, spotImages[key])
          );
        }
        if (newSpotAdded.errors) {
          setErrors(newSpotAdded.errors);
        } else {
          setImageLoading(false);
          history.push(`/spots/${newSpotAdded.id}`);
        }
      } else if (formType === "update") {
        const updatedSpot = await dispatch(
          thunkUpdateSpot(spot.id, newSpotInfo)
        );
        const updated = updatedSpot;
        setImageLoading(true);
        for (let key in spotImages) {
          await dispatch(thunkCreateSpotImage(updated.id, spotImages[key]));
        }
        if (updated.errors) {
          setErrors(updated.errors);
        } else {
          setImageLoading(false);
          history.push(`/spots/${updated.id}`);
        }
      }
    }
  };

  return (
    <div className="spot-creation">
      <div className="spot-creation-container">
        {formType === "create" ? (
          <h1>Create a new Spot</h1>
        ) : (
          <h1>Update your Spot</h1>
        )}
        <h3-semibold>Where's your place located?</h3-semibold>
        <p>
          Guests will only get your exact address once they booked a
          reservation.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="spot-creation-location">
            <div className="country">
              <label className="above"> Country </label>
              {errors.country && (
                <span
                  className={isSubmitted ? "errors-shown" : "errors-hidden"}
                >
                  {errors.country}
                </span>
              )}
              <input
                className="below"
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <div className="address">
              <label className="above"> Street Address </label>
              {errors.address && (
                <span
                  className={
                    isSubmitted ? "errors-create-spot" : "errors-hidden"
                  }
                >
                  {errors.address}
                </span>
              )}
              <input
                className="below"
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="city-state">
              <div className="city-form">
                <label className="above"> City </label>
                {errors.city && (
                  <span
                    className={
                      isSubmitted ? "errors-create-spot" : "errors-hidden"
                    }
                  >
                    {errors.city}
                  </span>
                )}
                <input
                  className="below"
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />{" "}
                <span>,</span>
              </div>
              <div className="state-form">
                <label className="above"> State </label>
                {errors.state && (
                  <span
                    className={
                      isSubmitted ? "errors-create-spot" : "errors-hidden"
                    }
                  >
                    {errors.state}
                  </span>
                )}
                <input
                  className="below"
                  type="text"
                  placeholder="STATE"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="divider-review-bottom"></div>
          <div className="spot-creation-description">
            <h3-semibold>Describe your place to guests</h3-semibold>
            <p>
              Mention the best features of your space, any special amentities
              like fast wifi or parking, and what you love about the
              neighborhood.
            </p>
            <div className="review-description">
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="Please write at least 30 characters"
              />
              {errors.description && (
                <p className={isSubmitted ? "errors-shown" : "errors-hidden"}>
                  {errors.description}
                </p>
              )}
            </div>
          </div>
          <div className="divider-review-top"></div>
          <div className="spot-creation-title">
            <h3-semibold>Create a title for your spot</h3-semibold>
            <p>
              Catch guests' attention with a spot title that highlights what
              makes your place special.
            </p>
            <div className="title">
              <input
                className="below"
                type="text"
                placeholder="Name of your spot"
                value={spotName}
                onChange={(e) => setSpotName(e.target.value)}
              />
              {errors.spotName && (
                <p className={isSubmitted ? "errors-shown" : "errors-hidden"}>
                  {errors.spotName}
                </p>
              )}
            </div>
          </div>
          <div className="divider-review-top"></div>
          <div className="spot-creation-pricing">
            <h3-semibold>Set a base price for your spot</h3-semibold>
            <p>
              Competitive pricing can help your listing stand out and rank
              higher in search results.
            </p>
            <div className="price">
              <h4>$</h4>
              <input
                className="below"
                type="text"
                placeholder="Price per night (USD)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            {errors.price && (
              <p className={isSubmitted ? "errors-shown" : "errors-hidden"}>
                {errors.price}
              </p>
            )}
          </div>
          <div className="divider-review-top"></div>
          {formType === "create" && (
            <div className="spot-creation-photos">
              <h3-semibold>Liven up your spot with photos</h3-semibold>
              <p>Submit a link to at least one photo to publish your spot.</p>
              <div className="preview-image">
                <input
                  type="file"
                  placeholder="Preview Image URL"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) setPreviewImage(file);
                  }}
                />
                {errors.previewImage && (
                  <p className={isSubmitted ? "errors-shown" : "errors-hidden"}>
                    {errors.previewImage}
                  </p>
                )}
              </div>
              <div className="spot-images">
                <input
                  type="file"
                  placeholder="Image URL"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) setSpotImage1(file);
                  }}
                />
                {errors.spotImage1 && (
                  <p className={isSubmitted ? "errors-shown" : "errors-hidden"}>
                    {errors.spotImage1}
                  </p>
                )}{" "}
                <br />
                <input
                  type="file"
                  placeholder="Image URL"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) setSpotImage2(file);
                  }}
                />
                {errors.spotImage2 && (
                  <p className={isSubmitted ? "errors-shown" : "errors-hidden"}>
                    {errors.spotImage2}
                  </p>
                )}{" "}
                <br />
                <input
                  type="file"
                  placeholder="Image URL"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) setSpotImage3(file);
                  }}
                />
                {errors.spotImage3 && (
                  <p className={isSubmitted ? "errors-shown" : "errors-hidden"}>
                    {errors.spotImage3}
                  </p>
                )}{" "}
                <br />
                <input
                  type="file"
                  placeholder="Image URL"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) setSpotImage4(file);
                  }}
                />
                {errors.spotImage4 && (
                  <p className={isSubmitted ? "errors-shown" : "errors-hidden"}>
                    {errors.spotImage4}
                  </p>
                )}
              </div>
            </div>
          )}
          {formType === "create" && <div className="divider-review-top"></div>}
          {imageLoading ? (<Loading type={'form'} />) : (
            <div className="create-update-spot-button-div">
              {formType === "create" && (
                <button
                  className="create-spot-button-form changeCursor"
                  type="submit"
                >
                  Create Spot
                </button>
              )}

              {formType === "update" && (
                <button
                  className="update-spot-button-form changeCursor"
                  type="submit"
                >
                  Update Spot
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SpotForm;
