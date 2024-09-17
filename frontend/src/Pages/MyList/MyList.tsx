import { useEffect, useState } from "react";
import { ListElement } from "../../Components/ListElement/ListElement";

export const MyList = () => {
  const [contents, setContentS] = useState([]);

  const getList = async () => {
    try {
      const response = await fetch("/api/v1/users/list", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        console.log(
          `Server responsed with ${response.status} status` +
            { message: "succes" }
        );

        const data = await response.json();
        setContentS(data.content || []);
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
    getList();
  }, []);

  return (
    <div>
      <ListElement content={contents} />
    </div>
  );
};
