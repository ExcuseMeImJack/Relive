import SpotForm from "./SpotForm";

const SpotCreation = () => {
   const spot = {
    address: '',
    city: '',
    state: '',
    country: '',
    name: '',
    lat: 0,
    lng: 0,
    description: '',
    price: ''
   }

   return (
    <SpotForm
      spot={spot}
      formType="create"
    />
   )
}

export default SpotCreation;
