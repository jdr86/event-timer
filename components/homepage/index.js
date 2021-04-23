import LocationAutocomplete from "location-autocomplete";
import axios from "axios";
import { useState } from "react";
import { GOOGLE_API_KEY } from "../../config";

const Index = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [srcLat, setSrcLat] = useState("");
    const [srcLng, setSrcLng] = useState("");
    const [destLat, setDestLat] = useState("");
    const [destLng, setDestLng] = useState("");
    const [fare, setFare] = useState(null);

    const selectPickup = (location) => {
        const place = location.autocomplete.getPlace();
        const lat = place.geometry.location.lat();
        setSrcLat(lat);
        const lng = place.geometry.location.lng();
        setSrcLng(lng);
    };
    const selectDropoff = (location) => {
        const place = location.autocomplete.getPlace();
        const lat = place.geometry.location.lat();
        setDestLat(lat);
        const lng = place.geometry.location.lng();
        setDestLng(lng);
    };
    const compareFares = (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);
        let payload = {
            origin: {
                lat: srcLat,
                lng: srcLng,
            },
            destination: {
                lat: destLat,
                lng: destLng,
            },
        };
        axios
            .post("https://jylk94jmfb.execute-api.us-east-1.amazonaws.com/dev/geoRide", payload)
            .then((res) => {
                setLoading(false);
                setFare(res.data.Fare);
                setSuccess(true);
            })
            .catch((err) => {
                console.log("🚀 ~ file: index.js ~ line 35 ~ axios.post ~ err", err);
                setLoading(false);
            });
    };

    return (
        <div className="w-full flex items-centyer justify-center">
            <div className="w-full max-w-sm px-6">
                <form onSubmit={(e) => compareFares(e)}>
                    <div className="mb-8 relative">
                        <label className="text-lg font-bold text-gray-50">Pickup</label>
                        <div className={loading ? "opacity-50 cursor-not-allowed" : ""}>
                            <LocationAutocomplete required disabled={loading} onChange={() => {}} onDropdownSelect={selectPickup} placeholder={"Select pickup destination"} googleAPIKey={GOOGLE_API_KEY} className="pickupInput" />
                        </div>
                    </div>
                    <div className="mb-8 relative">
                        <label htmlFor="dropoff" className="text-lg font-bold text-gray-50">
                            Drop-off
                        </label>
                        <div className={loading ? "opacity-50 cursor-not-allowed" : ""}>
                            <LocationAutocomplete required disabled={loading} onChange={() => {}} onDropdownSelect={selectDropoff} placeholder={"Select dropoff destination"} googleAPIKey={GOOGLE_API_KEY} className="pickupInput" />
                        </div>
                    </div>
                    <button disabled={loading} type="submit" className={"focus:outline-none w-full py-5 rounded-md text-base font-bold leading-none text-center text-white btn-grad " + (loading ? "opacity-50 cursor-none" : "")}>
                        COMPARE FARES
                    </button>
                    {loading && (
                        <div className="flex w-full justify-center">
                            <img className="mt-6" src="/img/loader.gif" alt="loader" />
                        </div>
                    )}
                </form>
                {success && (
                    <div className="mt-10">
                        <p className="text-sm font-semibold text-gray-400 mb-3">Estimated Fares</p>
                        <div className="w-full bg-gray-800 rounded-md py-5 px-6 flex items-center justify-between">
                            <img src="/img/lyft.png" alt="Lyft service logo" />
                            <p className="text-4xl font-extralight text-white">${fare}</p>
                        </div>
                        {/* <div className="w-full bg-gray-800 rounded-md py-5 px-6 flex items-center justify-between mt-4">
                            <img src="/img/uber.png" alt="Uber service logo" />
                            <p className="text-4xl font-extralight text-white">$157</p>
                        </div> */}
                    </div>
                )}
            </div>
        </div>
    );
};
export default Index;
