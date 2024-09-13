import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Details } from "../../Components/Details/Details";

export const Media = () => {
  const [details, setDetails] = useState({});
  const [trailerKey, setTrailerKey] = useState("");
  const [similarContent, setsimilarContent] = useState();
  const location = useLocation();

  const getDetails = async (id: string, type: string) => {
    const endpoint = `/api/v1/${type}/${id}/details`;
    try {
      const response = await fetch(endpoint, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        console.log(
          `Server responsed with ${response.status} status` +
            { message: "success" }
        );

        const data = await response.json();
        setDetails(data.content);
      } else {
        throw new Error(
          `Server responsed with ${response.status} status` +
            { message: response.status }
        );
      }
    } catch (error) {
      console.error(error);
      throw new Error(
        `Server responsed with 500 status.` +
          { message: "Internal server error" }
      );
    }
  };

  const getTrailer = async (id: string, type: string) => {
    const endpoint = `/api/v1/${type}/${id}/trailers`;
    try {
      const response = await fetch(endpoint, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        console.log(
          `Server responsed with ${response.status} status` +
            { message: "success" }
        );
        const data = await response.json();
        setTrailerKey(data.trailers[0]?.key || "");
      } else {
        throw new Error(
          `Server responsed with ${response.status} status` +
            { message: response.status }
        );
      }
    } catch (error) {
      console.error(error);
      throw new Error(
        `Server responsed with 500 status.` +
          { message: "Internal server error" }
      );
    }
  };

  const getSimilars = async (id: string, type: string) => {
    const endpoint = `/api/v1/${type}/${id}/similar`;
    try {
      const response = await fetch(endpoint, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        console.log(
          `Server responsed with ${response.status} status` +
            { message: "success" }
        );

        const data = await response.json();
        setsimilarContent(data.similars);
      } else {
        throw new Error(
          `Server responsed with ${response.status} status` +
            { message: response.status }
        );
      }
    } catch (error) {
      console.error(error);
      throw new Error(
        `Server responsed with 500 status.` +
          { message: "Internal server error" }
      );
    }
  };

  useEffect(() => {
    const id = location.state.id;
    const type = location.state.type;

    if (id && type) {
      getDetails(id, type);
      getTrailer(id, type);
      getSimilars(id, type);
    }
  }, []);

  return (
    <div>
      <Details
        details={details}
        trailerKey={trailerKey}
        similar={similarContent}
        type={location.state.type}
      />
    </div>
  );
};

export default Media;
