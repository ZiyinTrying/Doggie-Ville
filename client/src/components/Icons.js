import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faHeart,
  faBed,
  faClinicMedical,
  faHamburger,
  faStore,
  faTree,
  faDog,
} from "@fortawesome/free-solid-svg-icons";

const Icons = (business) => {
  return business.category === "hotels"
    ? {
        path: faBed.icon[4],

        fillColor: "rgb(254, 127, 45)",
        fillOpacity: 1,
        anchor: new window.google.maps.Point(
          faBed.icon[0] / 2, // width
          faBed.icon[1] // height
        ),
        strokeWeight: 1,
        strokeColor: "#ffffff",
        scale: 0.04,
      }
    : business.category === "vet"
    ? {
        path: faClinicMedical.icon[4],

        fillColor: "white",
        fillOpacity: 1,
        anchor: new window.google.maps.Point(
          faClinicMedical.icon[0] / 2, // width
          faClinicMedical.icon[1] // height
        ),
        strokeWeight: 2,
        strokeColor: "rgb(79,174,227)",
        scale: 0.04,
      }
    : business.category === "resturant"
    ? {
        path: faHamburger.icon[4],

        fillColor: "rgb(254, 127, 45)",
        fillOpacity: 1,
        anchor: new window.google.maps.Point(
          faHamburger.icon[0] / 2, // width
          faHamburger.icon[1] // height
        ),
        strokeWeight: 1,
        strokeColor: "white",
        scale: 0.04,
      }
    : business.category === "petstore"
    ? {
        path: faStore.icon[4],

        fillColor: "#e5383b",
        fillOpacity: 1,
        anchor: new window.google.maps.Point(
          faStore.icon[0] / 2, // width
          faStore.icon[1] // height
        ),
        strokeWeight: 2,
        strokeColor: "white",
        scale: 0.04,
      }
    : business.category === "parks"
    ? {
        url: "https://res.cloudinary.com/dvmtjbjlp/image/upload/v1638990396/Doggie_Ville_Maps/Park-icon_30285_qmaady.png",
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(20, 20),
        scaledSize: new window.google.maps.Size(40, 40),
      }
    : {
        path: faTree.icon[4],

        fillColor: "rgb(97, 155, 138)",
        fillOpacity: 1,
        anchor: new window.google.maps.Point(
          faTree.icon[0] / 2, // width
          faTree.icon[1] // height
        ),
        strokeWeight: 1,
        strokeColor: "#ffffff",
        scale: 0.08,
      };
};

export default Icons;
