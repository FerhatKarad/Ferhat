import axios from "axios";



 const service = axios.create({
    baseURL: "http://localhost:5005/pokecards"
  });

  const uploadImage = (file) => {
    return service
      .post("/upload", file)
      .then(res => res.data)
  };

  export default {
    service, 
    uploadImage
  };