import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router"
import { thunkCreateSpot, thunkCreateSpotImage, thunkUpdateSpot } from "../../store/spots";

const SpotForm = ({spot, formType}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [country, setCountry] = useState(spot.country);
  const [address, setAddress] = useState(spot.address);
  const [city, setCity] = useState(spot.city);
  const [state, setState] = useState(spot.state);
  const [description, setDescription] = useState(spot.description);
  const [spotName, setSpotName] = useState(spot.name);
  const [price,setPrice] = useState(spot.price);

  const [previewImage, setPreviewImage] = useState('');
  const [spotImage1, setSpotImage1] = useState('');
  const [spotImage2, setSpotImage2] = useState('');
  const [spotImage3, setSpotImage3] = useState('');
  const [spotImage4, setSpotImage4] = useState('');
  const [spotImages, setSpotImages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});


  useEffect(() => {
    const err = {};
    if(country.trim().length < 1) err.country = 'Country is required';
    if(address.trim().length < 1) err.address = 'Address is required';
    if(city.trim().length < 1) err.city = 'City is required';
    if(state.trim().length < 1) err.state = 'State is required';
    if(description.length < 30) err.description = 'Description needs a minimum of 30 characters';
    if(spotName.trim().length < 1) err.spotName = 'Name is required';
    if(price.length < 1) err.price = 'Price is required';
    if(formType === 'create'){
      if(previewImage.trim().length < 1) err.previewImage = 'Preview Image is required';
    }

    const validUrlFileTypes = ['png', 'jpg', 'jpeg'];
    const images = {};

    if(previewImage){
      const urlArray = previewImage.split('.');
      const urlSuffix = urlArray[urlArray.length - 1];
      !validUrlFileTypes.includes(urlSuffix) ? err.previewImage = 'Image URL must end in .png, .jpg, or .jpeg' : images.previewImage = {
        url: previewImage,
        preview: true
      };
    }
    if(spotImage1){
      const urlArray = spotImage1.split('.');
      const urlSuffix = urlArray[urlArray.length - 1];
      !validUrlFileTypes.includes(urlSuffix) ? err.spotImage1 = 'Image URL must end in .png, .jpg, or .jpeg' : images.spotImage1 = {
        url: spotImage1,
        preview: false
      };
    }
    if(spotImage2){
      const urlArray = spotImage2.split('.');
      const urlSuffix = urlArray[urlArray.length - 1];
      !validUrlFileTypes.includes(urlSuffix) ? err.spotImage2 = 'Image URL must end in .png, .jpg, or .jpeg' : images.spotImage2 = {
        url: spotImage2,
        preview: false
      };
    }
    if(spotImage3){
      const urlArray = spotImage3.split('.');
      const urlSuffix = urlArray[urlArray.length - 1];
      !validUrlFileTypes.includes(urlSuffix) ? err.spotImage3 = 'Image URL must end in .png, .jpg, or .jpeg' : images.spotImage3 = {
        url: spotImage3,
        preview: false
      };
    }
    if(spotImage4){
      const urlArray = spotImage4.split('.');
      const urlSuffix = urlArray[urlArray.length - 1];
      !validUrlFileTypes.includes(urlSuffix) ? err.spotImage4 = 'Image URL must end in .png, .jpg, or .jpeg' : images.spotImage4 = {
        url: spotImage4,
        preview: false
      };
    }
    setSpotImages(images);
    setErrors(err);

  }, [country, address, city, state, description, spotName, price, previewImage, spotImage1, spotImage2, spotImage3, spotImage4, formType])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if(Object.values(errors).length < 1) {
      const newSpotInfo = {
        address,
        city,
        state,
        country,
        name: spotName,
        lat: 0,
        lng: 0,
        description,
        price: parseInt(price)
      }
      if(formType === 'create'){
        const newSpot = await dispatch(thunkCreateSpot(newSpotInfo))
        const newSpotAdded = newSpot;
        for(let key in spotImages){
          await dispatch(thunkCreateSpotImage(newSpotAdded.id, spotImages[key]))
        }
        if(newSpotAdded.errors){
          setErrors(newSpotAdded.errors)
        } else {
          history.push(`/spots/${newSpotAdded.id}`)
        }
      } else if(formType === 'update'){
        const updatedSpot = await dispatch(thunkUpdateSpot(spot.id, newSpotInfo))
        const updated = updatedSpot;
        for(let key in spotImages){
          await dispatch(thunkCreateSpotImage(updated.id, spotImages[key]))
        }
        if(updated.errors){
          setErrors(updated.errors)
        } else {
          history.push(`/spots/${updated.id}`)
        }
      }
    }
  };

  return (
    <div className="spot-creation-container">
      <h2>Create a new Spot</h2>
      <h3>Where's your place located?</h3>
      <p>Guests will only get your exact address once they booked a reservation.</p>

      <form onSubmit={handleSubmit}>
        <div className="spot-creation-location">

          <div className="country">
            <label className="above"> Country </label>  <br />
            {errors.country && <p className={isSubmitted ? 'errors-shown' : 'errors-hidden'}>{errors.country}</p>}
            <input className='below' type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
          </div>

          <div className="address">
            <label className="above"> Street Address </label>  <br />
            {errors.address && <p className={isSubmitted ? 'errors-shown' : 'errors-hidden'}>{errors.address}</p>}
            <input className="below" type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>

          <div className="city-state">
            <label className="above"> City </label> <br />
            {errors.city && <p className={isSubmitted ? 'errors-shown' : 'errors-hidden'}>{errors.city}</p>}
            <input className="below" type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} /> <br />

            <label className="above"> State </label>   <br />
            {errors.state && <p className={isSubmitted ? 'errors-shown' : 'errors-hidden'}>{errors.state}</p>}
            <input className="below" type="text" placeholder="STATE" value={state} onChange={(e) => setState(e.target.value)} />
          </div>

        </div>

        <div className="spot-creation-description">
          <h3>Describe your place to guests</h3>
          <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
          <div className="description">
            <textarea onChange={(e) =>setDescription(e.target.value)} value={description} placeholder="Please write at least 30 characters" />
            {errors.description && <p className={isSubmitted ? 'errors-shown' : 'errors-hidden'}>{errors.description}</p>}
          </div>

        </div>
        <div className="spot-creation-title">
          <h3>Create a title for your spot</h3>
          <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
          <div className="title">
            <input className="below" type="text" placeholder="Name of your spot" value={spotName} onChange={(e) => setSpotName(e.target.value)} />
            {errors.spotName && <p className={isSubmitted ? 'errors-shown' : 'errors-hidden'}>{errors.spotName}</p>}
          </div>

        </div>
        <div className="spot-creation-pricing">
          <h3>Set a base price for your spot</h3>
          <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
          <div className="price">
            <h4>$</h4>
            <input className="below" type="text" placeholder="Price per night (USD)" value={price} onChange={(e) => setPrice(e.target.value)} />
            {errors.price && <p className={isSubmitted ? 'errors-shown' : 'errors-hidden'}>{errors.price}</p>}
          </div>
        </div>
        {formType === 'create' &&
          <div className="spot-creation-photos">
            <h3>Liven up your spot with photos</h3>
            <p>Submit a link to at least one photo to publish your spot.</p>
            <div className="preview-image">
              <input className="below" type="text" placeholder="Preview Image URL" value={previewImage} onChange={(e) => setPreviewImage(e.target.value)} />
              {errors.previewImage && <p className={isSubmitted ? 'errors-shown' : 'errors-hidden'}>{errors.previewImage}</p>}
            </div>
            <div className="spot-images">
              <input className="below" type="text" placeholder="Image URL" value={spotImage1} onChange={(e) => setSpotImage1(e.target.value)} />
              {errors.spotImage1 && <p className={isSubmitted ? 'errors-shown' : 'errors-hidden'}>{errors.spotImage1}</p>} <br />
              <input className="below" type="text" placeholder="Image URL" value={spotImage2} onChange={(e) => setSpotImage2(e.target.value)} />
              {errors.spotImage2 && <p className={isSubmitted ? 'errors-shown' : 'errors-hidden'}>{errors.spotImage2}</p>} <br />
              <input className="below" type="text" placeholder="Image URL" value={spotImage3} onChange={(e) => setSpotImage3(e.target.value)} />
              {errors.spotImage3 && <p className={isSubmitted ? 'errors-shown' : 'errors-hidden'}>{errors.spotImage3}</p>} <br />
              <input className="below" type="text" placeholder="Image URL" value={spotImage4} onChange={(e) => setSpotImage4(e.target.value)} />
              {errors.spotImage4 && <p className={isSubmitted ? 'errors-shown' : 'errors-hidden'}>{errors.spotImage4}</p>}
            </div>
        </div>
        }
        <div className="create-update-spot-button-div">
        {formType === 'create' && <button className="create-spot-button-form" type="submit">Create Spot</button>}
        {formType === 'update' && <button className="update-spot-button-form" type="submit">Update Spot</button>}
      </div>

      </form>
    </div>
  );
}

export default SpotForm;
